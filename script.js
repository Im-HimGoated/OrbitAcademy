const pathData = {
  build: {
    title: "Aerospace Engineer",
    copy: "Explore rocket, satellite, and rover parts to see how space machines work.",
    skill: "Notice what each space part does and why it matters",
    mission: "Tap a part, learn its job, and collect parts for your space machine map",
    prepTitle: "Space Parts Lab",
  },
  code: {
    title: "Flight Software Developer",
    copy: "Give spacecraft clear commands so they can steer, scan, and get home safely.",
    skill: "Turn a puzzle into step-by-step commands",
    mission: "Make a grid map and code a satellite back to base",
    prepTitle: "Space Coder Training",
  },
  explore: {
    title: "Planetary Scientist",
    copy: "Hunt for clues in planets, moons, rocks, and strange space signals.",
    skill: "Notice details and explain your clues",
    mission: "Compare mystery rocks and pick one for a rover to collect",
    prepTitle: "Planet Detective Training",
  },
  lead: {
    title: "Mission Director",
    copy: "Lead the countdown and decide if the rocket is safe to launch or needs to wait.",
    skill: "Check wind, lightning, fuel, orbit path, radio, and crew safety",
    mission: "Run a mission-control huddle and call go or no-go for liftoff",
    prepTitle: "Crew Captain Training",
  },
};

const taskDecks = {
  build: [
    {
      type: "Prototype drill",
      title: "Improve a rocket fin",
      copy: "Your rocket wiggles in the air. Pick one fin change that could make it fly straighter.",
      steps: ["Pick the part to change", "Guess what the change will do", "Name one way to test it"],
      note: "Mission note: what will you change, and why?",
    },
    {
      type: "Engineering check",
      title: "Choose the strongest material",
      copy: "A rover arm has to carry a tiny sample. Choose which material gets the job.",
      steps: ["Name two possible materials", "Choose the stronger option", "Explain the tradeoff"],
      note: "Mission note: which material wins, and what is its weakness?",
    },
    {
      type: "Redesign sprint",
      title: "Fix a wobbly lander",
      copy: "A lander tips over after touchdown. Rescue it with one smart design fix.",
      steps: ["Identify why it tips", "Add one stability feature", "Decide how to measure success"],
      note: "Mission note: write your lander rescue idea.",
    },
  ],
  code: [
    {
      type: "Command sequence",
      title: "Guide a satellite",
      copy: "A satellite lost its signal. Create commands that steer it around danger and back to base.",
      steps: ["Choose a start and finish", "Add one obstacle", "Write at least four commands"],
      note: "Mission note: write commands like forward, turn, scan, or transmit.",
    },
    {
      type: "Debug drill",
      title: "Find the bad instruction",
      copy: "A rover keeps turning before it scans. Move one command to fix the robot brain.",
      steps: ["Spot the command order problem", "Move one command", "Explain why the new order works"],
      note: "Mission note: write the old problem and your fixed order.",
    },
    {
      type: "Sensor logic",
      title: "Make a safety rule",
      copy: "Help a rover avoid cliffs with one simple if-then safety rule.",
      steps: ["Name the sensor signal", "Choose the safe action", "Add a backup action"],
      note: "Mission note: write your if-then safety rule.",
    },
  ],
  explore: [
    {
      type: "Evidence log",
      title: "Pick a rover sample",
      copy: "A rover can collect only one rock. Pick the sample with the best secret clue.",
      steps: ["Choose a science question", "Pick a sample type", "Explain what it could reveal"],
      note: "Mission note: which sample would you grab, and why?",
    },
    {
      type: "Observation drill",
      title: "Compare two planets",
      copy: "Compare two planets like a space detective looking for surprising differences.",
      steps: ["Pick two features", "Make one comparison", "Ask one follow-up question"],
      note: "Mission note: write your comparison and one new question.",
    },
    {
      type: "Mission question",
      title: "Ask a testable question",
      copy: "Turn a giant space question into something a robot, telescope, or astronaut could measure.",
      steps: ["Write the big question", "Choose what to measure", "Name the tool that could measure it"],
      note: "Mission note: write the testable version of your question.",
    },
  ],
  lead: [
    {
      type: "Team planning",
      title: "Assign launch roles",
      copy: "The countdown is ticking. Wind or lightning can stop launch, fuel gives the rocket a big push, guidance aims toward orbit, radio keeps the crew talking, and safety protects astronauts.",
      steps: ["Pick three launch jobs", "Say the space fact each job checks", "Call go to launch or no-go to wait"],
      note: "Mission note: write your launch jobs and what each kid checks before liftoff.",
    },
    {
      type: "Decision drill",
      title: "Choose under pressure",
      copy: "Your crew has ten minutes and two possible fixes. Pick the one you trust most.",
      steps: ["Name both options", "Pick the safer next move", "Explain the reason"],
      note: "Mission note: write your decision and the clue that helped.",
    },
    {
      type: "Communication check",
      title: "Send a mission update",
      copy: "Send a quick update so everyone knows what happened and what comes next.",
      steps: ["State the current status", "Name one problem or success", "Give the next action"],
      note: "Mission note: write the update in two clear sentences.",
    },
  ],
};

