"use strict";

const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 2;

let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;

let colorEl = document.getElementById("color");
let colorModeEl = document.getElementById("color-mode");
let rainbowModeEl = document.getElementById("rainbow-mode");
let clearModeEl = document.getElementById("clear");
let eraseModeEl = document.getElementById("erase");
let sliderEl = document.getElementById("slider");
let sliderSizeEl = document.getElementById("slider-size");
let gridsEl = document.getElementById("grids");
let buttonsEl = document.querySelectorAll(".btn");

// Events

colorEl.addEventListener("input", function (e) {
  setColor(e.target.value);
});

sliderEl.addEventListener("input", function (e) {
  let updatesize = e.target.value;
  sliderSizeEl.textContent = `${updatesize} x ${updatesize}`;
  setSize(updatesize);
  reloadGrid();
});

clearModeEl.addEventListener("click", reloadGrid);

for (let btn of buttonsEl) {
  btn.addEventListener("click", function () {
    setMode(btn.name);
  });
}

// functions
function setColor(newColor) {
  currentColor = newColor;
}

function setMode(newMode) {
  currentMode = newMode;
  activateBtn(newMode);
}

function activateBtn(mode) {
  for (let btn of buttonsEl) {
    btn.classList.remove("active");
  }

  if (mode === "color") {
    colorModeEl.classList.add("active");
  } else if (mode === "rainbow") {
    rainbowModeEl.classList.add("active");
  } else if (mode === "clear") {
    clearModeEl.classList.add("active");
  } else if (mode === "erase") {
    eraseModeEl.classList.add("active");
  }
}

function displayGridSize() {
  sliderSizeEl.textContent = sliderEl.value;
}

function reloadGrid() {
  clear();
  createGrid(currentSize);
}

function setSize(newSize) {
  currentSize = newSize;
}

let mouseDown = false;
document.body.onmousedown = () => {
  mouseDown = true;
};
document.body.onmouseup = () => {
  mouseDown = false;
};

function changeColor(e) {
  let color = colorEl.value;
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = color;
  } else if (currentMode === "erase") {
    e.target.removeAttribute("style");
  }
}

function createGrid(size) {
  gridsEl.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  gridsEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    let gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    gridsEl.appendChild(gridElement);
    gridElement.addEventListener("mousedown", changeColor);
    gridElement.addEventListener("mouseover", changeColor);
    gridElement.addEventListener("dblclick", erased);
  }
}

function erased(e) {
  e.target.removeAttribute("style");
}

function clear() {
  gridsEl.innerHTML = "";
  createGrid(currentSize);
}

window.onload = function () {
  createGrid(DEFAULT_SIZE);
  colorEl.value = "#000000";
};
