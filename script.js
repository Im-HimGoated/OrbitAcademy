const pathData = {
  build: {
    title: "Aerospace Engineer",
    copy: "Design rockets, test parts, and improve vehicles until they are ready for launch.",
    skill: "Measure, sketch, and improve a prototype",
    mission: "Build a paper rocket, change one fin, and compare flights",
    prepTitle: "Aerospace Engineer Prep",
  },
  code: {
    title: "Flight Software Developer",
    copy: "Write instructions that help spacecraft steer, collect data, and stay safe.",
    skill: "Break a problem into clear step-by-step commands",
    mission: "Create a grid map and write commands to guide a satellite home",
    prepTitle: "Flight Software Prep",
  },
  explore: {
    title: "Planetary Scientist",
    copy: "Study planets, moons, rocks, and signals to learn what space is made of.",
    skill: "Observe carefully and explain evidence",
    mission: "Compare three mystery rocks and choose which one a rover should sample",
    prepTitle: "Planetary Scientist Prep",
  },
  lead: {
    title: "Mission Director",
    copy: "Help a team make choices, solve problems, and keep a mission moving.",
    skill: "Listen, organize tasks, and make a plan",
    mission: "Run a five-minute mission meeting and assign launch roles",
    prepTitle: "Mission Director Prep",
  },
};

const taskDecks = {
  build: [
    {
      type: "Prototype drill",
      title: "Improve a rocket fin",
      copy: "Choose one change to help a paper rocket fly straighter.",
      steps: ["Pick the part to change", "Predict what the change will do", "Name one way to test it"],
      note: "Write your design change and why it might help.",
    },
    {
      type: "Engineering check",
      title: "Choose the strongest material",
      copy: "A rover arm needs to hold a small sample. Compare two household materials and choose one.",
      steps: ["Name two possible materials", "Choose the stronger option", "Explain the tradeoff"],
      note: "Write which material wins and what weakness it might still have.",
    },
    {
      type: "Redesign sprint",
      title: "Fix a wobbly lander",
      copy: "A model lander tips over after touchdown. Decide how to make it more stable.",
      steps: ["Identify why it tips", "Add one stability feature", "Decide how to measure success"],
      note: "Write your lander fix in one or two sentences.",
    },
  ],
  code: [
    {
      type: "Command sequence",
      title: "Guide a satellite",
      copy: "Create a short command list that moves a satellite around one obstacle and back into signal range.",
      steps: ["Choose a start and finish", "Add one obstacle", "Write at least four commands"],
      note: "Write your commands using words like forward, turn, scan, or transmit.",
    },
    {
      type: "Debug drill",
      title: "Find the bad instruction",
      copy: "A rover keeps turning before it scans. Decide which command should move earlier or later.",
      steps: ["Spot the command order problem", "Move one command", "Explain why the new order works"],
      note: "Write the old problem and your corrected order.",
    },
    {
      type: "Sensor logic",
      title: "Make a safety rule",
      copy: "Write a simple if-then rule that tells a rover what to do when it sees a cliff.",
      steps: ["Name the sensor signal", "Choose the safe action", "Add a backup action"],
      note: "Write your if-then safety rule.",
    },
  ],
  explore: [
    {
      type: "Evidence log",
      title: "Pick a rover sample",
      copy: "A rover can collect only one rock. Choose the sample that gives the best science clue.",
      steps: ["Choose a science question", "Pick a sample type", "Explain what it could reveal"],
      note: "Write the sample you would collect and the clue you hope to find.",
    },
    {
      type: "Observation drill",
      title: "Compare two planets",
      copy: "Choose two planet features to compare, such as atmosphere, temperature, gravity, or moons.",
      steps: ["Pick two features", "Make one comparison", "Ask one follow-up question"],
      note: "Write the comparison and your follow-up question.",
    },
    {
      type: "Mission question",
      title: "Ask a testable question",
      copy: "Turn a big space question into something a robot, telescope, or astronaut could actually measure.",
      steps: ["Write the big question", "Choose what to measure", "Name the tool that could measure it"],
      note: "Write the testable version of your question.",
    },
  ],
  lead: [
    {
      type: "Team planning",
      title: "Assign launch roles",
      copy: "A mission team needs clear jobs before launch. Decide who handles design, testing, timing, and notes.",
      steps: ["List three mission jobs", "Choose the first job to start", "Write one check-in question"],
      note: "Write your role plan for the team.",
    },
    {
      type: "Decision drill",
      title: "Choose under pressure",
      copy: "Your team has ten minutes left and two fixes to try. Pick one and explain how you decide.",
      steps: ["Name both options", "Pick the safer next move", "Explain the reason"],
      note: "Write the decision and what evidence helped you choose.",
    },
    {
      type: "Communication check",
      title: "Send a mission update",
      copy: "Write a short update that tells the team what happened, what changed, and what happens next.",
      steps: ["State the current status", "Name one problem or success", "Give the next action"],
      note: "Write the mission update in two clear sentences.",
    },
  ],
};

