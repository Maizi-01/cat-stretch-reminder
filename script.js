const careMessages = [
  "该起身啦，喝口水，转转肩膀，我在这里陪你。",
  "小猫轻轻拍桌：站起来伸个懒腰，眼睛也休息一下。",
  "你已经很专注了，现在给腰背两分钟奖励。",
  "动一动吧，走到窗边看看远处，回来会更清醒。",
  "请把肩膀放下来，慢慢转三圈，呼吸也跟上。",
  "久坐暂停，身体上线。小猫建议你去接一杯水。",
  "现在是伸展时间：手臂举高，背部舒展开。",
  "很棒，已经坚持一轮了。起来走几步再继续。",
  "让眼睛离开屏幕一会儿，看向六米外的地方。",
  "小猫值班提示：站起来，脚踝转一转，别让身体发麻。"
];

const idleMessages = [
  "先坐好，我帮你看时间。",
  "我会准时提醒你，不让肩膀偷偷变硬。",
  "开始后，我会用温柔声音叫你起来。",
  "专心工作吧，伸展时间交给我。"
];

const reminderAudioSources = careMessages.map((_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return `./assets/audio/reminder-${number}.mp3`;
});

const els = {
  intervalSelect: document.querySelector("#interval-select"),
  customField: document.querySelector("#custom-field"),
  customMinutes: document.querySelector("#custom-minutes"),
  voiceToggle: document.querySelector("#voice-toggle"),
  notifyToggle: document.querySelector("#notify-toggle"),
  startBtn: document.querySelector("#start-btn"),
  resetBtn: document.querySelector("#reset-btn"),
  timeLeft: document.querySelector("#time-left"),
  timerState: document.querySelector("#timer-state"),
  timerRing: document.querySelector("#timer-ring"),
  nextMessage: document.querySelector("#next-message")
};

const state = {
  running: false,
  duration: 15 * 60,
  remaining: 15 * 60,
  intervalId: null,
  lastTick: null,
  messageIndex: 0
};

let currentReminderAudio = null;

function setStartButtonLabel(label) {
  const dot = els.startBtn.querySelector(".button-dot");
  els.startBtn.textContent = "";
  if (dot) els.startBtn.append(dot);
  els.startBtn.append(label);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getSelectedMinutes() {
  if (els.intervalSelect.value === "custom") {
    return clamp(Number(els.customMinutes.value) || 15, 1, 240);
  }

  return Number(els.intervalSelect.value);
}

function setDurationFromControls() {
  const minutes = getSelectedMinutes();
  state.duration = minutes * 60;
  state.remaining = Math.min(state.remaining, state.duration);
  if (!state.running) {
    state.remaining = state.duration;
  }
  render();
  saveSettings();
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function render() {
  const elapsed = state.duration - state.remaining;
  const progress = state.duration > 0 ? (elapsed / state.duration) * 360 : 0;

  els.timeLeft.textContent = formatTime(state.remaining);
  els.timerRing.style.setProperty("--progress", `${progress}deg`);
  els.timerState.textContent = state.running ? "计时中" : "准备开始";
  setStartButtonLabel(state.running ? "暂停" : "开始");
}

function nextCareMessage() {
  const messageIndex = state.messageIndex % careMessages.length;
  const message = careMessages[messageIndex];
  state.messageIndex += 1;
  els.nextMessage.textContent = careMessages[state.messageIndex % careMessages.length];
  return { message, messageIndex };
}

function speakWithSystemVoice(message) {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "zh-CN";
  utterance.rate = 0.92;
  utterance.pitch = 1.12;
  utterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();
  const chineseVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("zh"));
  if (chineseVoice) utterance.voice = chineseVoice;

  window.speechSynthesis.speak(utterance);
}

function playReminderAudio(message, messageIndex) {
  if (!els.voiceToggle.checked) return;

  window.speechSynthesis?.cancel();
  if (currentReminderAudio) {
    currentReminderAudio.pause();
    currentReminderAudio.currentTime = 0;
  }

  currentReminderAudio = new Audio(reminderAudioSources[messageIndex]);
  currentReminderAudio.preload = "auto";
  currentReminderAudio.play().catch(() => {
    speakWithSystemVoice(message);
  });
}

async function maybeRequestNotificationPermission() {
  if (!els.notifyToggle.checked || !("Notification" in window)) return;

  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }
}

function showNotification(message) {
  if (!els.notifyToggle.checked || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  new Notification("小猫伸展提醒", {
    body: message,
    silent: true
  });
}

function completeRound() {
  const { message, messageIndex } = nextCareMessage();
  state.remaining = state.duration;
  state.lastTick = Date.now();
  render();
  playReminderAudio(message, messageIndex);
  showNotification(message);
}

function tick() {
  const now = Date.now();
  const delta = Math.max(1, Math.floor((now - state.lastTick) / 1000));
  state.lastTick = now;
  state.remaining = Math.max(0, state.remaining - delta);

  if (state.remaining <= 0) {
    completeRound();
    return;
  }

  render();
}

async function start() {
  await maybeRequestNotificationPermission();
  state.running = true;
  state.lastTick = Date.now();
  state.intervalId = window.setInterval(tick, 1000);
  render();
}

function pause() {
  state.running = false;
  window.clearInterval(state.intervalId);
  state.intervalId = null;
  els.timerState.textContent = "已暂停";
  setStartButtonLabel("继续");
}

function reset() {
  pause();
  state.remaining = state.duration;
  state.messageIndex = state.messageIndex % careMessages.length;
  els.nextMessage.textContent = careMessages[state.messageIndex % careMessages.length];
  render();
  els.timerState.textContent = "准备开始";
  setStartButtonLabel("开始");
}

function saveSettings() {
  const settings = {
    interval: els.intervalSelect.value,
    customMinutes: els.customMinutes.value,
    voice: els.voiceToggle.checked,
    notify: els.notifyToggle.checked
  };
  localStorage.setItem("meow-break-settings", JSON.stringify(settings));
}

function loadSettings() {
  const raw = localStorage.getItem("meow-break-settings");
  if (!raw) return;

  try {
    const settings = JSON.parse(raw);
    if (settings.interval) els.intervalSelect.value = settings.interval;
    if (settings.customMinutes) els.customMinutes.value = settings.customMinutes;
    els.voiceToggle.checked = settings.voice !== false;
    els.notifyToggle.checked = Boolean(settings.notify);
  } catch {
    localStorage.removeItem("meow-break-settings");
  }
}

function syncCustomVisibility() {
  els.customField.hidden = els.intervalSelect.value !== "custom";
}

els.startBtn.addEventListener("click", () => {
  if (state.running) {
    pause();
  } else {
    start();
  }
});

els.resetBtn.addEventListener("click", reset);

els.intervalSelect.addEventListener("change", () => {
  syncCustomVisibility();
  setDurationFromControls();
});

els.customMinutes.addEventListener("change", setDurationFromControls);
els.customMinutes.addEventListener("input", setDurationFromControls);
els.voiceToggle.addEventListener("change", saveSettings);
els.notifyToggle.addEventListener("change", saveSettings);

window.speechSynthesis?.addEventListener?.("voiceschanged", () => {});

if ("serviceWorker" in navigator && window.isSecureContext) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

loadSettings();
syncCustomVisibility();
setDurationFromControls();
els.nextMessage.textContent = careMessages[0];
render();
