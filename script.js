const text = document.getElementById("text");
const circle = document.querySelector(".circle");
const inhaleSound = document.getElementById("inhaleSound");
const exhaleSound = document.getElementById("exhaleSound");
const particlesContainer = document.getElementById("particles");

const inhaleTime = 4000;
const holdTime = 2000;
const exhaleTime = 6000;
let intervalId;
let isRunning = false;

// Create particles
const numParticles = 30;
for (let i = 0; i < numParticles; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");
    const size = Math.random() * 8 + 4;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}vw`;
    p.style.animationDuration = `${Math.random() * 10 + 5}s`;
    p.style.animationDelay = `${Math.random() * 10}s`;
    p.style.background = "rgba(255,170,165,0.5)";
    particlesContainer.appendChild(p);
}

// Update particle color
function updateParticleColors(color) {
    document.querySelectorAll(".particle").forEach(p => p.style.background = color);
}

function breathingCycle() {
    if (!isRunning) return;

    // Inhale
    text.innerText = "Inhale 🌬️";
    circle.classList.add("grow");
    circle.classList.remove("shrink");
    circle.style.backgroundColor = "#a8e6cf";
    circle.style.boxShadow = "0 0 40px rgba(168,230,207,0.7)";
    updateParticleColors("rgba(168,230,207,0.5)");
    inhaleSound.play();

    // Hold
    setTimeout(() => {
        text.innerText = "Hold 😌";
        circle.style.backgroundColor = "#ffd3b6";
        circle.style.boxShadow = "0 0 35px rgba(255,211,182,0.7)";
        updateParticleColors("rgba(255,211,182,0.5)");
    }, inhaleTime);

    // Exhale
    setTimeout(() => {
        text.innerText = "Exhale 💨";
        circle.classList.remove("grow");
        circle.classList.add("shrink");
        circle.style.backgroundColor = "#ffaaa5";
        circle.style.boxShadow = "0 0 30px rgba(255,170,165,0.7)";
        updateParticleColors("rgba(255,170,165,0.5)");
        exhaleSound.play();
    }, inhaleTime + holdTime);
}

// Start button
document.getElementById("startBtn").addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        breathingCycle();
        intervalId = setInterval(breathingCycle, inhaleTime + holdTime + exhaleTime);
    }
});

// Stop button
document.getElementById("stopBtn").addEventListener("click", () => {
    isRunning = false;
    clearInterval(intervalId);
    text.innerText = "Press Start to Begin";
    circle.classList.remove("grow", "shrink");
    circle.style.backgroundColor = "#f6a5c0";
    circle.style.boxShadow = "0 0 20px rgba(255,170,165,0.5)";
    updateParticleColors("rgba(255,170,165,0.5)");
});
