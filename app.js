/**
 * ============================================================================
 * AI SKILL GAP DETECTOR - APPLICATION ENGINE
 * College Design Thinking Submission & Real Startup Prototype
 * ============================================================================
 */

// Academic Team & Project Configuration
const TEAM_CONFIG = {
  teamName: "Team NeuralShift (DT Group 04)",
  members: "Aarav Sharma, Priya Nair, Rohan Kulkarni, Sneha Patel",
  classYear: "Third Year B.Tech CSE (Semester VI)",
  department: "Department of Computer Science & Engineering",
  college: "Apex Institute of Technology & Engineering",
  academicYear: "2025-2026",
  submissionTitle: "Design Thinking Final Project Submission"
};

// Global Application State
const state = {
  currentWizardStep: 1,
  inputMode: 'text', // 'text' or 'chips'
  selectedSkills: new Set(),
  selectedRoleId: 'software_dev',
  analysisResult: null,
  donutChartInstance: null,
  radarChartInstance: null,
  roadmapCheckedItems: new Set(),
  verifiedLevels: {}, // { skillId: verifiedLevel (0-4) }
  lastGapBeforeVerification: null,
  activeQuiz: null
};

/**
 * ============================================================================
 * OPTIONAL LLM API INTEGRATION HOOK
 * This function serves as the marked plug-and-play hook for connecting a live
 * Large Language Model API (e.g. Gemini, OpenAI, Claude) in future production.
 * Currently returns false to smoothly fall back to our local smart AI engine.
 * ============================================================================
 */
async function analyzeWithLLM(studentProfile, targetRole) {
  /*
  // EXAMPLE PRODUCTION HOOK:
  // const GEMINI_API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
  // const prompt = `Analyze this student resume against ${targetRole.title}...`;
  // const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${API_KEY}`, { ... });
  // return await response.json();
  */
  return null; // Local AI Analysis Engine is actively handling the evaluation
}

/**
 * ============================================================================
 * LOCAL SMART AI ANALYSIS ENGINE
 * Extracts skills, evaluates proficiency signals, computes weighted gaps,
 * and synthesizes prioritized learning sprints.
 * ============================================================================
 */

// Signal action words that indicate elevated practical proficiency (Level 3-4)
const ACTION_SIGNALS = [
  'built', 'developed', 'architected', 'deployed', 'implemented', 'designed',
  'certified', 'mastered', 'proficient', 'engineered', 'created', 'optimized',
  'integrated', 'scaled', 'refactored', 'administered'
];

/**
 * Normalizes text for keyword and regex matching
 */