const buttons = document.querySelectorAll(".interest-button");
const roleTitle = document.querySelector("#role-title");
const roleCopy = document.querySelector("#role-copy");
const skillOutput = document.querySelector("#skill-output");
const missionOutput = document.querySelector("#mission-output");
const trainingPathTitle = document.querySelector("#training-path-title");
const taskType = document.querySelector("#task-type");
const taskTitle = document.querySelector("#task-title");
const taskCopy = document.querySelector("#task-copy");
const taskChecklist = document.querySelector("#task-checklist");
const taskNote = document.querySelector("#task-note");
const noteLabel = document.querySelector("#note-label");
const completeTaskButton = document.querySelector("#complete-task");
const skipTaskButton = document.querySelector("#skip-task");
const taskCount = document.querySelector("#task-count");
const trainingLogList = document.querySelector("#training-log-list");
let activePath = "build";
let activeTaskIndex = 0;
let finishedTasks = 0;
const pathProgress = {
  build: [],
  code: [],
  explore: [],
  lead: [],
};

function renderTask() {
  const selected = pathData[activePath];
  const task = taskDecks[activePath][activeTaskIndex];

  trainingPathTitle.textContent = selected.prepTitle;
  taskType.textContent = task.type;
  taskTitle.textContent = task.title;
  taskCopy.textContent = task.copy;
  noteLabel.textContent = task.note;
  taskNote.value = "";
  completeTaskButton.disabled = true;
  completeTaskButton.textContent = "Finish task";
  taskChecklist.innerHTML = "<legend>Do the prep</legend>";

  task.steps.forEach((step) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.addEventListener("change", updateTaskReadyState);
    label.append(input, step);
    taskChecklist.append(label);
  });
}

function renderTrainingLog() {
  const completed = pathProgress[activePath];
  taskCount.textContent = completed.length;
  trainingLogList.innerHTML = "";

  if (completed.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "Finish a prep task to begin this path record.";
    trainingLogList.append(emptyItem);
    return;
  }

  completed.slice(-4).forEach((task) => {
    const item = document.createElement("li");
    item.textContent = task;
    trainingLogList.append(item);
  });
}

function updateTaskReadyState() {
  const checks = Array.from(taskChecklist.querySelectorAll("input"));
  const allChecked = checks.every((check) => check.checked);
  const hasNote = taskNote.value.trim().length >= 12;

  completeTaskButton.disabled = !(allChecked && hasNote);
}

function moveToNextTask() {
  activeTaskIndex = (activeTaskIndex + 1) % taskDecks[activePath].length;
  renderTask();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    activePath = button.dataset.path;
    activeTaskIndex = 0;
    const selected = pathData[button.dataset.path];

    buttons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    roleTitle.textContent = selected.title;
    roleCopy.textContent = selected.copy;
    skillOutput.textContent = selected.skill;
    missionOutput.textContent = selected.mission;
    renderTask();
    renderTrainingLog();
  });
});

taskNote.addEventListener("input", updateTaskReadyState);

completeTaskButton.addEventListener("click", () => {
  if (completeTaskButton.disabled) return;

  const finishedTitle = taskDecks[activePath][activeTaskIndex].title;
  pathProgress[activePath].push(finishedTitle);
  finishedTasks += 1;
  taskCount.textContent = pathProgress[activePath].length;
  renderTrainingLog();
  moveToNextTask();
});

skipTaskButton.addEventListener("click", moveToNextTask);

const earnedBadges = new Set();
const badgeCount = document.querySelector("#badge-count");
const badgeMessage = document.querySelector("#badge-message");
const buildPad = document.querySelector("#build-pad");
const buildEmpty = document.querySelector("#build-empty");
const flightScore = document.querySelector("#flight-score");
const scoreStatus = document.querySelector("#score-status");
const testFeedback = document.querySelector("#test-feedback");
let selectedPart = null;
let dragState = null;
let partNumber = 0;
let buildNeedsRetest = false;

