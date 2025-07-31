// Import Three.js library
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true }); // Enable antialiasing for smoother edges
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

// Add point light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Create a geometry and material with premium effects
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    metalness: 0.7, // Add metallic effect
    roughness: 0.2, // Add smoothness
    emissive: 0x001100, // Add subtle glow
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add animation
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube for animation
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

animate();

// Add 3D animations for icons
const iconElements = document.querySelectorAll('.top-icons a');
iconElements.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'rotateY(360deg)';
        icon.style.transition = 'transform 0.6s ease';
    });
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'rotateY(0deg)';
    });
});