const buttons = document.querySelectorAll(".interest-button");
const roleTitle = document.querySelector("#role-title");
const roleCopy = document.querySelector("#role-copy");
const skillOutput = document.querySelector("#skill-output");
const missionOutput = document.querySelector("#mission-output");
const trainingPathTitle = document.querySelector("#training-path-title");
const scoreLabel = document.querySelector("#score-label");
const taskType = document.querySelector("#task-type");
const taskTitle = document.querySelector("#task-title");
const taskCopy = document.querySelector("#task-copy");
const taskChecklist = document.querySelector("#task-checklist");
const taskNote = document.querySelector("#task-note");
const noteLabel = document.querySelector("#note-label");
const completeTaskButton = document.querySelector("#complete-task");
const skipTaskButton = document.querySelector("#skip-task");
const taskCount = document.querySelector("#task-count");
const trainingLogLabel = document.querySelector("#training-log-label");
const trainingLogList = document.querySelector("#training-log-list");
const partExplorer = document.querySelector("#part-explorer");
const partButtons = document.querySelectorAll(".part-hotspot");
const partKind = document.querySelector("#part-kind");
const partName = document.querySelector("#part-name");
const partCopy = document.querySelector("#part-copy");
const partFacts = document.querySelector("#part-facts");
const sparkMeter = document.querySelector("#spark-meter");
const sparkFill = document.querySelector("#spark-fill");
const simFeedback = document.querySelector("#sim-feedback");
const simStage = document.querySelector("#sim-stage");
const simChoices = document.querySelector("#sim-choices");
const trainingSim = document.querySelector(".training-sim");
const missionNote = document.querySelector(".mission-note");
const taskActions = document.querySelector(".task-actions");
let activePath = "build";
let activeTaskIndex = 0;
let finishedTasks = 0;
let sparkLevel = 0;
const learnedParts = new Set();
const pathProgress = {
  build: [],
  code: [],
  explore: [],
  lead: [],
};

const simLessons = {
  build: {
    scan: "Space clue: fins help a rocket stay pointed forward. If the rocket wiggles, the air is pushing it off balance.",
    build: "Test idea: change only one rocket part at a time. Real engineers test one change so they know what helped.",
    launch: "Launch fact: a stable rocket flies straighter because its nose, body, fins, and engine work together.",
  },
  code: {
    scan: "Space clue: satellites follow exact commands. One missing turn can send the whole path the wrong way.",
    build: "Test idea: write commands in order, then debug them. Space robots cannot guess what you meant.",
    launch: "Launch fact: spacecraft use sensors and instructions to steer, scan, and send data back to Earth.",
  },
  explore: {
    scan: "Space clue: rovers look for evidence. Color, shape, layers, and tiny holes can tell scientists a rock's story.",
    build: "Test idea: pick the sample that answers a question. A rover should collect the rock with the best clue.",
    launch: "Launch fact: rover samples can teach us if a planet once had water, volcanoes, or places life could survive.",
  },
  lead: {
    scan: "Space clue: launch teams check wind, lightning, fuel, guidance, radio, and crew safety before liftoff.",
    build: "Test idea: give every kid one launch check. If one station says no-go, the smart move is to wait.",
    launch: "Launch fact: go means the rocket is ready. No-go means something needs fixing before astronauts are safe.",
  },
};