const partDefaults = {
  nose: { className: "part-nose", label: "Nose cone", x: 245, y: 76 },
  body: { className: "part-body", label: "Rocket body", x: 238, y: 174 },
  fin: { className: "part-fin", label: "Stability fin", x: 210, y: 332 },
  engine: { className: "part-engine", label: "Engine", x: 245, y: 346 },
};

function updateBuildEmptyState() {
  buildEmpty.hidden = buildPad.querySelectorAll(".rocket-part").length > 0;
}

function markBuildNeedsRetest() {
  if (!buildPad.querySelector(".rocket-part")) {
    buildNeedsRetest = false;
    scoreStatus.textContent = "Not tested";
    return;
  }

  buildNeedsRetest = true;
  scoreStatus.textContent = "Needs retest";
  testFeedback.textContent = "Design changed. Run a test for the current flight score.";
}

function selectPart(part) {
  if (selectedPart) selectedPart.classList.remove("is-selected");
  selectedPart = part;
  if (selectedPart) selectedPart.classList.add("is-selected");
}

function clampPart(part, x, y) {
  const padRect = buildPad.getBoundingClientRect();
  const width = part.offsetWidth;
  const height = part.offsetHeight;
  const nextX = Math.max(8, Math.min(x, padRect.width - width - 8));
  const nextY = Math.max(8, Math.min(y, padRect.height - height - 8));

  part.style.left = `${nextX}px`;
  part.style.top = `${nextY}px`;
}

function addPart(type) {
  const defaults = partDefaults[type];
  const part = document.createElement("button");
  const offset = (partNumber % 5) * 16;
  partNumber += 1;

  part.type = "button";
  part.className = `rocket-part ${defaults.className}`;
  part.dataset.part = type;
  part.dataset.rotation = "0";
  part.setAttribute("aria-label", defaults.label);
  part.style.left = `${defaults.x + offset}px`;
  part.style.top = `${defaults.y + offset}px`;
  part.style.transform = "rotate(0deg)";

  part.addEventListener("pointerdown", (event) => {
    const rect = part.getBoundingClientRect();
    selectPart(part);
    dragState = {
      part,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };
    part.setPointerCapture(event.pointerId);
  });

  part.addEventListener("click", () => selectPart(part));
  buildPad.append(part);
  selectPart(part);
  updateBuildEmptyState();
  markBuildNeedsRetest();
}

function rotateSelectedPart() {
  if (!selectedPart) return;

  const nextRotation = (Number(selectedPart.dataset.rotation) + 45) % 360;
  selectedPart.dataset.rotation = String(nextRotation);
  selectedPart.style.transform = `rotate(${nextRotation}deg)`;
  markBuildNeedsRetest();
}

function removeSelectedPart() {
  if (!selectedPart) return;

  selectedPart.remove();
  selectedPart = null;
  updateBuildEmptyState();
  markBuildNeedsRetest();
}

function getPartCenter(part) {
  return {
    x: part.offsetLeft + part.offsetWidth / 2,
    y: part.offsetTop + part.offsetHeight / 2,
  };
}

