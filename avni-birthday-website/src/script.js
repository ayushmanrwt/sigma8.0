// This file contains JavaScript code for interactive features on the birthday website dedicated to Avni.

document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.getElementById('welcome-message');
    const images = document.querySelectorAll('.image-gallery img');
    if (welcomeMessage) {
        welcomeMessage.textContent = "Happy Birthday, Avni! 🎉";
    }
    images.forEach(image => {
        image.addEventListener('click', () => {
            image.classList.toggle('zoom');
        });
    });

    // Smooth fade-in for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = 0;
        setTimeout(() => {
            heroContent.style.transition = "opacity 1.5s";
            heroContent.style.opacity = 1;
        }, 400);
    }
});

// 3D Confetti/Particles Background for Avni's Birthday
if (window.THREE) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight * 0.6), 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const container = document.getElementById('threejs-cake');
    renderer.setSize(window.innerWidth, window.innerHeight * 0.6);
    renderer.setClearColor(0x000000, 0); // transparent
    container.appendChild(renderer.domElement);

    // Confetti colors
    const colors = [0xff69b4, 0xffb347, 0x00cfff, 0xffffff, 0x8e44ad];

    // Create confetti particles
    const confettiCount = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colorsArr = [];

    for (let i = 0; i < confettiCount; i++) {
        positions.push(
            (Math.random() - 0.5) * 20, // x
            Math.random() * 12,         // y
            (Math.random() - 0.5) * 10  // z
        );
        const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
        colorsArr.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsArr, 3));

    const material = new THREE.PointsMaterial({
        size: 0.35,
        vertexColors: true,
        transparent: true,
        opacity: 0.85
    });

    const confetti = new THREE.Points(geometry, material);
    scene.add(confetti);

    camera.position.z = 8;

    function animate() {
        requestAnimationFrame(animate);

        // Animate confetti
        const pos = geometry.attributes.position.array;
        for (let i = 0; i < confettiCount; i++) {
            let y = pos[i * 3 + 1];
            y -= 0.03 + Math.random() * 0.01;
            if (y < -2) y = 12;
            pos[i * 3 + 1] = y;
        }
        geometry.attributes.position.needsUpdate = true;

        confetti.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    animate();

    // Responsive resize
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight * 0.6);
        camera.aspect = window.innerWidth / (window.innerHeight * 0.6);
        camera.updateProjectionMatrix();
    });

    // Confetti burst function
    function confettiBurst() {
        for (let i = 0; i < confettiCount; i++) {
            positions[i * 3 + 1] = Math.random() * 12 + 2;
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        geometry.attributes.position.needsUpdate = true;
    }
    window.confettiBurst = confettiBurst;
}

// Countdown Timer for Avni's Birthday (11 Dec)
let countdownEnded = false;
function updateCountdown() {
    const countdown = document.getElementById('countdown');
    const now = new Date();
    let year = now.getFullYear();
    let birthday = new Date(year, 11, 11); // Months are 0-indexed (11 = December)
    if (now > birthday) birthday = new Date(year + 1, 11, 11);
    const diff = birthday - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    if (diff > 0) {
        countdown.innerHTML = 
            `<span>${days}d</span> <span>${hours}h</span> <span>${mins}m</span> <span>${secs}s</span> until Avni's Birthday!`;
    } else if (!countdownEnded) {
        countdownEnded = true;
        countdown.innerHTML = `<span>🎉 Happy Birthday Avni! 🎉</span>`;
        if (window.confettiBurst) window.confettiBurst();
        playBirthdaySound();
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Floating Birthday Wishes (colorful, random)
const wishes = [
    "Happy Birthday Avni! 🎉",
    "Stay magical! ✨",
    "Wishing you endless smiles 😊",
    "You’re the best! 💖",
    "Shine bright, birthday girl! 🌟",
    "Lots of love! 🥰",
    "Dream big! 🚀",
    "Party time! 🥳",
    "You make the world brighter! 🌈"
];
const wishColors = [
    "#ff69b4", "#ffb347", "#00cfff", "#8e44ad", "#fff", "#f06292", "#ffd700"
];
function showFloatingWish() {
    const wish = wishes[Math.floor(Math.random() * wishes.length)];
    const wishElem = document.createElement('div');
    wishElem.className = 'floating-wish';
    wishElem.textContent = wish;
    // Random horizontal position (10% to 80%)
    wishElem.style.left = (10 + Math.random() * 80) + '%';
    wishElem.style.bottom = '0';
    wishElem.style.color = wishColors[Math.floor(Math.random() * wishColors.length)];
    wishElem.style.fontSize = (1.1 + Math.random() * 0.7) + "em";
    wishElem.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
    document.getElementById('floating-wishes').appendChild(wishElem);
    setTimeout(() => wishElem.remove(), 4000);
}
setInterval(showFloatingWish, 3000);

// Optional: Play a birthday sound when countdown ends
function playBirthdaySound() {
    // You can use any short mp3/ogg sound you like, or comment this out if not needed
    const audio = document.createElement('audio');
    audio.src = "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa1c7b.mp3";
    audio.autoplay = true;
    audio.volume = 0.3;
    document.body.appendChild(audio);
    setTimeout(() => audio.remove(), 8000);
}

// --- Wishes Modal and Storage ---
const openWishModal = document.getElementById('openWishModal');
const wishModal = document.getElementById('wishModal');
const closeWishModal = document.getElementById('closeWishModal');
const wishForm = document.getElementById('wishForm');
const wishesList = document.getElementById('wishesList');

// Show modal
openWishModal.addEventListener('click', e => {
    e.preventDefault();
    wishModal.style.display = 'flex';
    setTimeout(() => { document.getElementById('wishName').focus(); }, 200);
});
// Hide modal
closeWishModal.addEventListener('click', () => wishModal.style.display = 'none');
window.addEventListener('click', e => {
    if (e.target === wishModal) wishModal.style.display = 'none';
});

// Save wish to localStorage and update UI
function saveWish(name, text) {
    const wishes = JSON.parse(localStorage.getItem('avniWishes') || '[]');
    wishes.unshift({ name, text, date: new Date().toLocaleString() });
    localStorage.setItem('avniWishes', JSON.stringify(wishes));
    renderWishes();
}

// Render wishes from localStorage
function renderWishes() {
    const wishes = JSON.parse(localStorage.getItem('avniWishes') || '[]');
    wishesList.innerHTML = wishes.map(w =>
        `<li>
            <span>${w.text}</span>
            <span class="wish-name">— ${w.name}</span>
        </li>`
    ).join('');
}
renderWishes();

// Handle wish form submit
wishForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('wishName').value.trim() || "Anonymous";
    const text = document.getElementById('wishText').value.trim();
    if (text.length > 0) {
        saveWish(name, text);
        wishForm.reset();
        wishModal.style.display = 'none';
    }
});