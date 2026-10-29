/**
 * AI SKILL GAP DETECTOR - QUIZ QUESTION BANK
 * Comprehensive 4-tier assessment bank keyed by MASTER_SKILLS ids.
 * Scoring scale: difficulty 1-4 points per question, max 10 points per skill.
 */

const QUIZ_BANK = {
  dsa: [
    {
      id: "dsa_1",
      difficulty: 1,
      prompt: "What is the average time complexity of accessing an array element by its index?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
      correctIndex: 0,
      explanation: "Arrays store elements in contiguous memory, allowing immediate O(1) constant-time access by index."
    },
    {
      id: "dsa_2",
      difficulty: 2,
      prompt: "Which data structure operates on a First-In, First-Out (FIFO) basis?",
      options: ["Stack", "Queue", "Binary Search Tree", "Priority Queue"],
      correctIndex: 1,
      explanation: "A Queue processes elements in arrival order (FIFO), whereas Stacks follow Last-In, First-Out (LIFO)."
    },
    {
      id: "dsa_3",
      difficulty: 3,
      prompt: "What is the worst-case time complexity of searching an element in an unbalanced Binary Search Tree (BST)?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctIndex: 2,
      explanation: "When a BST degenerates into a linear chain (skewed tree), lookup degrades to O(n) linear time."
    },
    {
      id: "dsa_4",
      difficulty: 4,
      prompt: "Which algorithmic technique does Dijkstra's algorithm use to find the single-source shortest path?",
      options: ["Divide and Conquer", "Greedy with Min-Heap", "Dynamic Programming with Memoization", "Backtracking"],
      correctIndex: 1,
      explanation: "Dijkstra's algorithm greedily extracts the vertex with minimum tentative distance using a priority queue."
    }
  ],

  python: [
    {
      id: "python_1",
      difficulty: 1,
      prompt: "Which of the following built-in Python data types is immutable?",
      options: ["List", "Dictionary", "Tuple", "Set"],
      correctIndex: 2,
      explanation: "Tuples cannot be modified after creation, making them immutable sequences in Python."
    },
    {
      id: "python_2",
      difficulty: 2,
      prompt: "What does the expression [x**2 for x in range(4)] produce?",
      options: ["[1, 4, 9, 16]", "[0, 1, 4, 9]", "[0, 1, 2, 3]", "[0, 2, 4, 6]"],
      correctIndex: 1,
      explanation: "range(4) produces 0, 1, 2, 3; squaring each gives [0, 1, 4, 9]."
    },
    {
      id: "python_3",
      difficulty: 3,
      prompt: "In Python function definitions, what does *args allow a function to receive?",
      options: ["A keyword argument dictionary", "Any number of positional arguments as a tuple", "A required list of strings", "A generator object"],
      correctIndex: 1,
      explanation: "*args packs arbitrary positional arguments into a single tuple inside the function body."
    },
    {
      id: "python_4",
      difficulty: 4,
      prompt: "What is the primary consequence of CPython's Global Interpreter Lock (GIL)?",
      options: [
        "Memory leaks occur on every function exit",
        "Only one native thread can execute Python bytecode at any moment",
        "Recursion depth is capped at 10 iterations",
        "Variables must be declared with strict static types"
      ],
      correctIndex: 1,
      explanation: "The GIL prevents multi-threaded CPython programs from running bytecode across multiple CPU cores simultaneously."
    }
  ],

  javascript: [
    {
      id: "javascript_1",
      difficulty: 1,
      prompt: "What is the output of typeof [] in standard JavaScript?",
      options: ["\"array\"", "\"object\"", "\"list\"", "\"undefined\""],
      correctIndex: 1,
      explanation: "In JavaScript, arrays are objects, so typeof [] evaluates to \"object\"."
    },
    {
      id: "javascript_2",
      difficulty: 2,
      prompt: "What is the difference between == and === in JavaScript?",
      options: [
        "=== coerces types before checking equality",
        "=== checks value and type without type coercion",
        "== is only used for objects and arrays",
        "There is no difference in ES6"
      ],
      correctIndex: 1,
      explanation: "The strict equality operator (===) compares both value and type without implicit type conversion."
    },
    {
      id: "javascript_3",
      difficulty: 3,
      prompt: "In the JavaScript event loop, when do Promise microtasks execute relative to macrotasks (like setTimeout)?",
      options: [
        "After the next animation frame only",
        "Immediately after the current synchronous script and before the next macrotask",
        "In parallel threads simultaneously",
        "Never, microtasks are executed on page reload"
      ],
      correctIndex: 1,
      explanation: "The microtask queue is drained immediately after synchronous script execution before the next macrotask runs."
    },
    {
      id: "javascript_4",
      difficulty: 4,
      prompt: "What is a closure in JavaScript?",
      options: [
        "A function bundled with references to its surrounding lexical state",
        "A method to close network sockets automatically",
        "A syntax error caused by unmatched curly braces",
        "A private class keyword introduced in ES2022"
      ],
      correctIndex: 0,
      explanation: "A closure gives an inner function persistent access to variables in its outer enclosing scope even after outer execution."
    }
  ],

  java: [
    {
      id: "java_1",
      difficulty: 1,
      prompt: "Which component of Java is responsible for executing compiled bytecode?",
      options: ["JDK (Java Development Kit)", "JVM (Java Virtual Machine)", "JRE Plugin", "Javac Compiler"],
      correctIndex: 1,
      explanation: "The JVM interprets and JIT-compiles Java bytecode (.class files) into native machine instructions."
    },
    {
      id: "java_2",
      difficulty: 2,
      prompt: "What happens when a variable is declared with the final keyword in Java?",
      options: [
        "It can only be accessed within the same package",
        "Its reference cannot be reassigned once initialized",
        "It is destroyed immediately after method declaration",
        "It becomes a mutable global variable"
      ],
      correctIndex: 1,
      explanation: "A final variable's reference or primitive value cannot be reassigned once it has been initialized."
    },
    {
      id: "java_3",
      difficulty: 3,
      prompt: "What is the key difference between an Interface and an Abstract Class in modern Java?",
      options: [
        "A class can implement multiple interfaces but extend only one abstract class",
        "Abstract classes cannot contain concrete methods",
        "Interfaces can declare non-static protected fields",
        "Interfaces require all methods to be final"
      ],
      correctIndex: 0,
      explanation: "Java permits single class inheritance (one abstract class) but multiple interface implementation."
    },
    {
      id: "java_4",
      difficulty: 4,
      prompt: "In JVM garbage collection, what is the core premise of the 'Weak Generational Hypothesis'?",
      options: [
        "All objects live until the JVM terminates",
        "Most created objects survive multiple garbage collection cycles",
        "Most created objects have very short lifespans and die shortly after creation",
        "Garbage collection only reclaims primitive numbers"
      ],
      correctIndex: 2,
      explanation: "The generational hypothesis states that most objects die young, justifying separate Young (Eden/Survivor) and Tenured spaces."
    }
  ],

  cpp: [
    {
      id: "cpp_1",
      difficulty: 1,
      prompt: "Which operator is used in C++ to dereference a pointer variable?",
      options: ["&", "*", "->", "::"],
      correctIndex: 1,
      explanation: "The asterisk (*) dereferences a pointer to access or modify the value at that memory address."
    },
    {
      id: "cpp_2",
      difficulty: 2,
      prompt: "What does the RAII (Resource Acquisition Is Initialization) idiom ensure in C++?",
      options: [
        "Manual malloc calls are mandatory before main()",
        "Resource allocation and deallocation are bound to object lifetime via constructor and destructor",
        "All variables are automatically initialized to zero",
        "Pointers are converted into references at compile time"
      ],
      correctIndex: 1,
      explanation: "RAII guarantees resource cleanup when an object goes out of scope via its destructor, preventing memory leaks."
    },
    {
      id: "cpp_3",
      difficulty: 3,
      prompt: "Why are base class destructors usually declared as virtual in C++?",
      options: [
        "To prevent derived classes from being instantiated",
        "To ensure the derived class destructor is invoked when deleting via a base pointer",
        "To optimize compile-time function inlining",
        "To make the class copyable across threads"
      ],
      correctIndex: 1,
      explanation: "A virtual destructor guarantees that deleting a derived object via a base pointer invokes the derived destructor first."
    },
    {
      id: "cpp_4",
      difficulty: 4,
      prompt: "What does std::move() actually do in modern C++?",
      options: [
        "Physically moves bits in RAM to a new address",
        "Unconditionally casts an expression to an rvalue reference",
        "Deallocates the source object's memory",
        "Creates a deep heap copy of the operand"
      ],
      correctIndex: 1,
      explanation: "std::move does not move anything at runtime; it performs a static cast to an rvalue reference to enable move semantics."
    }
  ],

  sql: [
    {
      id: "sql_1",
      difficulty: 1,
      prompt: "Which SQL clause is used to filter records returned by a SELECT query?",
      options: ["ORDER BY", "WHERE", "GROUP BY", "LIMIT"],
      correctIndex: 1,
      explanation: "The WHERE clause filters individual rows before grouping or ordering operations occur."
    },
    {
      id: "sql_2",
      difficulty: 2,
      prompt: "What rows does an INNER JOIN query return?",
      options: [
        "All rows from both tables unconditionally",
        "Only rows that have matching keys in both joined tables",
        "All rows from the left table and matched rows from the right",
        "Only rows with NULL foreign keys"
      ],
      correctIndex: 1,
      explanation: "An INNER JOIN filters out rows that do not have matching relationship keys in both participating tables."
    },
    {
      id: "sql_3",
      difficulty: 3,
      prompt: "How does the HAVING clause differ from the WHERE clause in SQL?",
      options: [
        "HAVING filters individual rows before any grouping",
        "HAVING filters aggregated groups produced by a GROUP BY clause",
        "HAVING can only be used with primary keys",
        "WHERE can only be used with aggregate functions like COUNT()"
      ],
      correctIndex: 1,
      explanation: "WHERE filters rows before aggregation; HAVING filters aggregate groups (e.g. HAVING COUNT(*) > 5)."
    },
    {
      id: "sql_4",
      difficulty: 4,
      prompt: "Why can placing a function call on an indexed column (e.g. WHERE UPPER(name) = 'ALEX') degrade query performance?",
      options: [
        "It causes an immediate SQL syntax error",
        "It prevents the query planner from using the standard B-Tree index on that column",
        "It locks the database schema permanently",
        "It converts the table into a temporary view"
      ],
      correctIndex: 1,
      explanation: "Applying functions to column expressions prevents standard index seeks, forcing a full table or index scan unless a functional index exists."
    }
  ],

  mongodb: [
    {
      id: "mongodb_1",
      difficulty: 1,
      prompt: "What data format does MongoDB use to store documents internally?",
      options: ["XML", "BSON (Binary JSON)", "YAML", "Raw CSV"],
      correctIndex: 1,
      explanation: "MongoDB stores documents in BSON, a binary-encoded serialization of JSON-like documents with typed data."
    },
    {
      id: "mongodb_2",
      difficulty: 2,
      prompt: "Which default unique index is created automatically on every MongoDB collection?",
      options: ["_id", "created_at", "uuid", "doc_key"],
      correctIndex: 0,
      explanation: "Every MongoDB collection enforces a unique primary key index on the immutable _id field."
    },
    {
      id: "mongodb_3",
      difficulty: 3,
      prompt: "In MongoDB schema design, when is embedding child documents generally preferred over referencing?",
      options: [
        "When the child documents grow unboundedly past millions of rows",
        "When child data is small, frequently read together with the parent, and bounded",
        "When multiple applications require transactional two-phase commits",
        "Embedding is deprecated in MongoDB 5.0+"
      ],
      correctIndex: 1,
      explanation: "Embedding offers fast atomic single-document reads when related data is bounded and accessed together."
    },
    {
      id: "mongodb_4",
      difficulty: 4,
      prompt: "In a MongoDB aggregation pipeline, which operator performs a left outer join to an unsharded collection?",
      options: ["$match", "$lookup", "$project", "$unwind"],
      correctIndex: 1,
      explanation: "$lookup performs an equality join to another collection, returning matched documents as an array field."
    }
  ],

  git: [
    {
      id: "git_1",
      difficulty: 1,
      prompt: "Which command stages modified files to the Git staging index?",
      options: ["git push", "git add", "git commit", "git pull"],
      correctIndex: 1,
      explanation: "git add stages changes in the working directory preparing them for inclusion in the next commit."
    },
    {
      id: "git_2",
      difficulty: 2,
      prompt: "Which command creates a new branch named 'feature' and immediately switches to it?",
      options: ["git branch feature", "git checkout -b feature", "git merge feature", "git stash feature"],
      correctIndex: 1,
      explanation: "git checkout -b feature (or git switch -c feature) creates and switches to the specified branch."
    },
    {
      id: "git_3",
      difficulty: 3,
      prompt: "What is the primary architectural difference between git rebase and git merge?",
      options: [
        "git merge deletes commit history; git rebase duplicates branches",
        "git rebase reapplies commits on top of another base, creating a linear history; git merge creates a merge commit preserving parallel histories",
        "git rebase only works on remote repositories",
        "There is no difference in commit hash structure"
      ],
      correctIndex: 1,
      explanation: "Rebase rewrites project history by moving commits to a new base tip, maintaining a clean linear sequence."
    },
    {
      id: "git_4",
      difficulty: 4,
      prompt: "What does the command git cherry-pick <commit-hash> do?",
      options: [
        "Deletes the specified commit from history permanently",
        "Applies the changes introduced by an existing commit onto the current HEAD as a new commit",
        "Pushes only commit tags to the origin repository",
        "Resets the working tree to the repository root"
      ],
      correctIndex: 1,
      explanation: "Cherry-pick selects a specific commit from any branch and applies its patch onto the active branch."
    }
  ],

  react: [
    {
      id: "react_1",
      difficulty: 1,
      prompt: "What syntax extension is commonly used in React to write HTML-like markup in JavaScript?",
      options: ["JSON", "JSX", "SQL", "SASS"],
      correctIndex: 1,
      explanation: "JSX is a syntax extension for JavaScript that compiles to React.createElement() method calls."
    },
    {
      id: "react_2",
      difficulty: 2,
      prompt: "What happens when a React component's state or props change?",
      options: [
        "The browser performs a full HTTP page reload",
        "React re-renders the component and updates the DOM where differences exist",
        "All component variables are written to localStorage",
        "State changes only affect parent components"
      ],
      correctIndex: 1,
      explanation: "State/prop updates cause React to re-render the component and selectively reconcile changed DOM nodes."
    },
    {
      id: "react_3",
      difficulty: 3,
      prompt: "What does passing an empty dependency array [] to useEffect() signify?",
      options: [
        "The effect runs on every single render cycle",
        "The effect runs only once after the component mounts",
        "The effect is disabled and will never run",
        "The component is marked as pure and will never re-render"
      ],
      correctIndex: 1,
      explanation: "An empty dependency array tells React that the effect doesn't depend on any reactive values, running once on mount."
    },
    {
      id: "react_4",
      difficulty: 4,
      prompt: "Why must components in dynamic lists include a stable, unique 'key' prop in React?",
      options: [
        "To apply CSS styles to each list item",
        "To help React's reconciliation algorithm identify which items have changed, been added, or removed",
        "To ensure items are sorted in alphabetical order",
        "Keys are required by HTML5 specification"
      ],
      correctIndex: 1,
      explanation: "Unique keys allow React's diffing engine to match existing virtual DOM nodes across renders, avoiding redundant re-mounts."
    }
  ],

  nodejs: [
    {
      id: "nodejs_1",
      difficulty: 1,
      prompt: "Which Google Chrome JavaScript engine powers the Node.js runtime?",
      options: ["SpiderMonkey", "V8", "JavaScriptCore", "Chakra"],
      correctIndex: 1,
      explanation: "Node.js runs on Google's open-source high-performance V8 JavaScript engine written in C++."
    },
    {
      id: "nodejs_2",
      difficulty: 2,
      prompt: "Which file in a Node.js project records project metadata and declared dependencies?",
      options: ["config.xml", "package.json", "node.env", "manifest.yaml"],
      correctIndex: 1,
      explanation: "package.json defines project scripts, versions, author information, and npm dependency trees."
    },
    {
      id: "nodejs_3",
      difficulty: 3,
      prompt: "How does Node.js handle high-concurrency I/O operations despite having a single main execution thread?",
      options: [
        "By spawning a native operating system thread per incoming HTTP connection",
        "Using an event-driven, non-blocking I/O model backed by libuv thread pool for background tasks",
        "By converting JavaScript into multi-threaded assembly on the fly",
        "Node.js cannot handle concurrent connections"
      ],
      correctIndex: 1,
      explanation: "libuv provides the event loop and thread pool for asynchronous file/network I/O, freeing the JS main thread."
    },
    {
      id: "nodejs_4",
      difficulty: 4,
      prompt: "What is the difference between process.nextTick() and setImmediate() in the Node.js event loop?",
      options: [
        "process.nextTick() executes immediately after the current operation before the event loop continues; setImmediate() runs in the Check phase",
        "setImmediate() always executes before process.nextTick()",
        "process.nextTick() spawns a separate worker process",
        "They are exact aliases in all Node.js versions"
      ],
      correctIndex: 0,
      explanation: "process.nextTick() fires before the event loop continues to its next phase, whereas setImmediate() fires during the Check phase."
    }
  ],

  html_css: [
    {
      id: "html_css_1",
      difficulty: 1,
      prompt: "Which CSS property is used to change the text color of an element?",
      options: ["font-color", "color", "text-style", "foreground"],
      correctIndex: 1,
      explanation: "The 'color' property specifies the foreground color of text content in CSS."
    },
    {
      id: "html_css_2",
      difficulty: 2,
      prompt: "According to the CSS Box Model, what are the four layers from inside to outside?",
      options: [
        "Content, Padding, Border, Margin",
        "Content, Margin, Border, Padding",
        "Border, Content, Padding, Margin",
        "Margin, Padding, Content, Border"
      ],
      correctIndex: 0,
      explanation: "From inner to outer: Content box, followed by Padding, Border, and finally outer Margin."
    },
    {
      id: "html_css_3",
      difficulty: 3,
      prompt: "What is the CSS specificity priority order from highest to lowest?",
      options: [
        "Inline styles > ID selectors > Class/Attribute/Pseudo-class > Element selectors",
        "Element selectors > Class selectors > ID selectors > Inline styles",
        "ID selectors > Inline styles > Class selectors > Element selectors",
        "All CSS selectors have identical specificity weight"
      ],
      correctIndex: 0,
      explanation: "Inline styles (1000) outweigh IDs (100), which outweigh classes/attributes (10), which outweigh elements (1)."
    },
    {
      id: "html_css_4",
      difficulty: 4,
      prompt: "What layout behavior does 'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))' achieve?",
      options: [
        "Locks columns to exactly 250px without wrapping",
        "Creates a responsive grid where columns automatically wrap and expand to fill available container space without media queries",
        "Hides elements when viewport width drops below 250px",
        "Forces all grid rows to maintain 1:1 aspect ratio"
      ],
      correctIndex: 1,
      explanation: "auto-fit with minmax generates dynamic column counts that wrap gracefully across viewports without breakpoint media queries."
    }
  ],

  rest_apis: [
    {
      id: "rest_apis_1",
      difficulty: 1,
      prompt: "Which HTTP request method is conventionally used to retrieve data from a REST endpoint without modifying it?",
      options: ["POST", "DELETE", "GET", "PATCH"],
      correctIndex: 2,
      explanation: "HTTP GET is safe and idempotent, designated strictly for reading resources without side effects."
    },
    {
      id: "rest_apis_2",
      difficulty: 2,
      prompt: "Which HTTP response status code indicates that the requested resource could not be found?",
      options: ["200 OK", "401 Unauthorized", "404 Not Found", "500 Internal Server Error"],
      correctIndex: 2,
      explanation: "404 Not Found indicates the server cannot locate the requested URI resource."
    },
    {
      id: "rest_apis_3",
      difficulty: 3,
      prompt: "What is the primary difference between HTTP PUT and PATCH methods?",
      options: [
        "PUT is idempotent and replaces the entire resource; PATCH applies partial modifications",
        "PATCH cannot contain a request body",
        "PUT can only create new resources; PATCH can only delete them",
        "There is no functional distinction in REST"
      ],
      correctIndex: 0,
      explanation: "PUT replaces the resource representation in full; PATCH applies partial delta modifications to existing fields."
    },
    {
      id: "rest_apis_4",
      difficulty: 4,
      prompt: "What does the REST architectural constraint of 'Statelessness' mandate?",
      options: [
        "The server must store all client session history in local server memory",
        "Every request from client to server must contain all information necessary to understand and process the request",
        "Databases cannot maintain relational tables",
        "Clients are prohibited from caching responses"
      ],
      correctIndex: 1,
      explanation: "Statelessness requires each request to be self-contained; no client session state is retained on the server between requests."
    }
  ],

  system_design: [
    {
      id: "system_design_1",
      difficulty: 1,
      prompt: "What is the primary role of a Load Balancer in backend architecture?",
      options: [
        "Encrypting hard disk drives",
        "Distributing incoming client traffic across multiple backend servers to ensure availability",
        "Compiling frontend assets into WebAssembly",
        "Managing git branch merges"
      ],
      correctIndex: 1,
      explanation: "Load balancers distribute network traffic across server pools to avoid overwhelming any single instance."
    },
    {
      id: "system_design_2",
      difficulty: 2,
      prompt: "What is the fundamental difference between Horizontal and Vertical scaling?",
      options: [
        "Horizontal scaling adds more machines; Vertical scaling adds more CPU/RAM to an existing machine",
        "Horizontal scaling increases CPU clock speeds; Vertical scaling uses multiple data centers",
        "Vertical scaling requires NoSQL databases exclusively",
        "Horizontal scaling only applies to static CSS assets"
      ],
      correctIndex: 0,
      explanation: "Horizontal (scaling out) adds nodes; Vertical (scaling up) upgrades the hardware capacity of an existing machine."
    },
    {
      id: "system_design_3",
      difficulty: 3,
      prompt: "How does a Cache-Aside (Lazy Loading) caching pattern operate?",
      options: [
        "The cache writes all data directly to disk without memory usage",
        "The application checks the cache first; on a miss, it reads from the database and populates the cache for subsequent reads",
        "The database updates the cache synchronously before returning any query",
        "All reads bypass the cache completely"
      ],
      correctIndex: 1,
      explanation: "In Cache-Aside, the application queries cache; on a cache miss, data is fetched from the primary database and cached."
    },
    {
      id: "system_design_4",
      difficulty: 4,
      prompt: "According to Eric Brewer's CAP Theorem, what tradeoff must a distributed data store make in the presence of a Network Partition (P)?",
      options: [
        "It must sacrifice both Consistency and Availability",
        "It must choose between Consistency (all nodes see same data) and Availability (every request receives a non-error response)",
        "It can guarantee Consistency, Availability, and Partition Tolerance simultaneously",
        "It must immediately shut down all read replicas"
      ],
      correctIndex: 1,
      explanation: "When partitions occur, a distributed system must choose between returning consistent data or guaranteeing availability."
    }
  ],

  oop: [
    {
      id: "oop_1",
      difficulty: 1,
      prompt: "Which OOP pillar involves bundling data with methods that operate on that data and restricting direct access?",
      options: ["Inheritance", "Encapsulation", "Polymorphism", "Compilation"],
      correctIndex: 1,
      explanation: "Encapsulation hides internal object state behind public interfaces, preventing unauthorized modifications."
    },
    {
      id: "oop_2",
      difficulty: 2,
      prompt: "What does Polymorphism allow in object-oriented programming?",
      options: [
        "Objects of different classes can be treated as instances of a common superclass, responding to shared method calls in their own way",
        "Classes can have unlimited number of constructors",
        "Variables are converted into database tables automatically",
        "Methods must return void"
      ],
      correctIndex: 0,
      explanation: "Polymorphism enables uniform method invocations on distinct object implementations sharing an interface or base class."
    },
    {
      id: "oop_3",
      difficulty: 3,
      prompt: "Why does modern software engineering recommend 'Composition over Inheritance'?",
      options: [
        "Inheritance creates tight compile-time coupling and fragile base class hierarchies, whereas composition provides flexible runtime behavior",
        "Composition eliminates the need for unit testing",
        "Inheritance is completely unsupported in modern programming languages",
        "Composition requires zero memory allocation"
      ],
      correctIndex: 0,
      explanation: "Composition favors flexible 'has-a' relationships over rigid 'is-a' hierarchies, reducing coupling."
    },
    {
      id: "oop_4",
      difficulty: 4,
      prompt: "What does the Open/Closed Principle (the 'O' in SOLID) advocate?",
      options: [
        "Software entities should be open for modification and closed for extension",
        "Software entities should be open for extension, but closed for modification",
        "All classes should have public members only",
        "File handles must be closed immediately after opening"
      ],
      correctIndex: 1,
      explanation: "Open/Closed states that systems should allow new functionality to be added via extension without modifying existing tested code."
    }
  ],

  docker: [
    {
      id: "docker_1",
      difficulty: 1,
      prompt: "What is the difference between a Docker image and a Docker container?",
      options: [
        "An image is a running process; a container is the blueprint file",
        "An image is an immutable template; a container is a runnable isolated instance of an image",
        "Containers only run on Windows; images run on Linux",
        "There is no difference"
      ],
      correctIndex: 1,
      explanation: "A Docker image is a read-only package containing code and dependencies; a container is its running runtime instance."
    },
    {
      id: "docker_2",
      difficulty: 2,
      prompt: "What is the function of the EXPOSE instruction in a Dockerfile?",
      options: [
        "It automatically publishes the port to the host machine's public internet",
        "It functions as documentation indicating the network port on which the container listens",
        "It encrypts container network traffic",
        "It stops the container if the port is busy"
      ],
      correctIndex: 1,
      explanation: "EXPOSE documents intended listening ports but does not publish them unless -p / -P is passed at runtime."
    },
    {
      id: "docker_3",
      difficulty: 3,
      prompt: "Why are Docker volume mounts used instead of writing persistent data directly to container writable layers?",
      options: [
        "Container writable layers are ephemeral and deleted when the container is removed",
        "Docker volumes compress all files to zero bytes",
        "Writable layers cannot store database records",
        "Volume mounts bypass operating system kernel security"
      ],
      correctIndex: 0,
      explanation: "Container storage layers are destroyed with the container; volumes persist independently on the host storage system."
    },
    {
      id: "docker_4",
      difficulty: 4,
      prompt: "What is the primary benefit of multi-stage Docker builds?",
      options: [
        "Running multiple operating systems inside one container",
        "Separating the build environment from the lean runtime environment to drastically shrink final production image size",
        "Allowing multiple developers to edit a single container simultaneously",
        "Removing the need for Dockerfiles"
      ],
      correctIndex: 1,
      explanation: "Multi-stage builds leave heavy build compilers and SDKs in intermediate stages, copying only lean binaries into the final image."
    }
  ],

  kubernetes: [
    {
      id: "kubernetes_1",
      difficulty: 1,
      prompt: "What is the smallest deployable computing unit in Kubernetes?",
      options: ["Cluster", "Node", "Pod", "Service"],
      correctIndex: 2,
      explanation: "A Pod represents a single instance of a running process in a cluster, encapsulating one or more co-located containers."
    },
    {
      id: "kubernetes_2",
      difficulty: 2,
      prompt: "What is the role of a Kubernetes Deployment object?",
      options: [
        "Manages declarative updates, scaling, and rolling rollouts for ReplicaSets of Pods",
        "Provides physical bare-metal hardware to the data center",
        "Serves as the DNS registry for external domains",
        "Compiles source code into container images"
      ],
      correctIndex: 0,
      explanation: "Deployments declaratively manage Pod lifecycle, self-healing, rolling updates, and replica counts."
    },
    {
      id: "kubernetes_3",
      difficulty: 3,
      prompt: "Why is a Kubernetes 'Service' necessary to communicate with Pods?",
      options: [
        "Pods have dynamic, ephemeral IP addresses that change whenever they are restarted or rescheduled",
        "Pods cannot bind to TCP ports",
        "Services are required to execute bash scripts inside pods",
        "Containers within the same pod cannot communicate without a Service"
      ],
      correctIndex: 0,
      explanation: "Pods are mortal with transient IPs; a Service provides a stable virtual IP and DNS name with integrated load balancing."
    },
    {
      id: "kubernetes_4",
      difficulty: 4,
      prompt: "What is the difference between a Kubernetes LivenessProbe and a ReadinessProbe?",
      options: [
        "Liveness determines if the pod should be restarted; Readiness determines if the pod should receive service network traffic",
        "Readiness restarts the container; Liveness never affects container lifecycle",
        "Liveness probes only test CPU temperatures",
        "They are redundant checks executed simultaneously by kubelet"
      ],
      correctIndex: 0,
      explanation: "Failing a liveness probe triggers a pod container restart; failing a readiness probe temporarily isolates it from traffic."
    }
  ],

  aws_cloud: [
    {
      id: "aws_cloud_1",
      difficulty: 1,
      prompt: "Which AWS service provides scalable object storage accessible via web protocols?",
      options: ["Amazon EC2", "Amazon S3", "Amazon RDS", "Amazon EBS"],
      correctIndex: 1,
      explanation: "Amazon Simple Storage Service (S3) stores unstructured objects (files, images, backups) redundantly in buckets."
    },
    {
      id: "aws_cloud_2",
      difficulty: 2,
      prompt: "What is Amazon EC2 primarily used for?",
      options: [
        "Hosting serverless relational databases",
        "Provisioning resizable virtual machine compute instances in the cloud",
        "Managing DNS domain registrations",
        "Sending marketing emails"
      ],
      correctIndex: 1,
      explanation: "Amazon Elastic Compute Cloud (EC2) provides on-demand virtual compute servers with configurable CPU, RAM, and OS."
    },
    {
      id: "aws_cloud_3",
      difficulty: 3,
      prompt: "What security role does AWS Identity and Access Management (IAM) perform?",
      options: [
        "Scanning source code for syntax warnings",
        "Controlling authentication and fine-grained authorization policies for AWS users, services, and API requests",
        "Encrypting physical ethernet cables in data centers",
        "Managing external credit card transactions"
      ],
      correctIndex: 1,
      explanation: "AWS IAM manages identities, role assumptions, and permission policies determining access to cloud resources."
    },
    {
      id: "aws_cloud_4",
      difficulty: 4,
      prompt: "What is the operational model of AWS Lambda?",
      options: [
        "Requires manual provisioning and patching of virtual server operating systems",
        "Serverless event-driven compute that runs code in response to events and automatically manages scaling and billing per millisecond",
        "A dedicated bare-metal mainframe running continuous background loops",
        "A database indexing engine for DynamoDB"
      ],
      correctIndex: 1,
      explanation: "Lambda is serverless: code executes strictly when triggered by events, automatically scaling with zero server maintenance."
    }
  ],

  linux_shell: [
    {
      id: "linux_shell_1",
      difficulty: 1,
      prompt: "Which Linux command displays the current working directory path in the terminal?",
      options: ["ls", "pwd", "cd", "whoami"],
      correctIndex: 1,
      explanation: "pwd (print working directory) outputs the absolute path of the directory you are currently in."
    },
    {
      id: "linux_shell_2",
      difficulty: 2,
      prompt: "What does the command chmod +x script.sh do in Linux?",
      options: [
        "Deletes script.sh",
        "Adds executable permissions to script.sh",
        "Changes ownership of script.sh to root",
        "Encrypts script.sh with an SSH key"
      ],
      correctIndex: 1,
      explanation: "chmod +x grants execute permissions on the file for the user, group, and others."
    },
    {
      id: "linux_shell_3",
      difficulty: 3,
      prompt: "What is the purpose of the pipe operator (|) in bash?",
      options: [
        "Redirects the standard output of the left command into the standard input of the right command",
        "Terminates the shell session immediately",
        "Executes two commands in reverse alphabetical order",
        "Redirects output to a file and overwrites it"
      ],
      correctIndex: 0,
      explanation: "The pipe (|) streams stdout from one process directly into stdin of the next process (e.g. ps aux | grep node)."
    },
    {
      id: "linux_shell_4",
      difficulty: 4,
      prompt: "In Linux system administration, what is the role of the systemd init system?",
      options: [
        "Formatting USB flash drives",
        "Bootstrapping user space, managing system services, daemons, and tracking dependencies via unit files",
        "Rendering GUI window borders in X11",
        "Generating SSL certificates for web servers"
      ],
      correctIndex: 1,
      explanation: "systemd is PID 1, responsible for initializing the OS, managing system services, logs (journald), and background daemons."
    }
  ],

  cicd: [
    {
      id: "cicd_1",
      difficulty: 1,
      prompt: "What is the primary goal of Continuous Integration (CI)?",
      options: [
        "Eliminating the need to write unit tests",
        "Automating the building and testing of code changes frequently into a shared repository to catch defects early",
        "Rewriting backend databases every week",
        "Manual approval of every single line of code by managers"
      ],
      correctIndex: 1,
      explanation: "CI automates build verification and automated testing upon code push, detecting integration regressions immediately."
    },
    {
      id: "cicd_2",
      difficulty: 2,
      prompt: "What are build artifacts in a CI/CD pipeline?",
      options: [
        "Files containing syntax error logs",
        "Compiled binaries, packages, or container images produced during the pipeline for testing and deployment",
        "Physical hard drives kept in cold storage",
        "Deprecated source code files"
      ],
      correctIndex: 1,
      explanation: "Artifacts are deployable outputs (e.g. jar files, tarballs, docker images) generated by the build stage."
    },
    {
      id: "cicd_3",
      difficulty: 3,
      prompt: "What is the primary benefit of running automated pull request (PR) checks?",
      options: [
        "Blocking regressions and failing builds from merging into production or mainline branches",
        "Speeding up internet connection speeds for the author",
        "Preventing developers from using Git branches",
        "Replacing the need for code review"
      ],
      correctIndex: 0,
      explanation: "PR checks ensure all tests, linters, and security checks pass before branch protection rules allow merging."
    },
    {
      id: "cicd_4",
      difficulty: 4,
      prompt: "What distinguishes a 'Blue-Green Deployment' strategy?",
      options: [
        "Deploying half the code in Python and half in Java",
        "Maintaining two identical production environments (Blue and Green), routing traffic to the updated environment for instant switchover with zero downtime",
        "Deploying changes directly to production on Friday evenings without testing",
        "Rebuilding servers from scratch during user request handling"
      ],
      correctIndex: 1,
      explanation: "Blue-Green deployment runs two identical environments; router switchover provides instant deployment and painless rollback."
    }
  ],

  machine_learning: [
    {
      id: "machine_learning_1",
      difficulty: 1,
      prompt: "Which type of machine learning involves training an algorithm on input data paired with known target labels?",
      options: ["Unsupervised Learning", "Supervised Learning", "Reinforcement Learning", "Heuristic Search"],
      correctIndex: 1,
      explanation: "Supervised learning maps inputs to target outputs using labeled historical training examples."
    },
    {
      id: "machine_learning_2",
      difficulty: 2,
      prompt: "What is 'overfitting' in machine learning models?",
      options: [
        "When a model performs perfectly on new unseen test data but fails on training data",
        "When a model memorizes training noise and specifics, resulting in poor generalization to new data",
        "When dataset features exceed 100 columns",
        "When learning rate is set too low"
      ],
      correctIndex: 1,
      explanation: "Overfitting occurs when high model complexity fits training noise, eroding performance on unseen validation/test sets."
    },
    {
      id: "machine_learning_3",
      difficulty: 3,
      prompt: "What is the primary purpose of K-Fold Cross-Validation?",
      options: [
        "Increasing the total volume of raw data",
        "Evaluating model generalization performance reliably by training and validating across K distinct partition folds",
        "Converting categorical strings into continuous numbers",
        "Accelerating GPU floating-point operations"
      ],
      correctIndex: 1,
      explanation: "K-fold cross-validation averages validation scores across K rotating subsets, mitigating train/test split bias."
    },
    {
      id: "machine_learning_4",
      difficulty: 4,
      prompt: "In the Bias-Variance tradeoff, what symptom characterizes a model with High Bias?",
      options: [
        "Severe overfitting and excessive sensitivity to small fluctuations in training data",
        "Underfitting, caused by overly simplistic assumptions that miss underlying data patterns",
        "Near-zero training error with high test error",
        "Infinite gradient descent divergence"
      ],
      correctIndex: 1,
      explanation: "High bias represents underfitting: the model fails to capture true complexity, resulting in high error on both train and test."
    }
  ],

  deep_learning: [
    {
      id: "deep_learning_1",
      difficulty: 1,
      prompt: "What mathematical operation do individual neurons perform on input vectors and weights before the activation function?",
      options: ["Vector cross product", "Weighted sum (dot product) plus bias", "Matrix inversion", "Fourier transform"],
      correctIndex: 1,
      explanation: "Each neuron computes the linear combination z = w · x + b before passing it through an activation function."
    },
    {
      id: "deep_learning_2",
      difficulty: 2,
      prompt: "Why are non-linear activation functions (like ReLU or Sigmoid) crucial in deep neural networks?",
      options: [
        "Without non-linearities, stacking multiple layers collapses mathematically into a single linear transformation",
        "They prevent integer overflow errors in Python",
        "They force all weights to remain positive numbers",
        "They decrease the amount of training data needed by half"
      ],
      correctIndex: 0,
      explanation: "Without non-linear activation functions, deep networks cannot learn non-linear decision boundaries or universal approximations."
    },
    {
      id: "deep_learning_3",
      difficulty: 3,
      prompt: "How does the Backpropagation algorithm update neural network weights?",
      options: [
        "Randomly guessing weight increments until error decreases",
        "Applying the chain rule of calculus to compute loss gradients with respect to each weight from output back to input",
        "Inverting the dataset covariance matrix",
        "Using genetic mutations on layer activations"
      ],
      correctIndex: 1,
      explanation: "Backpropagation propagates errors backwards through network layers via the chain rule to calculate weight gradients for optimization."
    },
    {
      id: "deep_learning_4",
      difficulty: 4,
      prompt: "What is the regularizing effect of Dropout during neural network training?",
      options: [
        "Permanently deletes half of the network's parameters from disk",
        "Randomly sets a fraction of neuron outputs to zero on each forward pass, preventing complex co-adaptations between features",
        "Converts 32-bit floating point numbers to 8-bit integers",
        "Multiplies learning rate by zero during backpropagation"
      ],
      correctIndex: 1,
      explanation: "Dropout deactivates random neurons during training steps, forcing remaining neurons to learn robust, generalized representations."
    }
  ],

  data_viz: [
    {
      id: "data_viz_1",
      difficulty: 1,
      prompt: "Which visualization type is most effective for showing proportions of a whole that sum to 100%?",
      options: ["Scatter plot", "Pie chart or stacked bar chart", "Line plot", "Box and whisker plot"],
      correctIndex: 1,
      explanation: "Pie charts and stacked bar charts visually emphasize part-to-whole proportional relationships."
    },
    {
      id: "data_viz_2",
      difficulty: 2,
      prompt: "What relationship does a Scatter Plot primarily illustrate between two continuous variables?",
      options: [
        "Temporal sequence only",
        "Correlation, clustering, and distribution patterns between the two dimensions",
        "Hierarchical folder nesting",
        "Frequency count of categorical text labels"
      ],
      correctIndex: 1,
      explanation: "Scatter plots map bivariate numerical pairs to Cartesian coordinates to expose linear or non-linear correlations."
    },
    {
      id: "data_viz_3",
      difficulty: 3,
      prompt: "What information does a Box Plot (Box-and-Whisker) communicate about a distribution?",
      options: [
        "Only the arithmetic mean and sample size",
        "Median, quartiles (IQR: 25th to 75th percentiles), and potential statistical outliers",
        "The complete raw dataset as individual unbinned points",
        "Frequency of words in natural text"
      ],
      correctIndex: 1,
      explanation: "Box plots summarize non-parametric five-number summaries: minimum, Q1, median, Q3, maximum, and identified outliers."
    },
    {
      id: "data_viz_4",
      difficulty: 4,
      prompt: "Why is truncating the Y-axis of a bar chart (not starting at zero) generally considered deceptive?",
      options: [
        "It causes browser rendering bugs in Chart.js",
        "It visually exaggerates minimal numerical differences, distorting the proportional area encoding",
        "Bar charts cannot display numbers greater than 100",
        "It forces bars to render horizontally"
      ],
      correctIndex: 1,
      explanation: "Bar chart heights encode magnitude proportionally; truncating the baseline exaggerates minor percentage differences deceptively."
    }
  ],

  data_analysis: [
    {
      id: "data_analysis_1",
      difficulty: 1,
      prompt: "In descriptive statistics, why is the Median often preferred over the Mean for skewed distributions?",
      options: [
        "The median is simpler to compute manually",
        "The median is robust against extreme outliers and skewed tails",
        "The median always equals the standard deviation",
        "The mean cannot be calculated on positive numbers"
      ],
      correctIndex: 1,
      explanation: "Extreme outliers heavily distort the arithmetic mean, while the positional median remains stable."
    },
    {
      id: "data_analysis_2",
      difficulty: 2,
      prompt: "In Python's Pandas library, which method removes rows containing missing (NaN) values?",
      options: ["df.fillna()", "df.dropna()", "df.drop_duplicates()", "df.isnull()"],
      correctIndex: 1,
      explanation: "df.dropna() removes rows or columns containing null values based on the axis and threshold parameters."
    },
    {
      id: "data_analysis_3",
      difficulty: 3,
      prompt: "What does a Pearson correlation coefficient (r) of -0.85 indicate?",
      options: [
        "A weak random relationship",
        "A strong negative linear relationship where one variable tends to decrease as the other increases",
        "No correlation between the variables",
        "A calculation error since r cannot be negative"
      ],
      correctIndex: 1,
      explanation: "Pearson r ranges from -1 to +1; -0.85 denotes a strong inverse linear association between the two features."
    },
    {
      id: "data_analysis_4",
      difficulty: 4,
      prompt: "In statistical hypothesis testing, what constitutes a Type I Error (False Positive)?",
      options: [
        "Rejecting the null hypothesis when it is actually true",
        "Failing to reject the null hypothesis when it is actually false",
        "Collecting insufficient sample observations",
        "Dividing by zero in the t-test equation"
      ],
      correctIndex: 0,
      explanation: "A Type I error occurs when researchers reject a true null hypothesis, concluding an effect exists when it does not."
    }
  ],

  testing: [
    {
      id: "testing_1",
      difficulty: 1,
      prompt: "What is the primary focus of Unit Testing?",
      options: [
        "Verifying overall system performance under 100,000 concurrent users",
        "Testing individual isolated functions or modules in isolation for correct behavior",
        "Evaluating graphic design and font choices",
        "Testing physical server power supplies"
      ],
      correctIndex: 1,
      explanation: "Unit tests focus on the smallest testable parts of an application (functions, methods) in total isolation."
    },
    {
      id: "testing_2",
      difficulty: 2,
      prompt: "What is the core cadence of the Test-Driven Development (TDD) cycle?",
      options: [
        "Write Code -> Deploy -> Test in Production",
        "Red (Write failing test) -> Green (Write minimal code to pass) -> Refactor (Clean up)",
        "Plan -> Document -> Delete",
        "Benchmark -> Compress -> Ship"
      ],
      correctIndex: 1,
      explanation: "TDD follows Red-Green-Refactor: create a failing test first, implement code to pass it, then improve code quality."
    },
    {
      id: "testing_3",
      difficulty: 3,
      prompt: "What is the purpose of 'mocking' external dependencies in automated test suites?",
      options: [
        "Mocking replaces real databases or network calls with controllable stand-ins to ensure tests are fast, deterministic, and isolated",
        "Mocking converts JavaScript code into Python tests",
        "Mocking hides test failure alerts from continuous integration",
        "Mocking generates random production bug reports"
      ],
      correctIndex: 0,
      explanation: "Mocks simulate external subsystems (HTTP, databases), keeping unit tests fast, repeatable, and independent of environment outages."
    },
    {
      id: "testing_4",
      difficulty: 4,
      prompt: "Why does achieving 100% line code coverage not guarantee the absence of software bugs?",
      options: [
        "Code coverage only works for compiled languages",
        "Line coverage verifies lines executed, not whether edge-case logic, boundary states, or unexpected user inputs are correctly handled",
        "Coverage tools ignore conditional statements",
        "100% coverage causes memory overflow"
      ],
      correctIndex: 1,
      explanation: "Executing a line of code does not verify correct behavior across all edge cases, null states, or business logic conditions."
    }
  ],

  networking_os: [
    {
      id: "networking_os_1",
      difficulty: 1,
      prompt: "What is the primary role of the Domain Name System (DNS)?",
      options: [
        "Encrypting email communications",
        "Translating human-readable domain names (e.g. google.com) into numerical IP addresses",
        "Allocating memory addresses to CPU registers",
        "Managing database table primary keys"
      ],
      correctIndex: 1,
      explanation: "DNS acts as the internet's phonebook, mapping domain hostnames to IP addresses."
    },
    {
      id: "networking_os_2",
      difficulty: 2,
      prompt: "What is the key transport-layer difference between TCP and UDP?",
      options: [
        "TCP is connection-oriented, reliable, and ordered; UDP is connectionless, lightweight, and unordered",
        "UDP guarantees zero packet loss; TCP does not",
        "TCP can only transmit plaintext files; UDP transmits binary files",
        "UDP operates exclusively on the hardware physical layer"
      ],
      correctIndex: 0,
      explanation: "TCP uses three-way handshakes and retransmissions for reliability; UDP prioritizes speed with minimal overhead."
    },
    {
      id: "networking_os_3",
      difficulty: 3,
      prompt: "What is Virtual Memory in modern operating systems?",
      options: [
        "Memory allocated exclusively to VR headsets",
        "A memory management technique providing each process with an isolated contiguous address space, mapped via page tables to physical RAM and swap",
        "A secondary backup copy of the BIOS chip",
        "Unallocated space in the processor L1 cache"
      ],
      correctIndex: 1,
      explanation: "Virtual memory decouples process addresses from physical RAM, providing protection, isolation, and paging."
    },
    {
      id: "networking_os_4",
      difficulty: 4,
      prompt: "Which four conditions are simultaneously necessary for an OS Deadlock to occur (Coffman Conditions)?",
      options: [
        "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait",
        "Paging, Segmentation, Swapping, Thrashing",
        "Read, Write, Execute, Delete",
        "Fork, Exec, Wait, Exit"
      ],
      correctIndex: 0,
      explanation: "Deadlock occurs only if all 4 Coffman conditions hold: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait."
    }
  ]
};
