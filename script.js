// ===============================
// Elements
// ===============================

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const openBtn = document.getElementById("openBtn");
const music = document.getElementById("bgMusic");
const heartContainer = document.getElementById("heartContainer");

// ===============================
// Try autoplay when page opens
// ===============================

window.addEventListener("load", () => {
    music.volume = 0.45;

    const playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise.catch(() => {
            // Browser blocked autoplay.
            // Music will start when button is clicked.
        });
    }
});

// ===============================
// Open Surprise
// ===============================

openBtn.addEventListener("click", () => {

    // Start music if it isn't already playing
    music.play().catch(() => {});

    // Hide first page
    page1.classList.add("hide");

    // Show second page
    setTimeout(() => {
        page2.classList.add("show");
        document.body.style.overflow = "auto";
    }, 700);

});

// ===============================
// Floating Hearts
// ===============================

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";
    heart.innerHTML = "❤️";

    // Random position
    heart.style.left = Math.random() * 100 + "vw";

    // Random size
    const size = Math.random() * 18 + 12;
    heart.style.fontSize = size + "px";

    // Low opacity
    heart.style.opacity = (Math.random() * 0.12 + 0.05).toFixed(2);

    // Random animation duration
    const duration = Math.random() * 6 + 8;
    heart.style.animationDuration = duration + "s";

    heartContainer.appendChild(heart);

    // Remove after animation
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);

}

// Create hearts forever
setInterval(createHeart, 350);

// ===============================
// Keep music looping
// ===============================

music.loop = true;

// If browser pauses audio,
// resume when the user returns.

document.addEventListener("visibilitychange", () => {

    if (!document.hidden) {

        music.play().catch(() => {});

    }

});

// Resume music if user taps anywhere
document.addEventListener("click", () => {
    if (music.paused) {
        music.play().catch(() => {});
    }
});
