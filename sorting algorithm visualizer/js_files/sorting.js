/* sorting.js
   - core utilities, array generation, counters, UI enabling/disabling
   - must be loaded BEFORE algorithm files
*/

let delay = 80;              // will be set from speed slider
let comparisons = 0;
let swaps = 0;

function waitforme(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function updateCounter() {
  const c = document.getElementById("counter");
  if (c) c.innerText = `Comparisons: ${comparisons} | Swaps: ${swaps}`;
}

function resetCounter() {
  comparisons = 0;
  swaps = 0;
  updateCounter();
}

function showInfo(name, time, space, stable) {
  const algo = document.getElementById("algoName");
  const comp = document.getElementById("complexity");
  const stab = document.getElementById("stability");
  if (algo) algo.innerText = `Algorithm: ${name}`;
  if (comp) comp.innerText = `Time: ${time}`;
  if (stab) stab.innerText = `Space: ${space} | Stable: ${stable}`;
  resetCounter();
}

/* swap heights and innerText of two bar elements (counts as a swap) */
function swap(el1, el2) {
  if (!el1 || !el2) return;
  swaps++;
  const h1 = el1.style.height;
  const t1 = el1.innerText;
  el1.style.height = el2.style.height;
  el1.innerText = el2.innerText;
  el2.style.height = h1;
  el2.innerText = t1;
  updateCounter();
}

/* UI control helpers */
function disableSortingBtn() {
  document.querySelectorAll(".sortBtn").forEach(b => b.disabled = true);
}
function enableSortingBtn() {
  document.querySelectorAll(".sortBtn").forEach(b => b.disabled = false);
}
function disableSizeSlider() { document.getElementById("arr_sz").disabled = true; }
function enableSizeSlider() { document.getElementById("arr_sz").disabled = false; }
function disableNewArrayBtn() { document.querySelector(".newArray").disabled = true; document.querySelector(".copyArray").disabled = true; }
function enableNewArrayBtn() { document.querySelector(".newArray").disabled = false; document.querySelector(".copyArray").disabled = false; }

/* create and render a new random array */
function createNewArray(size = 60) {
  const container = document.getElementById("bars");
  container.innerHTML = "";
  resetCounter();

  // clamp size
  size = Math.max(5, Math.min(140, size));

  // create elements
  for (let i = 0; i < size; i++) {
    const val = Math.floor(Math.random() * 380) + 20; // 20 .. 399 px
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${val}px`;
    bar.style.width = `${(100 / size).toFixed(2)}%`;
    bar.style.background = "cyan";
    bar.style.border = "1px solid #000";
    bar.innerText = val;
    container.appendChild(bar);
  }
}

/* copy current array values to clipboard */
async function copyArrayToClipboard() {
  const bars = document.querySelectorAll(".bar");
  const arr = Array.from(bars).map(b => parseInt(b.innerText));
  try {
    await navigator.clipboard.writeText(JSON.stringify(arr));
    alert("Array copied to clipboard");
  } catch (e) {
    alert("Copy failed: " + e);
  }
}

/* init handlers after DOM loads */
window.addEventListener("load", function () {
  const sizeSlider = document.getElementById("arr_sz");
  const speedSlider = document.getElementById("speed_input");
  const newArrayBtn = document.querySelector(".newArray");
  const copyBtn = document.querySelector(".copyArray");

  // set delay from speed slider (higher slider -> faster -> smaller delay)
  const setDelayFromSpeed = () => {
    const v = parseInt(speedSlider.value);
    delay = Math.max(5, 350 - v); // when speed=300 -> delay=50; adjust as desired
  };
  setDelayFromSpeed();

  // initial array
  createNewArray(parseInt(sizeSlider.value || 60));

  // listeners
  sizeSlider.addEventListener("input", function () {
    createNewArray(parseInt(this.value));
  });

  speedSlider.addEventListener("input", function () {
    setDelayFromSpeed();
  });

  newArrayBtn.addEventListener("click", function () {
    createNewArray(parseInt(sizeSlider.value));
  });

  copyBtn.addEventListener("click", function () {
    copyArrayToClipboard();
  });

  updateCounter();
});


//Set Pause And Resume Sorting
let isPaused = false;

function togglePause() {
  isPaused = !isPaused;
  const btn = document.getElementById("pauseBtn");
  if (isPaused) {
    btn.innerText = "Resume";
  } else {
    btn.innerText = "Pause";
  }
}

async function checkPaused() {
  while (isPaused) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const pauseBtn = document.getElementById("pauseBtn");
  pauseBtn.addEventListener("click", togglePause);
});

