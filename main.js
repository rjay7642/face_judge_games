const video = document.getElementById("camera");
const resultSection = document.getElementById("result-section");
const memeImage = document.getElementById("meme-image");
const resultText = document.getElementById("result-text");
const judgeBtn = document.getElementById("judgeBtn");
const judgeAgainBtn = document.getElementById("judgeAgainBtn");

const SCAN_MIN = 7000;
const SCAN_MAX = 8000;
const RESULT_SHOW_TIME = 2000; // only delay before showing button

const savagePairs = [
  { img: "meme1.png", voice: "roast1.mp3", text: "CHLA JA BSDK..💀" },
  { img: "meme2.png", voice: "roast2.mp3", text: "AAP YHA AAJYE" },
  { img: "meme3.png", voice: "roast3.mp3", text: "ABE SAALE" },
  { img: "meme4.png", voice: "roast4.mp3", text: "NPC DETECTED 💀" },
  { img: "meme5.png", voice: "roast5.mp3", text: "YE KYA BAK RHE HO CHADARMOD" },
  { img: "meme6.png", voice: "roast6.mp3", text: "BOL NA BE" },
  { img: "meme7.png", voice: "roast7.mp3", text: "🤡" },
  { img: "meme8.png", voice: "roast8.mp3", text: "SYSTEM REJECTED ❌" }
];

const goodPairs = [
  { img: "meme9.png", voice: "good1.mp3", text: "SIGMA FACE 😎" }
];

let scanning = false;
let currentAudio = null;

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playVoice(src) {
  if (currentAudio) currentAudio.pause();
  currentAudio = new Audio(src);
  currentAudio.play().catch(()=>{});
}

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }});
    video.srcObject = stream;
  } catch {
    alert("Run using Live Server (localhost) to enable camera.");
  }
}

judgeBtn.onclick = () => startScanCycle();
judgeAgainBtn.onclick = () => startScanCycle();

function startScanCycle() {
  if (scanning) return;
  scanning = true;

  judgeBtn.style.display = "none";
  judgeAgainBtn.classList.add("hidden");
  resultSection.classList.add("hidden");

  const scanTime = randomBetween(SCAN_MIN, SCAN_MAX);

  setTimeout(showResult, scanTime);
}

function showResult() {
  const isGood = Math.random() < 0.2;

  let pair = isGood ? randomFrom(goodPairs) : randomFrom(savagePairs);

  memeImage.src = pair.img;
  resultText.innerText = pair.text;
  playVoice(pair.voice);

  resultSection.classList.remove("hidden");

  setTimeout(() => {
    judgeAgainBtn.classList.remove("hidden");
    scanning = false;
  }, RESULT_SHOW_TIME);
}

window.onload = () => {
  resultSection.classList.add("hidden");
  judgeAgainBtn.classList.add("hidden");
  startCamera();
};
