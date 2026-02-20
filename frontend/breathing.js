// =============================
// BREATHING ANIMATION LOGIC
// =============================

const circle = document.getElementById("circle");
const text = document.getElementById("breathText");

let breathingInterval;

// Start Breathing
function startBreathing() {

    // Agar already chal raha ho toh restart na ho
    if (breathingInterval) return;

    runCycle(); // first cycle
    breathingInterval = setInterval(runCycle, 12000); // repeat every 12 sec
}

// One full breathing cycle
function runCycle() {

    // INHALE
    text.innerText = "Inhale...";
    circle.style.transform = "scale(1.5)";

    // HOLD
    setTimeout(() => {
        text.innerText = "Hold...";
    }, 4000);

    // EXHALE
    setTimeout(() => {
        text.innerText = "Exhale...";
        circle.style.transform = "scale(1)";
    }, 7000);

    // READY AGAIN
    setTimeout(() => {
        text.innerText = "Repeat...";
    }, 11000);
}

// Back Button
function goBack() {
    window.location.href = "dashboard.html";
}
