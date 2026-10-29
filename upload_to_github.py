"""
GitHub Uploader for AI Skill Gap Detector
Uploads all project files directly to GitHub using the GitHub REST API.
"""

import os
import sys
import json
import base64
import urllib.request
import urllib.error

REPO_OWNER = "harshalpatilhp08-hash"
REPO_NAME = "AI-SKILL-GAP-DETECTOR"
BRANCH = "main"

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))

IGNORE_FILES = {
    "upload_to_github.py",
    ".git",
    "node_modules",
    "DOC56F.tmp",
}

def get_file_sha(file_path_in_repo, token):
    """Check if file exists and get its SHA (needed to update existing files)."""
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{file_path_in_repo}?ref={BRANCH}"
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "User-Agent": "AI-Skill-Gap-Uploader"
    })
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            return data.get("sha")
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None
        raise

def upload_file(local_path, file_path_in_repo, token):
    """Upload or update a single file in the repository."""
    with open(local_path, "rb") as f:
        content_bytes = f.read()

    b64_content = base64.b64encode(content_bytes).decode("utf-8")
    existing_sha = get_file_sha(file_path_in_repo, token)

    payload = {
        "message": f"feat: add {file_path_in_repo}",
        "content": b64_content,
        "branch": BRANCH
    }
    if existing_sha:
        payload["sha"] = existing_sha
        payload["message"] = f"chore: update {file_path_in_repo}"

    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{file_path_in_repo}"
    data = json.dumps(payload).encode("utf-8")

    req = urllib.request.Request(url, data=data, method="PUT", headers={
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "AI-Skill-Gap-Uploader"
    })

    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode())

def main():
    token = os.environ.get("GITHUB_TOKEN")
    if not token and len(sys.argv) > 1:
        token = sys.argv[1].strip()

    if not token:
        print("=" * 60)
        print("  AI SKILL GAP DETECTOR - GITHUB UPLOADER")
        print("=" * 60)
        print(f"Target Repo: https://github.com/{REPO_OWNER}/{REPO_NAME}")
        print("\nPlease enter your GitHub Personal Access Token (PAT):")
        print("(Generate one at: https://github.com/settings/tokens with 'repo' scope)")
        try:
            token = input("GitHub Token: ").strip()
        except EOFError:
            pass

    if not token:
        print("Error: No GitHub Token provided. Exiting.")
        sys.exit(1)

    print(f"\n[1/3] Authenticating with GitHub repository {REPO_OWNER}/{REPO_NAME}...")
    # Verify repo access
    repo_url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}"
    test_req = urllib.request.Request(repo_url, headers={
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "User-Agent": "AI-Skill-Gap-Uploader"
    })
    try:
        with urllib.request.urlopen(test_req) as resp:
            repo_data = json.loads(resp.read().decode())
            print(f"  Connected successfully to: {repo_data['full_name']} ({repo_data['visibility']})")
    except urllib.error.HTTPError as e:
        print(f"Authentication failed: HTTP {e.code} - {e.reason}")
        if e.code == 401:
            print("  Check that your token is valid and not expired.")
        elif e.code == 404:
            print(f"  Check that the repository '{REPO_OWNER}/{REPO_NAME}' exists and the token has 'repo' permissions.")
        sys.exit(1)

    # Collect files
    files_to_upload = []
    for root, dirs, files in os.walk(PROJECT_DIR):
        dirs[:] = [d for d in dirs if d not in IGNORE_FILES and not d.startswith(".")]
        for file in files:
            if file in IGNORE_FILES:
                continue
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, PROJECT_DIR).replace("\\", "/")
            files_to_upload.append((full_path, rel_path))

    print(f"\n[2/3] Uploading {len(files_to_upload)} project files...")
    for idx, (full_path, rel_path) in enumerate(files_to_upload, 1):
        file_size_kb = os.path.getsize(full_path) / 1024
        print(f"  [{idx}/{len(files_to_upload)}] Uploading {rel_path} ({file_size_kb:.1f} KB)...", end=" ", flush=True)
        try:
            upload_file(full_path, rel_path, token)
            print("DONE")
        except urllib.error.HTTPError as e:
            print(f"FAILED (HTTP {e.code}: {e.reason})")
            error_body = e.read().decode(errors="ignore")
            print(f"    Details: {error_body}")
        except Exception as e:
            print(f"FAILED: {e}")

    print("\n" + "=" * 60)
    print("  PROJECT UPLOAD COMPLETE!")
    print("=" * 60)
    print(f"Repository: https://github.com/{REPO_OWNER}/{REPO_NAME}")
    print(f"Universal Live Link: https://{REPO_OWNER}.github.io/{REPO_NAME}/")
    print("=" * 60)

if __name__ == "__main__":
    main()