const partLessons = {
  "rocket-nose": {
    kind: "Rocket part",
    name: "Nose cone",
    copy: "The nose cone is the pointy front. It helps the rocket push through air without wobbling as much.",
    facts: ["Smooth shapes cut through air better.", "A strong nose cone protects the top of the rocket."],
  },
  "rocket-fuel": {
    kind: "Rocket part",
    name: "Fuel tank",
    copy: "The fuel tank carries the fuel that the engine burns to make a huge push upward.",
    facts: ["Rockets need lots of fuel because Earth pulls them down with gravity.", "Less wasted weight can help a rocket fly higher."],
  },
  "rocket-engine": {
    kind: "Rocket part",
    name: "Engine",
    copy: "The engine blasts hot gas downward. That push sends the rocket upward toward space.",
    facts: ["This push is called thrust.", "More thrust helps a rocket lift off the launch pad."],
  },
  "rocket-fins": {
    kind: "Rocket part",
    name: "Fins",
    copy: "Fins help a rocket stay steady, like feathers help an arrow fly straight.",
    facts: ["Fins fight wobbling in the air.", "Changing fin size or shape can change how straight a rocket flies."],
  },
  "satellite-panels": {
    kind: "Satellite part",
    name: "Solar panels",
    copy: "Solar panels catch sunlight and turn it into power for the satellite.",
    facts: ["Satellites need power to run cameras, radios, and computers.", "Panels spread out wide to catch more sunlight."],
  },
  "satellite-antenna": {
    kind: "Satellite part",
    name: "Antenna",
    copy: "The antenna sends messages to Earth and receives commands from mission control.",
    facts: ["Without an antenna, a satellite could not share what it learns.", "Radio signals can travel through space."],
  },
  "satellite-sensor": {
    kind: "Satellite part",
    name: "Camera sensor",
    copy: "A camera sensor helps the satellite take pictures or measure things from far above Earth.",
    facts: ["Some sensors track clouds, fires, oceans, or planets.", "Scientists use sensor data to answer questions."],
  },
  "satellite-computer": {
    kind: "Satellite part",
    name: "Computer",
    copy: "The computer is the satellite brain. It follows commands and keeps the satellite working.",
    facts: ["Computers help aim the satellite.", "They can save data until the antenna sends it home."],
  },
  "rover-wheels": {
    kind: "Rover part",
    name: "Wheels",
    copy: "Rover wheels grip dusty ground so the rover can crawl over rocks, sand, and bumps.",
    facts: ["Rovers drive slowly so they do not get stuck.", "Wheel tracks help scientists see how soft the ground is."],
  },
  "rover-camera": {
    kind: "Rover part",
    name: "Camera mast",
    copy: "The camera mast is like a rover's tall eyes. It looks around and helps choose where to drive.",
    facts: ["Cameras can spot rocks that might be interesting.", "Pictures help scientists plan the rover's next move."],
  },
  "rover-arm": {
    kind: "Rover part",
    name: "Robot arm",
    copy: "The robot arm reaches out to touch rocks, scoop soil, or use tiny science tools.",
    facts: ["A rover arm can study rocks up close.", "Some arms help collect samples for scientists."],
  },
  "rover-antenna": {
    kind: "Rover part",
    name: "Antenna",
    copy: "The rover antenna sends pictures and science clues back to Earth.",
    facts: ["Rovers are far away, so messages take time to travel.", "The antenna also receives new driving commands."],
  },
};

function renderPartLesson(partKey, shouldRecord = true) {
  const lesson = partLessons[partKey] || partLessons["rocket-nose"];

  partKind.textContent = lesson.kind;
  partName.textContent = lesson.name;
  partCopy.textContent = lesson.copy;
  partFacts.innerHTML = "";

  lesson.facts.forEach((fact) => {
    const item = document.createElement("li");
    item.textContent = fact;
    partFacts.append(item);
  });

  partButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.partKey === partKey);
  });

  if (shouldRecord) learnedParts.add(lesson.name);
  renderTrainingLog();
}

