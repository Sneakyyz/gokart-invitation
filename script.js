const intro = document.getElementById("intro-screen");
const main = document.getElementById("main-content");
const num = document.getElementById("countdown-number");
const lights = document.querySelectorAll("#lights span");

const seq = ["5","4","3","2","1","GO"];
let i = 0;
let started = false;

function updateLights(step) {

    lights.forEach(l => l.textContent = "⚫");

    if (step >= 0) lights[0].textContent = "🔴";
    if (step >= 1) lights[1].textContent = "🔴";
    if (step >= 2) lights[2].textContent = "🔴";
    if (step >= 3) lights[3].textContent = "🔴";
    if (step >= 4) lights[4].textContent = "🔴";

    if (step === 5) {
        lights.forEach(l => l.textContent = "🟢");
    }
}

function startIntro() {

    if (started) return;
    started = true;

    function step() {

        num.textContent = seq[i];
        updateLights(i);

        if (seq[i] === "GO") {
            setTimeout(() => {
                intro.style.display = "none";
                main.style.display = "block";
            }, 800);
            return;
        }

        i++;
        setTimeout(step, 1000);
    }

    step();
}

document.addEventListener("pointerdown", startIntro, { once: true });

const eventDate = new Date("June 09, 2026 12:00:00").getTime();

setInterval(() => {

    const now = Date.now();
    let diff = eventDate - now;

    if (diff < 0) diff = 0;

    document.getElementById("days").textContent =
        Math.floor(diff / 86400000);

    document.getElementById("hours").textContent =
        Math.floor(diff / 3600000 % 24);

    document.getElementById("minutes").textContent =
        Math.floor(diff / 60000 % 60);

    document.getElementById("seconds").textContent =
        Math.floor(diff / 1000 % 60);

}, 1000);

const messages = [
"Try to keep up",
"Skill issue if you lose"
];

let m = 0;
setInterval(() => {
    document.getElementById("talk-box").textContent =
        messages[m = (m + 1) % messages.length];
}, 3000);

document.getElementById("accept-btn").onclick = () => {

    document.getElementById("accepted-message").style.display = "block";

    launchConfetti();
};

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resize();
window.addEventListener("resize", resize);

let pieces = [];

class Particle {
    constructor() {
        this.x = Math.random() * innerWidth;
        this.y = -10;
        this.vy = Math.random() * 3 + 2;
        this.vx = Math.random() * 2 - 1;
        this.size = Math.random() * 6 + 3;
        this.color = ["red","white","gold"][Math.floor(Math.random()*3)];
    }

    update() {
        this.y += this.vy;
        this.x += this.vx;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.size,this.size);
    }
}

function launchConfetti() {
    const count = innerWidth < 768 ? 80 : 150;
    pieces = [];

    for (let i = 0; i < count; i++) {
        pieces.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0,0,innerWidth,innerHeight);

    pieces.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

animate();