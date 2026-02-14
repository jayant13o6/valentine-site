// ---------------- NO BUTTON BEHAVIOR ----------------
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

let scale = 1;

function moveAwayFromYes() {

    const yesRect = yesBtn.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();
    const container = document.querySelector('.buttons').getBoundingClientRect();

    const yesX = yesRect.left + yesRect.width / 2;
    const yesY = yesRect.top + yesRect.height / 2;

    const noX = noRect.left + noRect.width / 2;
    const noY = noRect.top + noRect.height / 2;

    let dx = noX - yesX;
    let dy = noY - yesY;

    const length = Math.sqrt(dx * dx + dy * dy) || 1;
    dx /= length;
    dy /= length;

    let newLeft = (noRect.left - container.left) + dx * container.width * 0.05;
    let newTop = (noRect.top - container.top) + dy * container.height * 0.05;

    newLeft = Math.max(0, Math.min(container.width - noRect.width, newLeft));
    newTop = Math.max(0, Math.min(container.height - noRect.height, newTop));

    noBtn.style.left = newLeft + 'px';
    noBtn.style.top = newTop + 'px';
}

noBtn.addEventListener('click', () => {

    // shake
    noBtn.classList.add('shake');
    setTimeout(() => noBtn.classList.remove('shake'), 400);

    // shrink 2%
    scale *= 0.98;
    noBtn.style.transform = `scale(${scale})`;

    // move away
    moveAwayFromYes();

    if (scale < 0.35) {
        noBtn.innerText = "pls no 😭";
    }

    yesBtn.style.transform = "scale(1.25)";
});


// ---------------- YES BUTTON ----------------
const success = document.getElementById('successBox');

yesBtn.addEventListener('click', () => {
    success.classList.add('show');
    startConfetti();
    spawnHearts();
});


// ---------------- HEARTS ----------------
function spawnHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.bottom = '-20px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }, 250);
}


// ---------------- CONFETTI ----------------
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let pieces = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function startConfetti() {
    for (let i = 0; i < 140; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: 6 + Math.random() * 6,
            speed: 1 + Math.random() * 3,
            angle: Math.random() * Math.PI * 2
        });
    }
    requestAnimationFrame(update);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
        p.y += p.speed;
        p.x += Math.sin(p.angle);
        ctx.fillStyle = `hsl(${Math.random() * 360},80%,60%)`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        if (p.y > canvas.height) p.y = -10;
    });
    requestAnimationFrame(update);
}


// ---------------- NAME FROM URL ----------------
(function () {
    const params = new URLSearchParams(window.location.search);
    let name = params.get('name');
    if (!name || !name.trim()) name = "Someone Special";

    document.title = `For ${name} 💖`;

    const ribbon = document.createElement('div');
    ribbon.style.position = 'fixed';
    ribbon.style.top = '0';
    ribbon.style.left = '0';
    ribbon.style.right = '0';
    ribbon.style.padding = '10px 14px';
    ribbon.style.background = 'linear-gradient(90deg,#ff7aa2,#ff4d6d)';
    ribbon.style.color = '#fff';
    ribbon.style.textAlign = 'center';
    ribbon.style.fontWeight = '700';
    ribbon.style.zIndex = '9999';
    ribbon.innerHTML = `For ${name} 💌`;
    document.body.appendChild(ribbon);
})();