function renderTask() {
  const selected = pathData[activePath];
  const task = taskDecks[activePath][activeTaskIndex];

  trainingPathTitle.textContent = selected.prepTitle;
  scoreLabel.textContent = activePath === "build" ? "Parts learned" : "Quest wins";

  if (activePath === "build") {
    taskType.textContent = "Parts explorer";
    taskTitle.textContent = "Tap rocket, satellite, and rover parts";
    taskCopy.textContent = "Pick a part to learn what it does, why it matters, and one simple space fact.";
    partExplorer.classList.remove("is-hidden");
    trainingSim.classList.add("is-hidden");
    taskChecklist.classList.add("is-hidden");
    missionNote.classList.add("is-hidden");
    taskActions.classList.add("is-hidden");
    renderPartLesson("rocket-nose", false);
    return;
  }

  partExplorer.classList.add("is-hidden");
  trainingSim.classList.remove("is-hidden");
  taskChecklist.classList.remove("is-hidden");
  missionNote.classList.remove("is-hidden");
  taskActions.classList.remove("is-hidden");
  taskType.textContent = task.type;
  taskTitle.textContent = task.title;
  taskCopy.textContent = task.copy;
  noteLabel.textContent = task.note;
  taskNote.value = "";
  sparkLevel = 0;
  simStage.dataset.state = "ready";
  simFeedback.textContent = "Press each cockpit button to learn a space clue before you clear the quest.";
  updateSparkMeter();
  completeTaskButton.disabled = true;
  completeTaskButton.textContent = "Clear quest";
  taskChecklist.innerHTML = "<legend>Clear the quest</legend>";

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
  if (activePath === "build") {
    const learned = Array.from(learnedParts);
    trainingLogLabel.textContent = "Parts learned";
    taskCount.textContent = learned.length;
    trainingLogList.innerHTML = "";

    if (learned.length === 0) {
      const emptyItem = document.createElement("li");
      emptyItem.textContent = "Tap a part to start your space machine map.";
      trainingLogList.append(emptyItem);
      return;
    }

    learned.slice(-6).forEach((part) => {
      const item = document.createElement("li");
      item.textContent = part;
      trainingLogList.append(item);
    });
    return;
  }

  const completed = pathProgress[activePath];
  trainingLogLabel.textContent = "Quest log";
  taskCount.textContent = completed.length;
  trainingLogList.innerHTML = "";

  if (completed.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "Clear a quest to start this path record.";
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
  const enoughSpark = sparkLevel >= 45;

  completeTaskButton.disabled = !(allChecked && hasNote && enoughSpark);
  completeTaskButton.textContent = enoughSpark ? "Clear quest" : "Power up simulator";
}

function updateSparkMeter() {
  sparkMeter.textContent = `${sparkLevel}%`;
  sparkFill.style.width = `${sparkLevel}%`;
  simStage.classList.toggle("is-boosted", sparkLevel >= 45);
  simStage.classList.toggle("is-maxed", sparkLevel >= 90);
}

function boostSpark(amount, action) {
  const feedback = simLessons[activePath] || simLessons.build;

  sparkLevel = Math.min(100, sparkLevel + amount);
  simStage.dataset.state = action;
  simFeedback.textContent = feedback[action] || "The cockpit is powered up.";
  updateSparkMeter();
  updateTaskReadyState();
}

function flashQuestWin(title) {
  simStage.dataset.state = "win";
  simFeedback.textContent = `${title} cleared. New quest loading.`;
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
  flashQuestWin(finishedTitle);
  window.setTimeout(moveToNextTask, 780);
});

skipTaskButton.addEventListener("click", moveToNextTask);
simChoices.addEventListener("click", (event) => {
  const choice = event.target.closest("button");
  if (!choice) return;

  boostSpark(Number(choice.dataset.boost), choice.dataset.action);
});

partButtons.forEach((button) => {
  button.addEventListener("click", () => renderPartLesson(button.dataset.partKey));
});

const earnedBadges = new Set();
const badgeCount = document.querySelector("#badge-count");
const badgeMessage = document.querySelector("#badge-message");
const badgePop = document.querySelector("#badge-pop");
const badgePopCopy = document.querySelector("#badge-pop-copy");
const buildPad = document.querySelector("#build-pad");
const buildEmpty = document.querySelector("#build-empty");
const flightScore = document.querySelector("#flight-score");
const scoreStatus = document.querySelector("#score-status");
const testFeedback = document.querySelector("#test-feedback");
let selectedPart = null;
let dragState = null;
let partNumber = 0;
let buildNeedsRetest = false;

function launchBadgeConfetti() {
  badgePop.querySelectorAll(".confetti-bit").forEach((bit) => bit.remove());

  for (let index = 0; index < 24; index += 1) {
    const bit = document.createElement("span");
    bit.className = "confetti-bit";
    bit.style.setProperty("--spin", `${index * 17}deg`);
    bit.style.setProperty("--distance", `${110 + (index % 4) * 22}px`);
    bit.style.setProperty("--delay", `${(index % 6) * 35}ms`);
    badgePop.append(bit);
  }
}

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
      earnedBadges.size === 4
        ? "Badge board complete. You tried every mini mission."
        : `${badge} is glowing on your badge board.`;
    badgePopCopy.textContent = `${badge} unlocked`;
    launchBadgeConfetti();
    badgePop.setAttribute("aria-hidden", "false");
    badgePop.classList.remove("is-visible");
    void badgePop.offsetWidth;
    badgePop.classList.add("is-visible");
    window.setTimeout(() => badgePop.setAttribute("aria-hidden", "true"), 2400);
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