function normalizeText(text) {
  return (text || '').toLowerCase().replace(/[^a-z0-9+#.\s]/g, ' ');
}

/**
 * Escapes special regex characters safely
 */
function escapeRegex(s) {
  return (s || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Checks whether needle matches haystack as a whole word / standalone phrase
 * Prevents "java" from matching "javascript" while allowing "core java" or "c++"
 */
function isWholeWordMatch(haystack, needle) {
  const h = (haystack || '').trim().toLowerCase();
  const n = (needle || '').trim().toLowerCase();
  if (h === n) return true;
  if (!n || !h) return false;
  const escaped = escapeRegex(n);
  const regex = new RegExp('(^|[\\s,;()|/&:\\[\\]])' + escaped + '([\\s,;()|/&:\\[\\]]|$)', 'i');
  return regex.test(h);
}

/**
 * Strict skill matcher comparing two strings as whole-word tokens
 */
function matchesSkillStrict(s1, s2) {
  return isWholeWordMatch(s1, s2) || isWholeWordMatch(s2, s1);
}

/**
 * Maps a target role skill requirement to MASTER_SKILLS ids using strict matching
 */
function mapRoleSkillToMasterSkillIds(reqSkill) {
  const reqNames = [reqSkill.name.toLowerCase(), ...(reqSkill.synonyms || []).map(s => s.toLowerCase())];
  const matchedIds = [];
  MASTER_SKILLS.forEach(master => {
    const masterTerms = [master.id.toLowerCase(), master.name.toLowerCase(), ...(master.aliases || []).map(a => a.toLowerCase())];
    const hasMatch = reqNames.some(rn => masterTerms.some(mt => matchesSkillStrict(mt, rn)));
    if (hasMatch && !matchedIds.includes(master.id)) {
      matchedIds.push(master.id);
    }
  });
  return matchedIds;
}

/**
 * Extracts skills and infers 1-5 proficiency level from free text and context
 */
function extractSkillsFromProfile(resumeText, projectsText, certsText, manuallySelectedSkills) {
  const normResume = normalizeText(resumeText);
  const normProjects = normalizeText(projectsText);
  const normCerts = normalizeText(certsText);
  const combinedContext = `${normResume} ${normProjects} ${normCerts}`;

  const detectedSkills = {}; // { skillId: { name, level, category } }

  MASTER_SKILLS.forEach(master => {
    let matched = false;
    let matchCount = 0;
    let inProjects = false;
    let inCerts = false;

    // Check if manually selected via chips
    if (manuallySelectedSkills && manuallySelectedSkills.has(master.id)) {
      matched = true;
      matchCount += 2;
    }

    // Match against primary name and all aliases
    const searchTerms = [master.name.toLowerCase(), ...master.aliases];
    for (const term of searchTerms) {
      // Word boundary regex
      const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|\\b|\\s)${escapedTerm}(\\b|\\s|$)`, 'i');

      if (regex.test(normResume)) {
        matched = true;
        matchCount++;
      }
      if (regex.test(normProjects)) {
        matched = true;
        inProjects = true;
        matchCount += 2;
      }
      if (regex.test(normCerts)) {
        matched = true;
        inCerts = true;
        matchCount += 2;
      }
    }

    if (matched) {
      // Heuristic Level Inference (Scale 1 to 5)
      // Level 1: Foundational mention
      // Level 2: Multiple mentions / context
      // Level 3: Backed by practical project implementation
      // Level 4: Backed by verified certification or advanced engineering
      // Level 5: Expert / production mastery
      let inferredLevel = 1;

      if (matchCount >= 3) inferredLevel = 2;
      if (inProjects) inferredLevel += 1;
      if (inCerts) inferredLevel += 1;

      // Cap inferred level between 1 and 4 for student profiles (level 5 is industry expert)
      inferredLevel = Math.min(4, Math.max(1, inferredLevel));

      detectedSkills[master.id] = {
        id: master.id,
        name: master.name,
        category: master.category,
        level: inferredLevel
      };
    }
  });

  return detectedSkills;
}

/**
 * Computes deterministic role gap analysis
 */
function performGapAnalysis(detectedSkills, targetRole) {
  let totalWeightedPossible = 0;
  let totalWeightedMatched = 0;

  const strongSkills = [];
  const gapSkills = [];
  const categoryScores = {}; // { category: { student: 0, required: 0, count: 0 } }

  targetRole.skills.forEach(reqSkill => {
    totalWeightedPossible += (reqSkill.weight * reqSkill.requiredLevel);

    // Initialize category tracker
    if (!categoryScores[reqSkill.category]) {
      categoryScores[reqSkill.category] = { student: 0, required: 0, count: 0 };
    }
    categoryScores[reqSkill.category].required += reqSkill.requiredLevel;
    categoryScores[reqSkill.category].count += 1;

    // Find student match using name or synonyms with strict whole-word matching
    let studentLevel = 0;
    let isVerified = false;
    const reqNames = [reqSkill.name.toLowerCase(), ...(reqSkill.synonyms || []).map(s => s.toLowerCase())];

    // Check against detected skills
    for (const skillKey in detectedSkills) {
      const studentSkill = detectedSkills[skillKey];
      const masterInfo = MASTER_SKILLS.find(m => m.id === studentSkill.id);
      const studentAliases = masterInfo ? [masterInfo.name.toLowerCase(), ...(masterInfo.aliases || []).map(a => a.toLowerCase())] : [studentSkill.name.toLowerCase()];

      const hasOverlap = reqNames.some(rn => 
        studentAliases.some(sa => matchesSkillStrict(sa, rn))
      );

      if (hasOverlap) {
        if (studentSkill.level > studentLevel) {
          studentLevel = studentSkill.level;
          isVerified = Boolean(studentSkill.isVerified);
        } else if (studentSkill.level === studentLevel && studentSkill.isVerified) {
          isVerified = true;
        }
      }
    }

    categoryScores[reqSkill.category].student += Math.min(studentLevel, reqSkill.requiredLevel);

    const weightedScore = reqSkill.weight * Math.min(studentLevel, reqSkill.requiredLevel);
    totalWeightedMatched += weightedScore;

    const skillGap = Math.max(0, reqSkill.requiredLevel - studentLevel);

    const itemAnalysis = {
      name: reqSkill.name,
      category: reqSkill.category,
      weight: reqSkill.weight,
      requiredLevel: reqSkill.requiredLevel,
      studentLevel: studentLevel,
      gap: skillGap,
      estimatedHours: reqSkill.estimatedHours,
      resources: reqSkill.resources,
      whyItMatters: reqSkill.whyItMatters,
      status: studentLevel >= reqSkill.requiredLevel ? 'strong' : (studentLevel > 0 ? 'needs_improvement' : 'missing'),
      isVerified: isVerified
    };

    if (itemAnalysis.status === 'strong') {
      strongSkills.push(itemAnalysis);
    } else {
      gapSkills.push(itemAnalysis);
    }
  });

  // Calculate Weighted Match Percentage and Gap Percentage
  const weightedMatchPercent = Math.min(100, Math.max(0, Math.round((totalWeightedMatched / totalWeightedPossible) * 100)));
  const skillGapScore = 100 - weightedMatchPercent;

  // Determine Role Readiness Status Tier
  let readinessTier = {
    label: "Critical Gaps Detected",
    badgeClass: "badge-danger",
    advice: "Significant gaps in high-weight competencies. Focus on foundational sprints before scheduling interviews."
  };

  if (weightedMatchPercent >= 75) {
    readinessTier = {
      label: "High Job Readiness",
      badgeClass: "badge-success",
      advice: "Outstanding competency alignment! You are strongly positioned for recruitment screens and technical rounds."
    };
  } else if (weightedMatchPercent >= 50) {
    readinessTier = {
      label: "Moderate Job Readiness",
      badgeClass: "badge-warning",
      advice: "Solid fundamentals established, but key practical tools and architecture practices need targeted refinement."
    };
  }

  // Sort gaps by priority: weight * gap magnitude descending
  gapSkills.sort((a, b) => (b.weight * b.gap) - (a.weight * a.gap));

  // Synthesize dynamic recommended actions based on actual gaps
  const recommendedActions = generateRecommendedActions(gapSkills, strongSkills);

  // Synthesize 4 phased sprints for the Personalized Roadmap
  const phasedRoadmap = generatePhasedRoadmap(gapSkills);

  return {
    targetRole: targetRole,
    weightedMatchPercent,
    skillGapScore,
    readinessTier,
    strongSkills,
    gapSkills,
    categoryScores,
    recommendedActions,
    phasedRoadmap
  };
}

/**
 * Synthesizes concrete strategic actions based on detected gaps
 */
function generateRecommendedActions(gapSkills, strongSkills) {
  const actions = [];

  const topGaps = gapSkills.slice(0, 4);

  topGaps.forEach(gap => {
    let title = `Master ${gap.name}`;
    let desc = `Close the ${gap.gap}-level deficiency through structured practice. Focus on ${gap.resources[0] || 'core concepts'}.`;

    if (gap.name.toLowerCase().includes('data structure') || gap.name.toLowerCase().includes('dsa')) {
      title = "DSA Problem Solving Sprint";
      desc = "Solve 40 targeted LeetCode Mediums focusing on Trees, Dynamic Programming, and Graph Traversals.";
    } else if (gap.name.toLowerCase().includes('sql') || gap.name.toLowerCase().includes('database')) {
      title = "Advanced Querying & Indexing";
      desc = "Practice SQL window functions, CTEs, and write query optimization plans for 100k+ row schemas.";
    } else if (gap.name.toLowerCase().includes('git')) {
      title = "Collaborative Git Workflows";
      desc = "Simulate multi-branch PR reviews, rebase conflict resolutions, and automated CI check runs.";
    } else if (gap.name.toLowerCase().includes('system design')) {
      title = "System Design & Scalability";
      desc = "Study load balancers, caching layers (Redis), and horizontal database partitioning tradeoffs.";
    } else if (gap.name.toLowerCase().includes('docker') || gap.name.toLowerCase().includes('devops')) {
      title = "Containerization Practice";
      desc = "Dockerize your local full-stack projects using multi-stage builds and docker-compose services.";
    }

    actions.push({
      title,
      desc,
      category: gap.category
    });
  });

  // Always append a project integration action
  actions.push({
    title: "Portfolio Project Integration",
    desc: "Build 1 comprehensive capstone project integrating at least 2 of your top gap technologies to prove practical competence."
  });

  // Entry Point: Take skill assessments action
  actions.push({
    title: "Take skill assessments",
    desc: "Verify your inferred proficiency with structured 4-question quizzes to sharpen your gap analysis.",
    category: "Assessment",
    isAssessmentAction: true
  });

  return actions;
}

/**
 * Synthesizes a prioritized 4-phase roadmap (Weeks 1-8)
 */
function generatePhasedRoadmap(gapSkills) {
  const phases = [
    { phaseNumber: 1, timeframe: "Weeks 1 - 2", title: "Core Fundamentals & High-Weight Gaps", items: [] },
    { phaseNumber: 2, timeframe: "Weeks 3 - 4", title: "Tooling, Workflows & Practical Implementation", items: [] },
    { phaseNumber: 3, timeframe: "Weeks 5 - 6", title: "Architectural Depth & Real-World Projects", items: [] },
    { phaseNumber: 4, timeframe: "Weeks 7 - 8", title: "Interview Polishing & Mock Assessments", items: [] }
  ];

  gapSkills.forEach((skill, idx) => {
    const phaseIdx = Math.min(phases.length - 1, Math.floor(idx / 2));
    phases[phaseIdx].items.push({
      id: `roadmap_item_${idx}`,
      skill: skill.name,
      category: skill.category,
      weight: skill.weight,
      gap: skill.gap,
      estimatedHours: skill.estimatedHours,
      resources: skill.resources,
      whyItMatters: skill.whyItMatters
    });
  });

  // Ensure later phases are not completely empty if few gaps exist
  if (phases[3].items.length === 0) {
    phases[3].items.push({
      id: "roadmap_item_capstone",
      skill: "System Integration & Mock Technical Interviews",
      category: "Career Readiness",
      weight: 5,
      gap: 1,
      estimatedHours: 20,
      resources: ["Pramp Peer Mock Interviews", "Tech Interview Handbook by Yangshun Tay"],
      whyItMatters: "Simulates high-pressure live coding screens and behavioral communication under recruiter review."
    });
  }

  return phases;
}

/**
 * ============================================================================
 * UI CONTROLLERS, WIZARD NAVIGATION & DOM BINDINGS
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  initLocalStorage();
});

function initUI() {
  renderTeamConfig();
  renderMasterSkillsChips();
  renderRolesGrid();
  setupDropzone();
  setupNavbarActiveScroll();
  setupQuizKeyboardNavigation();
  loadSampleStudentProfile(); // Pre-populate realistic sample student Aarav Sharma by default

  ['resumeTextInput', 'projectsInput', 'certificationsInput'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', clearVerifiedLevels);
  });
}

function renderTeamConfig() {
  const container = document.getElementById('footerTeamCard');
  if (!container) return;

  container.innerHTML = `
    <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">
      ${TEAM_CONFIG.teamName} — ${TEAM_CONFIG.submissionTitle}
    </div>
    <div><strong>Class / Year:</strong> ${TEAM_CONFIG.classYear}</div>
    <div><strong>Department:</strong> ${TEAM_CONFIG.department}</div>
    <div><strong>College:</strong> ${TEAM_CONFIG.college}</div>
    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 6px;">
      <strong>Team Members:</strong> ${TEAM_CONFIG.members}
    </div>
  `;
}

function renderMasterSkillsChips() {
  const container = document.getElementById('allChipsContainer');
  if (!container) return;

  container.innerHTML = '';
  MASTER_SKILLS.forEach(skill => {
    const chip = document.createElement('div');
    chip.className = `skill-chip ${state.selectedSkills.has(skill.id) ? 'selected' : ''}`;
    chip.id = `chip_${skill.id}`;
    chip.innerHTML = `
      <span>${skill.name}</span>
      <span style="font-size: 0.7rem; opacity: 0.6;">(${skill.category})</span>
    `;
    chip.onclick = () => toggleSkillChip(skill.id);
    container.appendChild(chip);
  });
}

function toggleSkillChip(skillId) {
  clearVerifiedLevels();
  if (state.selectedSkills.has(skillId)) {
    state.selectedSkills.delete(skillId);
  } else {
    state.selectedSkills.add(skillId);
  }

  const el = document.getElementById(`chip_${skillId}`);
  if (el) {
    el.classList.toggle('selected', state.selectedSkills.has(skillId));
  }

  document.getElementById('selectedChipsCount').textContent = state.selectedSkills.size;
}

function filterSkillChips() {
  const query = (document.getElementById('chipSearchInput').value || '').toLowerCase();
  MASTER_SKILLS.forEach(skill => {
    const chip = document.getElementById(`chip_${skill.id}`);
    if (!chip) return;
    const match = skill.name.toLowerCase().includes(query) || 
                  skill.aliases.some(a => a.toLowerCase().includes(query)) ||
                  skill.category.toLowerCase().includes(query);
    chip.style.display = match ? 'inline-flex' : 'none';
  });
}

function switchInputMode(mode) {
  state.inputMode = mode;
  document.getElementById('tabTextMode').classList.toggle('active', mode === 'text');
  document.getElementById('tabChipsMode').classList.toggle('active', mode === 'chips');

  document.getElementById('modeTextContainer').style.display = mode === 'text' ? 'block' : 'none';
  document.getElementById('modeChipsContainer').style.display = mode === 'chips' ? 'block' : 'none';
}

function setupDropzone() {
  const dropzone = document.getElementById('fileDropzone');
  const fileInput = document.getElementById('fileUploadInput');

  if (!dropzone || !fileInput) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('dragover');
    }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) handleFileUpload(files[0]);
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleFileUpload(e.target.files[0]);
  });
}

function handleFileUpload(file) {
  if (!file.name.endsWith('.txt')) {
    alert("Please upload a plain text (.txt) file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('resumeTextInput').value = e.target.result;
    document.getElementById('fileDropzone').innerHTML = `
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <div style="font-weight: 700; color: var(--success);">File Ingested: ${file.name}</div>
      <div style="font-size: 0.75rem; color: var(--text-muted);">${(file.size / 1024).toFixed(1)} KB loaded successfully</div>
    `;
  };
  reader.readAsText(file);
}

function renderRolesGrid() {
  const container = document.getElementById('rolesGridContainer');
  if (!container) return;

  container.innerHTML = '';
  TARGET_ROLES.forEach(role => {
    const card = document.createElement('div');
    card.className = `role-card ${role.id === state.selectedRoleId ? 'selected' : ''}`;
    card.id = `roleCard_${role.id}`;
    card.onclick = () => selectTargetRole(role.id);

    card.innerHTML = `
      <div>
        <div class="role-card-header">
          <div class="role-card-icon">${role.icon}</div>
          <span class="badge badge-cyan">${role.badge}</span>
        </div>
        <div class="role-card-title">${role.title}</div>
        <div class="role-card-desc">${role.shortDesc}</div>
      </div>
      <div class="role-card-meta">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        <span>${role.skills.length} Evaluated Competencies</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function selectTargetRole(roleId) {
  if (state.selectedRoleId !== roleId) {
    clearVerifiedLevels();
  }
  state.selectedRoleId = roleId;
  const target = TARGET_ROLES.find(r => r.id === roleId);

  TARGET_ROLES.forEach(r => {
    const el = document.getElementById(`roleCard_${r.id}`);
    if (el) el.classList.toggle('selected', r.id === roleId);
  });

  if (target) {
    document.getElementById('selectedRoleDisplay').textContent = target.title;
  }
}

function loadSampleStudentProfile() {
  clearVerifiedLevels();
  const sample = SAMPLE_STUDENTS.defaultStudent;
  document.getElementById('resumeTextInput').value = sample.resumeText;
  document.getElementById('projectsInput').value = sample.projects;
  document.getElementById('certificationsInput').value = sample.certifications;

  // Select corresponding chips
  state.selectedSkills.clear();
  sample.preselectedSkills.forEach(sId => state.selectedSkills.add(sId));
  renderMasterSkillsChips();
  document.getElementById('selectedChipsCount').textContent = state.selectedSkills.size;

  selectTargetRole(sample.targetRole);

  const loadBtn = document.getElementById('loadSampleBtn');
  if (loadBtn) {
    const originalText = loadBtn.innerHTML;
    loadBtn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
      Sample Data Loaded!
    `;
    setTimeout(() => { loadBtn.innerHTML = originalText; }, 2000);
  }
}

function loadSampleStudentAndStart() {
  loadSampleStudentProfile();
  scrollToAnalyzer();
}

function scrollToAnalyzer() {
  const el = document.getElementById('wizardSection');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function scrollToRoadmap() {
  const el = document.getElementById('roadmapSection');
  if (el) {
    el.classList.add('active');
    document.getElementById('navRoadmapLink').classList.add('active');
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function goToWizardStep(step) {
  if (step === 2 && !validateStep1()) return;

  state.currentWizardStep = step;

  // Update tabs views
  document.getElementById('wizardStep1').classList.toggle('active', step === 1);
  document.getElementById('wizardStep2').classList.toggle('active', step === 2);
  document.getElementById('wizardStep3').classList.toggle('active', step === 3);

  // Update stepper circles
  const n1 = document.getElementById('nodeStep1');
  const n2 = document.getElementById('nodeStep2');
  const n3 = document.getElementById('nodeStep3');
  const line = document.getElementById('wizardActiveLine');

  n1.classList.remove('active', 'completed');
  n2.classList.remove('active', 'completed');
  n3.classList.remove('active', 'completed');

  if (step === 1) {
    n1.classList.add('active');
    line.style.width = '0%';
  } else if (step === 2) {
    n1.classList.add('completed');
    n2.classList.add('active');
    line.style.width = '50%';
  } else if (step === 3) {
    n1.classList.add('completed');
    n2.classList.add('completed');
    n3.classList.add('active');
    line.style.width = '100%';
  }
}

function validateStep1() {
  const resume = (document.getElementById('resumeTextInput').value || '').trim();
  const chipsCount = state.selectedSkills.size;
  const validationMsg = document.getElementById('step1ValidationMsg');

  if (resume.length < 25 && chipsCount < 3) {
    if (validationMsg) validationMsg.style.display = 'block';
    return false;
  }

  if (validationMsg) validationMsg.style.display = 'none';
  return true;
}

function proceedToStep2() {
  if (!validateStep1()) return;
  goToWizardStep(2);
}

/**
 * ============================================================================
 * 3-4 SECOND ANIMATED AI PIPELINE SIMULATION
 * ============================================================================
 */
function startAnalysisPipeline() {
  goToWizardStep(3);

  const steps = [
    { id: 'pStep1', text: "Extracting skills & semantic entities..." },
    { id: 'pStep2', text: "Evaluating proficiency signals from projects & certs..." },
    { id: 'pStep3', text: "Cross-referencing industry benchmark competencies..." },
    { id: 'pStep4', text: "Detecting critical skill gaps & synthesizing roadmap..." }
  ];

  // Reset steps UI
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`pStep${i}`);
    el.className = 'pipeline-step-item';
  }

  let currentIdx = 0;

  function runNextSubstep() {
    if (currentIdx > 0) {
      // Mark previous completed
      const prevEl = document.getElementById(`pStep${currentIdx}`);
      prevEl.className = 'pipeline-step-item completed';
      prevEl.querySelector('.pipeline-spinner').outerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      `;
    }

    if (currentIdx < steps.length) {
      const activeEl = document.getElementById(`pStep${currentIdx + 1}`);
      activeEl.className = 'pipeline-step-item processing';
      document.getElementById('pipelineMainText').textContent = steps[currentIdx].text;
      currentIdx++;
      setTimeout(runNextSubstep, 800);
    } else {
      // Finished all 4 steps -> render report
      setTimeout(() => {
        executeEngineAnalysis();
      }, 500);
    }
  }

  runNextSubstep();
}

function executeEngineAnalysis() {
  const resumeText = document.getElementById('resumeTextInput').value || '';
  const projectsText = document.getElementById('projectsInput').value || '';
  const certsText = document.getElementById('certificationsInput').value || '';
  const targetRole = TARGET_ROLES.find(r => r.id === state.selectedRoleId) || TARGET_ROLES[0];

  // 1. Skill Extraction
  const detectedSkills = extractSkillsFromProfile(resumeText, projectsText, certsText, state.selectedSkills);

  // 1.5. Merge state.verifiedLevels into detectedSkills
  if (state.verifiedLevels && Object.keys(state.verifiedLevels).length > 0) {
    for (const skillId in state.verifiedLevels) {
      const vLevel = state.verifiedLevels[skillId];
      const master = MASTER_SKILLS.find(m => m.id === skillId);
      if (master) {
        detectedSkills[skillId] = {
          id: master.id,
          name: master.name,
          category: master.category,
          level: vLevel,
          isVerified: true
        };
      }
    }
  }

  // 2. Perform Gap Calculation
  const result = performGapAnalysis(detectedSkills, targetRole);
  state.analysisResult = result;

  // 3. Render Report Dashboard
  renderReportDashboard(result);

  // 4. Render Roadmap (preserves checked milestones in state.roadmapCheckedItems)
  renderRoadmapTimeline(result);

  // 4.5. Initialize Assessment Section
  initAssessmentSection(result);

  // 5. Transition view smoothly to report section
  const reportSec = document.getElementById('reportSection');
  reportSec.classList.add('active');
  document.getElementById('navReportLink').classList.add('active');

  const assessSec = document.getElementById('assessmentSection');
  if (assessSec) assessSec.classList.add('active');
  const navAssessLink = document.getElementById('navAssessmentLink');
  if (navAssessLink) navAssessLink.classList.add('active');

  const roadmapSec = document.getElementById('roadmapSection');
  roadmapSec.classList.add('active');
  document.getElementById('navRoadmapLink').classList.add('active');

  reportSec.scrollIntoView({ behavior: 'smooth' });
}

function resetToAnalyzer() {
  goToWizardStep(1);
  scrollToAnalyzer();
}

/**
 * ============================================================================
 * REPORT DASHBOARD RENDERER & CHART.JS INITIALIZATION
 * ============================================================================
 */
function renderReportDashboard(result) {
  // Update header text
  document.getElementById('reportRoleBadge').textContent = `Target Role: ${result.targetRole.title}`;
  document.getElementById('reportSubtitle').textContent = `Evaluating profile against ${result.targetRole.skills.length} core competencies for ${result.targetRole.title}.`;
  document.getElementById('reportTimestamp').textContent = `Generated on ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  // Donut score animation
  animateCountUp('donutScoreVal', result.skillGapScore, '%');
  document.getElementById('matchPercentageText').textContent = `${result.weightedMatchPercent}%`;

  // Before / After verification recalculation card
  const diffCard = document.getElementById('verificationDiffCard');
  if (diffCard) {
    if (state.lastGapBeforeVerification !== null && state.lastGapBeforeVerification !== undefined) {
      document.getElementById('diffOldGap').textContent = `Gap ${state.lastGapBeforeVerification}%`;
      document.getElementById('diffNewGap').textContent = `Gap ${result.skillGapScore}%`;
      const numVerified = Object.keys(state.verifiedLevels || {}).length;
      document.getElementById('diffSummaryText').textContent =
        `Gap ${state.lastGapBeforeVerification}% -> ${result.skillGapScore}%: Recalibrated with ${numVerified} verified skill assessment${numVerified > 1 ? 's' : ''} (overriding keyword estimates).`;
      diffCard.style.display = 'block';
    } else {
      diffCard.style.display = 'none';
    }
  }

  // Readiness badge update
  const badgeEl = document.getElementById('readinessBadge');
  badgeEl.className = `readiness-status-badge ${result.readinessTier.badgeClass}`;
  document.getElementById('readinessStatusText').textContent = result.readinessTier.label;
  document.getElementById('readinessAdvice').innerHTML = `
    You match <span style="color: var(--accent-cyan); font-weight: 700;">${result.weightedMatchPercent}%</span> of the weighted competencies. ${result.readinessTier.advice}
  `;

  // Render Charts
  renderDonutChart(result.skillGapScore);
  renderRadarChart(result);

  // Render Strong Skills List
  document.getElementById('strongCount').textContent = result.strongSkills.length;
  const strongListContainer = document.getElementById('strongSkillsList');
  strongListContainer.innerHTML = '';

  if (result.strongSkills.length === 0) {
    strongListContainer.innerHTML = `<div style="padding: 16px; color: var(--text-muted); font-size: 0.85rem; text-align: center;">No competencies met the benchmark yet. Review the gaps below.</div>`;
  } else {
    result.strongSkills.forEach(skill => {
      const row = document.createElement('div');
      row.className = 'skill-item-row';
      const verifyBadge = skill.isVerified
        ? `<span class="badge badge-verified"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified</span>`
        : `<span class="badge badge-estimated">Estimated</span>`;

      row.innerHTML = `
        <div class="skill-row-top">
          <div class="skill-row-name">
            <span>${skill.name}</span>
            ${verifyBadge}
            <span class="badge badge-success" style="font-size: 0.65rem;">Level ${skill.studentLevel} / ${skill.requiredLevel}</span>
          </div>
          <div class="level-indicator">
            ${renderLevelDots(skill.studentLevel, 5, 'success')}
          </div>
        </div>
        <div style="font-size: 0.75rem; color: var(--text-muted);">${skill.category} • Criticality: ${'★'.repeat(skill.weight)}</div>
      `;
      strongListContainer.appendChild(row);
    });
  }

  // Render Needs Improvement List
  document.getElementById('gapCount').textContent = result.gapSkills.length;
  const gapListContainer = document.getElementById('gapSkillsList');
  gapListContainer.innerHTML = '';

  result.gapSkills.forEach(skill => {
    const row = document.createElement('div');
    row.className = 'skill-item-row';
    const isMissing = skill.studentLevel === 0;
    const badgeStyle = isMissing ? 'badge-danger' : 'badge-warning';
    const statusText = isMissing ? 'Missing Competency' : `Deficit: -${skill.gap} Levels`;
    const verifyBadge = skill.isVerified
      ? `<span class="badge badge-verified"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified</span>`
      : `<span class="badge badge-estimated">Estimated</span>`;

    row.innerHTML = `
      <div class="skill-row-top">
        <div class="skill-row-name">
          <span>${skill.name}</span>
          ${verifyBadge}
          <span class="badge ${badgeStyle}" style="font-size: 0.65rem;">${statusText}</span>
        </div>
        <div class="level-indicator">
          ${renderLevelDots(skill.studentLevel, skill.requiredLevel, 'warning')}
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted);">
        <span>${skill.category}</span>
        <span>Target: Level ${skill.requiredLevel} | Current: Level ${skill.studentLevel}</span>
      </div>
    `;
    gapListContainer.appendChild(row);
  });

  // Render Recommended Strategic Actions
  const actionsContainer = document.getElementById('recommendedActionsContainer');
  actionsContainer.innerHTML = '';
  result.recommendedActions.forEach((act, idx) => {
    const card = document.createElement('div');
    card.className = 'action-item';
    if (act.isAssessmentAction) {
      card.style.cursor = 'pointer';
      card.onclick = scrollToAssessment;
      card.style.borderColor = 'var(--border-cyan)';
    }
    card.innerHTML = `
      <div class="action-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
      </div>
      <div>
        <div class="action-title">${act.title}</div>
        <div class="action-desc">${act.desc}</div>
      </div>
    `;
    actionsContainer.appendChild(card);
  });
}

function renderLevelDots(current, max, colorClass) {
  let dots = '';
  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= current;
    const cls = isFilled ? (colorClass === 'success' ? 'filled-success' : 'filled-warning') : '';
    dots += `<div class="level-dot ${cls}"></div>`;
  }
  return dots;
}

function animateCountUp(elementId, targetValue, suffix = '') {
  const el = document.getElementById(elementId);
  if (!el) return;

  let current = 0;
  const duration = 1200;
  const stepTime = 20;
  const totalSteps = duration / stepTime;
  const increment = targetValue / totalSteps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= targetValue) {
      current = targetValue;
      clearInterval(timer);
    }
    el.textContent = `${Math.round(current)}${suffix}`;
  }, stepTime);
}

/**
 * Donut Chart rendering using Chart.js
 */
function renderDonutChart(gapScore) {
  const ctx = document.getElementById('gapDonutChart');
  if (!ctx) return;

  if (state.donutChartInstance) {
    state.donutChartInstance.destroy();
  }

  const matchScore = 100 - gapScore;

  state.donutChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Skill Gap', 'Matched Competency'],
      datasets: [{
        data: [gapScore, matchScore],
        backgroundColor: [
          '#EF4444', // Danger red for gap
          '#00D4FF'  // Cyan for matched
        ],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '78%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return ` ${context.label}: ${context.raw}%`;
            }
          }
        }
      },
      animation: {
        animateScale: true,
        animateRotate: true,
        duration: 1500
      }
    }
  });
}

/**
 * Radar Chart rendering using Chart.js
 */
function renderRadarChart(result) {
  const ctx = document.getElementById('competencyRadarChart');
  if (!ctx) return;

  if (state.radarChartInstance) {
    state.radarChartInstance.destroy();
  }

  // Derive categories
  const categories = Object.keys(result.categoryScores);
  const studentData = categories.map(cat => {
    const data = result.categoryScores[cat];
    return data.count > 0 ? (data.student / (data.count * 5)) * 100 : 0;
  });
  const benchmarkData = categories.map(cat => {
    const data = result.categoryScores[cat];
    return data.count > 0 ? (data.required / (data.count * 5)) * 100 : 0;
  });

  state.radarChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: categories,
      datasets: [
        {
          label: 'Your Verified Level (%)',
          data: studentData,
          backgroundColor: 'rgba(0, 212, 255, 0.25)',
          borderColor: '#00D4FF',
          borderWidth: 2,
          pointBackgroundColor: '#00D4FF',
          pointBorderColor: '#050B1A',
          pointRadius: 4
        },
        {
          label: 'Target Role Benchmark (%)',
          data: benchmarkData,
          backgroundColor: 'rgba(37, 99, 235, 0.15)',
          borderColor: '#2563EB',
          borderWidth: 2,
          borderDash: [4, 4],
          pointBackgroundColor: '#2563EB',
          pointBorderColor: '#050B1A',
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            display: false,
            stepSize: 25
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.08)'
          },
          angleLines: {
            color: 'rgba(255, 255, 255, 0.12)'
          },
          pointLabels: {
            color: '#8FA3C0',
            font: {
              family: "'Inter', sans-serif",
              size: 11,
              weight: '600'
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#E6F1FF',
            font: { family: "'Inter', sans-serif", size: 12 },
            boxWidth: 14
          }
        }
      }
    }
  });
}

/**
 * ============================================================================
 * ROADMAP & PROGRESS TRACKER CONTROLLER
 * ============================================================================
 */
function renderRoadmapTimeline(result) {
  const container = document.getElementById('roadmapTimelineContainer');
  if (!container) return;

  container.innerHTML = '';

  result.phasedRoadmap.forEach(phase => {
    const phaseBlock = document.createElement('div');
    phaseBlock.className = 'roadmap-phase-block';

    let cardsHtml = '';
    phase.items.forEach(item => {
      const isChecked = state.roadmapCheckedItems.has(item.id);
      cardsHtml += `
        <div class="roadmap-item-card ${isChecked ? 'completed' : ''}" id="card_${item.id}">
          <div class="roadmap-item-header">
            <div class="roadmap-item-title-row">
              <label class="custom-checkbox-wrapper">
                <input type="checkbox" class="custom-checkbox-input" id="check_${item.id}" ${isChecked ? 'checked' : ''} onchange="toggleRoadmapItem('${item.id}')">
                <div class="custom-checkbox-box">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
              </label>
              <span class="item-skill-title">${item.skill}</span>
            </div>
            <div class="item-meta-badges">
              <span class="badge badge-cyan">${item.category}</span>
              <span class="badge badge-warning">Est. ${item.estimatedHours} hrs</span>
            </div>
          </div>
          <div class="item-why-it-matters">${item.whyItMatters}</div>
          <div class="item-resources-box">
            <span class="resources-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              Curated Free Resources:
            </span>
            <div class="resource-tags">
              ${item.resources.map(res => `<span class="resource-tag">${res}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    });

    phaseBlock.innerHTML = `
      <div class="phase-marker">0${phase.phaseNumber}</div>
      <div class="phase-title-bar">
        <div>
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.05em;">${phase.timeframe}</div>
          <div class="phase-name">${phase.title}</div>
        </div>
        <span class="badge badge-cyan">${phase.items.length} Milestones</span>
      </div>
      <div class="phase-cards-list">
        ${cardsHtml}
      </div>
    `;

    container.appendChild(phaseBlock);
  });

  updateProgressRing();
}

function toggleRoadmapItem(itemId) {
  const isNowChecked = document.getElementById(`check_${itemId}`).checked;
  const card = document.getElementById(`card_${itemId}`);

  if (isNowChecked) {
    state.roadmapCheckedItems.add(itemId);
    if (card) card.classList.add('completed');
  } else {
    state.roadmapCheckedItems.delete(itemId);
    if (card) card.classList.remove('completed');
  }

  saveLocalStorage();
  updateProgressRing();
}

function updateProgressRing() {
  if (!state.analysisResult) return;

  let totalItems = 0;
  state.analysisResult.phasedRoadmap.forEach(p => totalItems += p.items.length);

  const completedCount = state.roadmapCheckedItems.size;
  const percent = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  // SVG dash calculation: 2 * PI * 32 = 201 approx
  const circle = document.getElementById('roadmapProgressCircle');
  if (circle) {
    const circumference = 201;
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }

  document.getElementById('roadmapProgressPercent').textContent = `${percent}%`;
  document.getElementById('trackerCompletedCount').textContent = `${completedCount} of ${totalItems} Roadmap Milestones Completed`;

  const msgEl = document.getElementById('trackerDynamicMessage');
  if (percent === 0) {
    msgEl.textContent = "Check off milestones as you master skills to track your improving readiness.";
  } else if (percent < 50) {
    msgEl.textContent = "Great momentum! You are actively closing your foundational competency gaps.";
  } else if (percent < 100) {
    msgEl.textContent = "Over halfway through! Your portfolio is moving significantly closer to campus placement readiness.";
  } else {
    msgEl.textContent = "Congratulations! You have completed all identified sprint milestones. You are primed for technical interviews!";
  }
}

function resetRoadmapProgress() {
  state.roadmapCheckedItems.clear();
  saveLocalStorage();
  if (state.analysisResult) {
    renderRoadmapTimeline(state.analysisResult);
  }
}

/**
 * ============================================================================
 * DESIGN THINKING TABS & FEEDBACK HANDLER
 * ============================================================================
 */
function switchDTTab(tabKey) {
  const tabs = ['empathize', 'define', 'ideate', 'prototype', 'test'];
  tabs.forEach(t => {
    const pane = document.getElementById(`pane-${t}`);
    if (pane) pane.classList.toggle('active', t === tabKey);
  });

  const allBtns = document.querySelectorAll('.dt-tab-btn');
  allBtns.forEach((btn, idx) => {
    btn.classList.toggle('active', tabs[idx] === tabKey);
  });
}

function setRating(rating) {
  document.getElementById('ratingValueInput').value = rating;
  const stars = document.querySelectorAll('#starRatingGroup .star-btn');
  stars.forEach((star, index) => {
    star.classList.toggle('active', index < rating);
  });
}

function submitDTFeedback(e) {
  e.preventDefault();
  const rating = document.getElementById('ratingValueInput').value;
  const notes = document.getElementById('feedbackImprovementText').value;

  const feedbackPayload = {
    rating,
    notes,
    timestamp: new Date().toISOString()
  };

  try {
    const existing = JSON.parse(localStorage.getItem('dt_user_feedback') || '[]');
    existing.push(feedbackPayload);
    localStorage.setItem('dt_user_feedback', JSON.stringify(existing));

    const alertEl = document.getElementById('feedbackSavedAlert');
    alertEl.style.display = 'inline';
    document.getElementById('feedbackSubmitBtn').disabled = true;

    setTimeout(() => {
      alertEl.style.display = 'none';
      document.getElementById('feedbackSubmitBtn').disabled = false;
      document.getElementById('feedbackImprovementText').value = '';
    }, 3500);
  } catch (err) {
    console.warn("Storage access failed:", err);
  }
}

/**
 * ============================================================================
 * LOCAL STORAGE PERSISTENCE (Safely Wrapped in try/catch)
 * ============================================================================
 */
function initLocalStorage() {
  try {
    const saved = localStorage.getItem('roadmap_checked_items');
    if (saved) {
      const arr = JSON.parse(saved);
      state.roadmapCheckedItems = new Set(arr);
    }
    const savedLevels = localStorage.getItem('verified_skill_levels');
    if (savedLevels) {
      state.verifiedLevels = JSON.parse(savedLevels) || {};
    }
  } catch (err) {
    console.warn("Local storage read error:", err);
  }
}

function saveLocalStorage() {
  try {
    const arr = Array.from(state.roadmapCheckedItems);
    localStorage.setItem('roadmap_checked_items', JSON.stringify(arr));
    localStorage.setItem('verified_skill_levels', JSON.stringify(state.verifiedLevels || {}));
  } catch (err) {
    console.warn("Local storage write error:", err);
  }
}

/**
 * Navbar active scroll indicator
 */
function setupNavbarActiveScroll() {
  window.addEventListener('scroll', () => {
    const sections = ['hero', 'problemSolution', 'wizardSection', 'reportSection', 'assessmentSection', 'roadmapSection', 'designThinkingSection'];
    const scrollPos = window.scrollY + 140;

    sections.forEach(secId => {
      const sec = document.getElementById(secId);
      if (!sec) return;
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${secId}`);
        });
      }
    });
  });
}