function distanceBetween(partA, partB) {
  const a = getPartCenter(partA);
  const b = getPartCenter(partB);
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function isStraight(part) {
  return Number(part.dataset.rotation) % 90 === 0;
}

function calculateFlightTest() {
  const parts = Array.from(buildPad.querySelectorAll(".rocket-part"));
  const counts = parts.reduce(
    (current, part) => {
      current[part.dataset.part] += 1;
      return current;
    },
    { nose: 0, body: 0, fin: 0, engine: 0 }
  );
  const body = parts.find((part) => part.dataset.part === "body");
  const nose = parts.find((part) => part.dataset.part === "nose");
  const engine = parts.find((part) => part.dataset.part === "engine");
  const fins = parts.filter((part) => part.dataset.part === "fin");
  const bodyCenter = body ? getPartCenter(body) : null;
  const noseCenter = nose ? getPartCenter(nose) : null;
  const engineCenter = engine ? getPartCenter(engine) : null;
  const straightParts = parts.filter(isStraight).length;
  const crookedParts = parts.length - straightParts;
  const centeredBody = bodyCenter && Math.abs(bodyCenter.x - buildPad.clientWidth / 2) < 70;
  const noseAligned =
    bodyCenter &&
    noseCenter &&
    noseCenter.y < bodyCenter.y &&
    Math.abs(noseCenter.x - bodyCenter.x) < 70 &&
    distanceBetween(nose, body) < 150;
  const engineAligned =
    bodyCenter &&
    engineCenter &&
    engineCenter.y > bodyCenter.y &&
    Math.abs(engineCenter.x - bodyCenter.x) < 70 &&
    distanceBetween(engine, body) < 150;
  const lowerFins = fins.filter((fin) => {
    const center = getPartCenter(fin);
    return bodyCenter && center.y > bodyCenter.y && Math.abs(center.x - bodyCenter.x) < 150;
  });
  const hasBalancedFins =
    lowerFins.some((fin) => getPartCenter(fin).x < bodyCenter.x) &&
    lowerFins.some((fin) => getPartCenter(fin).x > bodyCenter.x);

  let score = 0;
  if (counts.body > 0) score += 20;
  if (counts.engine > 0) score += 15;
  if (counts.nose > 0) score += 15;
  if (counts.fin >= 2) score += 15;
  else if (counts.fin === 1) score += 7;
  if (centeredBody) score += 10;
  if (noseAligned) score += 10;
  if (engineAligned) score += 10;
  if (hasBalancedFins) score += 10;
  if (parts.length > 0 && crookedParts === 0) score += 5;
  score -= crookedParts * 8;
  if (!counts.body || !counts.engine || !counts.nose) score = Math.min(score, 70);
  if (counts.fin < 2) score = Math.min(score, 82);
  score = Math.max(0, Math.min(100, score));

  const missing = [];
  if (!counts.body) missing.push("body");
  if (!counts.engine) missing.push("engine");
  if (!counts.nose) missing.push("nose cone");
  if (counts.fin < 2) missing.push("two fins");

  return {
    score,
    missing,
    aligned: { nose: noseAligned, engine: engineAligned, fins: hasBalancedFins, body: centeredBody },
  };
}

function testBuild() {
  const result = calculateFlightTest();

  buildNeedsRetest = false;
  scoreStatus.textContent = "Current";
  flightScore.textContent = result.score;

  if (result.missing.length > 0) {
    testFeedback.textContent = `Missing: ${result.missing.join(", ")}. Add the core parts before launch.`;
  } else if (result.score >= 90) {
    testFeedback.textContent = "Excellent test. Your rocket has the key systems and strong stability.";
  } else if (result.score >= 65) {
    testFeedback.textContent = "Good start. Align the nose, engine, and fins more closely for a stronger flight.";
  } else if (result.score >= 35) {
    testFeedback.textContent = "Prototype needs work. Move the parts into a clear rocket shape and keep them straight.";
  } else {
    testFeedback.textContent = "Build more before launch. A rocket needs structure, thrust, and stability.";
  }
}

document.querySelectorAll(".part-button").forEach((button) => {
  button.addEventListener("click", () => addPart(button.dataset.part));
});

document.querySelector("#rotate-part").addEventListener("click", rotateSelectedPart);
document.querySelector("#remove-part").addEventListener("click", removeSelectedPart);
document.querySelector("#clear-build").addEventListener("click", () => {
  buildPad.querySelectorAll(".rocket-part").forEach((part) => part.remove());
  selectedPart = null;
  flightScore.textContent = "0";
  buildNeedsRetest = false;
  scoreStatus.textContent = "Not tested";
  testFeedback.textContent = "Add a body, engine, nose cone, and two fins. Then run a test.";
  updateBuildEmptyState();
});
document.querySelector("#test-build").addEventListener("click", testBuild);

window.addEventListener("pointermove", (event) => {
  if (!dragState) return;

  const padRect = buildPad.getBoundingClientRect();
  clampPart(
    dragState.part,
    event.clientX - padRect.left - dragState.offsetX,
    event.clientY - padRect.top - dragState.offsetY
  );
});

window.addEventListener("pointerup", () => {
  if (dragState) markBuildNeedsRetest();
  dragState = null;
});

document.querySelectorAll(".badge-button").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.disabled) return;

    const badge = button.dataset.badge;
    earnedBadges.add(badge);
    button.classList.add("is-earned");
    button.textContent = "Badge earned";
    button.disabled = true;
    badgeCount.textContent = earnedBadges.size;
    badgeMessage.textContent =
      earnedBadges.size === 3
        ? "Training record complete: you tried every mini mission."
        : `${badge} added to your training record.`;
  });
});

document.querySelectorAll(".mission-card").forEach((card) => {
  const checks = card.querySelectorAll(".mission-checklist input");
  const button = card.querySelector(".badge-button");

  checks.forEach((check) => {
    check.addEventListener("change", () => {
      if (button.classList.contains("is-earned")) return;

      const isComplete = Array.from(checks).every((item) => item.checked);
      button.disabled = !isComplete;
      button.textContent = isComplete ? "Earn badge" : "Complete checklist";
    });
  });
});

renderTask();
renderTrainingLog();