/**
 * ============================================================================
 * SKILL ASSESSMENT QUIZ CONTROLLER & DETERMINISTIC SCORING ENGINE
 * ============================================================================
 */

function scrollToAssessment() {
  const el = document.getElementById('assessmentSection');
  if (el) {
    el.classList.add('active');
    const navLink = document.getElementById('navAssessmentLink');
    if (navLink) navLink.classList.add('active');
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Deterministic scoring scale (0 to 4):
 * 0 points = level 0, 1-2 = level 1, 3-4 = level 2, 5-7 = level 3, 8-10 = level 4
 */
function calculateVerifiedLevel(points) {
  if (points >= 8) return 4;
  if (points >= 5) return 3;
  if (points >= 3) return 2;
  if (points >= 1) return 1;
  return 0;
}

function clearVerifiedLevels() {
  state.verifiedLevels = {};
  state.lastGapBeforeVerification = null;
  state.activeQuiz = null;
  try {
    localStorage.removeItem('verified_skill_levels');
  } catch (err) {
    console.warn("Storage write error clearing verified levels:", err);
  }
  const diffCard = document.getElementById('verificationDiffCard');
  if (diffCard) diffCard.style.display = 'none';
}

function initAssessmentSection(result) {
  if (state.activeQuiz && state.activeQuiz.inProgress) return;

  const selectionView = document.getElementById('quizSelectionView');
  const activeView = document.getElementById('quizActiveView');
  const resultsView = document.getElementById('quizResultsView');

  if (selectionView) selectionView.style.display = 'block';
  if (activeView) activeView.style.display = 'none';
  if (resultsView) resultsView.style.display = 'none';

  renderAssessmentSkillSelection(result);
}

function getAssessableSkillsForRole(result) {
  const assessableMap = new Map();

  // 1. Map gap skills to QUIZ_BANK
  result.gapSkills.forEach(gapSkill => {
    const matchedMasterIds = mapRoleSkillToMasterSkillIds(gapSkill);
    matchedMasterIds.forEach(mId => {
      if (typeof QUIZ_BANK !== 'undefined' && QUIZ_BANK[mId] && !assessableMap.has(mId)) {
        const master = MASTER_SKILLS.find(m => m.id === mId);
        if (master) {
          assessableMap.set(mId, {
            id: mId,
            name: master.name,
            category: master.category,
            gap: gapSkill.gap,
            weight: gapSkill.weight
          });
        }
      }
    });
  });

  // 2. If fewer than 8, complement with any other target role skills in QUIZ_BANK
  if (assessableMap.size < 8 && result.targetRole) {
    result.targetRole.skills.forEach(roleSkill => {
      const matchedMasterIds = mapRoleSkillToMasterSkillIds(roleSkill);
      matchedMasterIds.forEach(mId => {
        if (assessableMap.size < 8 && typeof QUIZ_BANK !== 'undefined' && QUIZ_BANK[mId] && !assessableMap.has(mId)) {
          const master = MASTER_SKILLS.find(m => m.id === mId);
          if (master) {
            assessableMap.set(mId, {
              id: mId,
              name: master.name,
              category: master.category,
              gap: 0,
              weight: roleSkill.weight
            });
          }
        }
      });
    });
  }

  return Array.from(assessableMap.values());
}

function renderAssessmentSkillSelection(result) {
  const container = document.getElementById('quizSkillCheckboxes');
  if (!container) return;
  container.innerHTML = '';

  const assessableSkills = getAssessableSkillsForRole(result);

  // Top 5 gap skills selected by default
  const defaultSelected = new Set(assessableSkills.slice(0, 5).map(s => s.id));

  assessableSkills.forEach(skill => {
    const card = document.createElement('label');
    card.className = `quiz-skill-checkbox-card ${defaultSelected.has(skill.id) ? 'selected' : ''}`;
    card.htmlFor = `quizCheck_${skill.id}`;

    card.innerHTML = `
      <input type="checkbox" id="quizCheck_${skill.id}" value="${skill.id}" ${defaultSelected.has(skill.id) ? 'checked' : ''} onchange="updateQuizSkillSelection()">
      <div class="quiz-skill-card-info">
        <div class="quiz-skill-card-title">${skill.name}</div>
        <div class="quiz-skill-card-meta">
          <span>${skill.category}</span>
          <span style="color: var(--accent-cyan); font-weight: 600;">${skill.gap > 0 ? `Deficit: -${skill.gap}` : 'Evaluated'}</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  updateQuizSkillSelection();
}

function updateQuizSkillSelection() {
  const container = document.getElementById('quizSkillCheckboxes');
  if (!container) return;

  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  let selectedCount = 0;

  checkboxes.forEach(cb => {
    const parentCard = cb.closest('.quiz-skill-checkbox-card');
    if (cb.checked) {
      selectedCount++;
      if (parentCard) parentCard.classList.add('selected');
    } else {
      if (parentCard) parentCard.classList.remove('selected');
    }
  });

  const selectedCountBadge = document.getElementById('quizSelectedCountBadge');
  const msgEl = document.getElementById('quizSelectionMsg');
  const startBtn = document.getElementById('startQuizBtn');

  if (selectedCountBadge) {
    selectedCountBadge.textContent = `${selectedCount} Skill${selectedCount === 1 ? '' : 's'} Selected (${selectedCount * 4} Questions • ~${Math.max(2, Math.round(selectedCount * 1.2))} min)`;
  }

  // Toggle 1 to 8 skills allowed
  const isValid = selectedCount >= 1 && selectedCount <= 8;
  if (startBtn) startBtn.disabled = !isValid;

  if (msgEl) {
    if (!isValid) {
      msgEl.style.display = 'inline';
      msgEl.textContent = selectedCount === 0
        ? 'Please select at least 1 skill to assess.'
        : 'Maximum 8 skills can be assessed in one sitting.';
    } else {
      msgEl.style.display = 'none';
    }
  }
}

function startQuizAssessment() {
  const container = document.getElementById('quizSkillCheckboxes');
  if (!container) return;

  const checkedBoxes = Array.from(container.querySelectorAll('input[type="checkbox"]:checked'));
  const selectedSkillIds = checkedBoxes.map(cb => cb.value);

  if (selectedSkillIds.length < 1 || selectedSkillIds.length > 8) {
    updateQuizSkillSelection();
    return;
  }

  // Compile 4 questions per skill (difficulties 1 to 4)
  const questionList = [];
  selectedSkillIds.forEach(skillId => {
    const bank = (typeof QUIZ_BANK !== 'undefined' && QUIZ_BANK[skillId]) ? QUIZ_BANK[skillId] : [];
    bank.forEach(q => {
      questionList.push({
        ...q,
        skillId: skillId
      });
    });
  });

  state.activeQuiz = {
    inProgress: true,
    skillIds: selectedSkillIds,
    questions: questionList,
    currentIndex: 0,
    skillPoints: {},
    questionAnswered: false
  };

  selectedSkillIds.forEach(id => {
    state.activeQuiz.skillPoints[id] = 0;
  });

  document.getElementById('quizSelectionView').style.display = 'none';
  document.getElementById('quizResultsView').style.display = 'none';
  const activeView = document.getElementById('quizActiveView');
  activeView.style.display = 'block';

  renderCurrentQuizQuestion();
  activeView.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderCurrentQuizQuestion() {
  const quiz = state.activeQuiz;
  if (!quiz || quiz.currentIndex >= quiz.questions.length) {
    renderQuizResults();
    return;
  }

  quiz.questionAnswered = false;
  const q = quiz.questions[quiz.currentIndex];
  const master = MASTER_SKILLS.find(m => m.id === q.skillId) || { name: q.skillId };

  // Progress Bar & Meta
  document.getElementById('quizCurrentSkillName').textContent = master.name;
  document.getElementById('quizQuestionCounter').textContent = `Question ${quiz.currentIndex + 1} of ${quiz.questions.length}`;

  const pct = Math.round(((quiz.currentIndex) / quiz.questions.length) * 100);
  document.getElementById('quizProgressBar').style.width = `${pct}%`;

  // Difficulty dots (1 to 4)
  document.getElementById('quizDifficultyLabel').textContent = `Difficulty: Level ${q.difficulty} / 4 (${q.difficulty} pt${q.difficulty > 1 ? 's' : ''})`;
  const dotsContainer = document.getElementById('quizDifficultyDots');
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 1; i <= 4; i++) {
      const dot = document.createElement('span');
      dot.className = `diff-dot ${i <= q.difficulty ? 'filled' : ''}`;
      dotsContainer.appendChild(dot);
    }
  }

  // Prompt text
  document.getElementById('quizPromptText').textContent = q.prompt;

  // Options A, B, C, D
  const optionsGrid = document.getElementById('quizOptionsContainer');
  optionsGrid.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  q.options.forEach((optText, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option-btn';
    btn.id = `quizOptBtn_${idx}`;
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', 'false');
    btn.setAttribute('tabindex', '0');
    btn.onclick = () => selectQuizOption(idx);

    btn.innerHTML = `
      <span class="quiz-option-letter">${letters[idx]}</span>
      <span class="quiz-option-text">${optText}</span>
    `;

    optionsGrid.appendChild(btn);
  });

  // Hide explanation and reset toolbar
  const expBox = document.getElementById('quizExplanationBox');
  expBox.style.display = 'none';
  expBox.className = 'quiz-explanation-box';

  document.getElementById('quizSkipBtn').style.display = 'inline-flex';
  const nextBtn = document.getElementById('quizNextBtn');
  nextBtn.style.display = 'none';
  const isLast = (quiz.currentIndex === quiz.questions.length - 1);
  nextBtn.innerHTML = isLast
    ? `View Results <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : `Next Question <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
}

function selectQuizOption(selectedIdx) {
  const quiz = state.activeQuiz;
  if (!quiz || quiz.questionAnswered) return;
  quiz.questionAnswered = true;

  const q = quiz.questions[quiz.currentIndex];
  const isCorrect = (selectedIdx === q.correctIndex);

  if (isCorrect) {
    quiz.skillPoints[q.skillId] = (quiz.skillPoints[q.skillId] || 0) + q.difficulty;
  }

  // Highlight options
  const options = document.querySelectorAll('.quiz-option-btn');
  options.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correctIndex) {
      btn.classList.add('correct');
      btn.setAttribute('aria-checked', 'true');
    } else if (idx === selectedIdx && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });

  // Reveal Explanation
  const expBox = document.getElementById('quizExplanationBox');
  expBox.style.display = 'block';
  expBox.className = `quiz-explanation-box ${isCorrect ? 'correct' : 'incorrect'}`;
  document.getElementById('quizExplanationTitle').textContent = isCorrect
    ? `Correct! (+${q.difficulty} pt${q.difficulty > 1 ? 's' : ''})`
    : `Incorrect (0 pts)`;
  document.getElementById('quizExplanationText').textContent = q.explanation;

  // Toggle toolbar
  document.getElementById('quizSkipBtn').style.display = 'none';
  const nextBtn = document.getElementById('quizNextBtn');
  nextBtn.style.display = 'inline-flex';
  nextBtn.focus();
}

function skipQuizQuestion() {
  const quiz = state.activeQuiz;
  if (!quiz || quiz.questionAnswered) return;
  quiz.questionAnswered = true;

  const q = quiz.questions[quiz.currentIndex];

  // Highlight correct option
  const options = document.querySelectorAll('.quiz-option-btn');
  options.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correctIndex) {
      btn.classList.add('correct');
    }
  });

  // Reveal Explanation
  const expBox = document.getElementById('quizExplanationBox');
  expBox.style.display = 'block';
  expBox.className = 'quiz-explanation-box incorrect';
  document.getElementById('quizExplanationTitle').textContent = 'Question Skipped (0 pts)';
  document.getElementById('quizExplanationText').textContent = q.explanation;

  document.getElementById('quizSkipBtn').style.display = 'none';
  const nextBtn = document.getElementById('quizNextBtn');
  nextBtn.style.display = 'inline-flex';
  nextBtn.focus();
}

function nextQuizQuestion() {
  const quiz = state.activeQuiz;
  if (!quiz) return;

  quiz.currentIndex++;
  if (quiz.currentIndex < quiz.questions.length) {
    renderCurrentQuizQuestion();
  } else {
    renderQuizResults();
  }
}

function renderQuizResults() {
  const quiz = state.activeQuiz;
  if (!quiz) return;
  quiz.inProgress = false;

  document.getElementById('quizActiveView').style.display = 'none';
  const resultsView = document.getElementById('quizResultsView');
  resultsView.style.display = 'block';

  let totalScored = 0;
  const maxPossible = quiz.skillIds.length * 10; // 10 pts max per skill

  const tbody = document.getElementById('quizResultsTableBody');
  tbody.innerHTML = '';

  quiz.skillIds.forEach(skillId => {
    const points = quiz.skillPoints[skillId] || 0;
    totalScored += points;
    const verifiedLvl = calculateVerifiedLevel(points);

    const master = MASTER_SKILLS.find(m => m.id === skillId) || { name: skillId };

    // Determine inferred level from previous analysis
    let inferredLvl = 0;
    if (state.analysisResult) {
      const matchInRole = state.analysisResult.targetRole.skills.find(rs => {
        const ids = mapRoleSkillToMasterSkillIds(rs);
        return ids.includes(skillId);
      });
      if (matchInRole) {
        const gapObj = state.analysisResult.gapSkills.find(g => g.name === matchInRole.name);
        const strongObj = state.analysisResult.strongSkills.find(s => s.name === matchInRole.name);
        inferredLvl = (gapObj || strongObj) ? (gapObj || strongObj).studentLevel : 0;
      }
    }

    const tr = document.createElement('tr');
    let deltaBadge = '';
    if (verifiedLvl > inferredLvl) {
      deltaBadge = `<span class="badge badge-success">+${verifiedLvl - inferredLvl} Levels Upgraded</span>`;
    } else if (verifiedLvl === inferredLvl) {
      deltaBadge = `<span class="badge badge-cyan">Level Confirmed</span>`;
    } else {
      deltaBadge = `<span class="badge badge-warning">Adjusted (-${inferredLvl - verifiedLvl})</span>`;
    }

    tr.innerHTML = `
      <td><strong>${master.name}</strong></td>
      <td>Level ${inferredLvl} <span style="font-size: 0.75rem; color: var(--text-muted);">(Resume estimate)</span></td>
      <td>
        <span style="font-weight: 700; color: var(--accent-cyan);">${points} / 10 pts</span>
      </td>
      <td>
        <span style="font-weight: 800; color: var(--text-primary);">Level ${verifiedLvl}</span>
      </td>
      <td>${deltaBadge}</td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('quizTotalPointsBadge').textContent = `Total Score: ${totalScored} / ${maxPossible} pts`;
  resultsView.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function applyVerifiedLevels() {
  const quiz = state.activeQuiz;
  if (!quiz) return;

  // Record gap before verification for before/after diff card
  if (state.analysisResult) {
    state.lastGapBeforeVerification = state.analysisResult.skillGapScore;
  }

  // Update verifiedLevels
  quiz.skillIds.forEach(skillId => {
    const points = quiz.skillPoints[skillId] || 0;
    state.verifiedLevels[skillId] = calculateVerifiedLevel(points);
  });

  // Persist to localStorage safely
  try {
    localStorage.setItem('verified_skill_levels', JSON.stringify(state.verifiedLevels));
  } catch (err) {
    console.warn("Storage write error for verified levels:", err);
  }

  // Recalculate analysis with verified levels merged
  executeEngineAnalysis();

  // Scroll smoothly to report dashboard
  const reportSec = document.getElementById('reportSection');
  if (reportSec) {
    reportSec.scrollIntoView({ behavior: 'smooth' });
  }
}

function retakeQuizAssessment() {
  const selectionView = document.getElementById('quizSelectionView');
  const activeView = document.getElementById('quizActiveView');
  const resultsView = document.getElementById('quizResultsView');

  if (selectionView) selectionView.style.display = 'block';
  if (activeView) activeView.style.display = 'none';
  if (resultsView) resultsView.style.display = 'none';

  state.activeQuiz = null;
  if (state.analysisResult) {
    renderAssessmentSkillSelection(state.analysisResult);
  }

  selectionView.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function setupQuizKeyboardNavigation() {
  window.addEventListener('keydown', (e) => {
    const activeView = document.getElementById('quizActiveView');
    if (!activeView || activeView.style.display === 'none') return;
    if (!state.activeQuiz || !state.activeQuiz.inProgress) return;

    const key = e.key.toLowerCase();
    let optionIdx = -1;

    if (key === '1' || key === 'a') optionIdx = 0;
    else if (key === '2' || key === 'b') optionIdx = 1;
    else if (key === '3' || key === 'c') optionIdx = 2;
    else if (key === '4' || key === 'd') optionIdx = 3;

    if (optionIdx >= 0 && !state.activeQuiz.questionAnswered) {
      e.preventDefault();
      selectQuizOption(optionIdx);
    } else if (e.key === 'Enter' && state.activeQuiz.questionAnswered) {
      const nextBtn = document.getElementById('quizNextBtn');
      if (nextBtn && nextBtn.style.display !== 'none') {
        e.preventDefault();
        nextQuizQuestion();
      }
    }
  });
}
