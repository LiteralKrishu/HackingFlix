// Navigation Toggle for Mobile
function toggleMenu() {
  document.querySelector('nav').classList.toggle('active');
}

// Section Toggling
function showSection(sectionId) {
  document.querySelectorAll('section').forEach(section => {
    section.classList.remove('active');
  });
  const targetSection = document.getElementById(sectionId);
  targetSection.classList.add('active');
  gsap.fromTo(targetSection, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 });
  update3DObject(sectionId);
}

// Mock Form Handlers
function handleSignup(event) {
  event.preventDefault();
  alert('Sign Up Successful!');
  showSection('login');
}

function handleLogin(event) {
  event.preventDefault();
  alert('Login Successful!');
  showSection('dashboard');
}

function handleCheckout(event) {
  event.preventDefault();
  alert('Processing Payment...');
  setTimeout(() => showSection('purchase-success'), 1000);
}

// Color Flash Effect
function triggerFlash(color) {
  const flash = document.getElementById('flash');
  flash.style.background = color;
  flash.style.opacity = '0.5';
  gsap.to(flash, { opacity: 0, duration: 0.5 });
  createParticleBurst(color);
}

// Navigation Flash Effect
function triggerNavFlash() {
  const colors = ['#00D4FF', '#FF00FF', '#00FF00', '#AA00FF'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const nav = document.querySelector('nav');
  nav.style.borderColor = randomColor;
  nav.style.boxShadow = `0 0 30px ${randomColor}`;
  gsap.to(nav, { boxShadow: `0 0 25px ${randomColor}`, duration: 0.5 });
}

// Card Glow Effect
function glowCard(element, color) {
  element.style.borderColor = color;
  element.style.boxShadow = `0 8px 50px ${color}`;
}

// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Holographic Grid
const gridGeometry = new THREE.PlaneGeometry(20, 20, 20, 20);
const gridMaterial = new THREE.MeshBasicMaterial({ color: 0x00D4FF, wireframe: true, transparent: true, opacity: 0.2 });
const grid = new THREE.Mesh(gridGeometry, gridMaterial);
grid.rotation.x = Math.PI / 2;
grid.position.y = -2;
scene.add(grid);

// Page-Specific 3D Object
let currentObject = null;
const objectMaterials = new THREE.MeshPhongMaterial({ color: 0x00D4FF, emissive: 0x00D4FF, emissiveIntensity: 0.8, transparent: true, opacity: 0.6 });
const objects = {
  landing: new THREE.Mesh(new THREE.OctahedronGeometry(1), objectMaterials),
  testimonial: new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), objectMaterials),
  signup: new THREE.Mesh(new THREE.TetrahedronGeometry(1), objectMaterials),
  login: new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 32), objectMaterials),
  'user-journey': new THREE.Mesh(new THREE.ConeGeometry(0.8, 1.5, 32), objectMaterials),
  homepage: new THREE.Mesh(new THREE.DodecahedronGeometry(1), objectMaterials),
  dashboard: new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.2, 16, 100), objectMaterials),
  'academy-home': new THREE.Mesh(new THREE.IcosahedronGeometry(1), objectMaterials),
  'course-detail': new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32), objectMaterials),
  checkout: new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), objectMaterials),
  'purchase-success': new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 32), objectMaterials),
  'course-player': new THREE.Mesh(new THREE.OctahedronGeometry(1), objectMaterials),
  labs: new THREE.Mesh(new THREE.TetrahedronGeometry(1), objectMaterials),
  ctf: new THREE.Mesh(new THREE.DodecahedronGeometry(1), objectMaterials),
  challenges: new THREE.Mesh(new THREE.ConeGeometry(0.8, 1.5, 32), objectMaterials),
  community: new THREE.Mesh(new THREE.IcosahedronGeometry(1), objectMaterials),
  'job-portal': new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.2, 16, 100), objectMaterials),
  events: new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32), objectMaterials),
};

function update3DObject(sectionId) {
  if (currentObject) scene.remove(currentObject);
  currentObject = objects[sectionId] || objects.landing;
  currentObject.position.y = -0.5;
  scene.add(currentObject);
}
update3DObject('landing');

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x00D4FF, 2, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Background Particles
const particleGeometry = new THREE.BufferGeometry();
const particleCount = 100;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i += 3) {
  positions[i] = (Math.random() - 0.5) * 20;
  positions[i + 1] = (Math.random() - 0.5) * 10 - 2;
  positions[i + 2] = (Math.random() - 0.5) * 20;
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particleMaterial = new THREE.PointsMaterial({ color: 0x00D4FF, size: 0.05 });
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Particle Burst for Button Clicks
let burstParticles = [];
function createParticleBurst(color) {
  const burstGeometry = new THREE.BufferGeometry();
  const burstCount = 50;
  const burstPositions = new Float32Array(burstCount * 3);
  for (let i = 0; i < burstCount * 3; i += 3) {
    burstPositions[i] = (Math.random() - 0.5) * 5;
    burstPositions[i + 1] = (Math.random() - 0.5) * 5;
    burstPositions[i + 2] = (Math.random() - 0.5) * 5;
  }
  burstGeometry.setAttribute('position', new THREE.BufferAttribute(burstPositions, 3));
  const burstMaterial = new THREE.PointsMaterial({ color: parseInt(color.replace('#', '0x')), size: 0.1 });
  const burst = new THREE.Points(burstGeometry, burstMaterial);
  scene.add(burst);
  burstParticles.push(burst);
  gsap.to(burst.position, { y: burst.position.y + 5, duration: 1, onComplete: () => scene.remove(burst) });
}

// Mouse Trail
const trailGeometry = new THREE.BufferGeometry();
const trailCount = 20;
const trailPositions = new Float32Array(trailCount * 3);
trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
const trailMaterial = new THREE.PointsMaterial({ color: 0xFF00FF, size: 0.05 });
const trail = new THREE.Points(trailGeometry, trailMaterial);
scene.add(trail);
let trailIndex = 0;

// Animation Loop
let rotationSpeed = 0.01;
function animate() {
  requestAnimationFrame(animate);
  if (currentObject) {
    currentObject.rotation.x += rotationSpeed;
    currentObject.rotation.y += rotationSpeed;
  }
  particles.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();

// Event Listeners
document.addEventListener('mousemove', (event) => {
  if (currentObject) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    gsap.to(currentObject.rotation, { x: mouseY * 0.5, y: mouseX * 0.5, duration: 1 });
    rotationSpeed = 0.02;
  }

  // Mouse Trail
  const positions = trail.geometry.attributes.position.array;
  positions[trailIndex * 3] = (event.clientX / window.innerWidth - 0.5) * 10;
  positions[trailIndex * 3 + 1] = -(event.clientY / window.innerHeight - 0.5) * 10;
  positions[trailIndex * 3 + 2] = 0;
  trail.geometry.attributes.position.needsUpdate = true;
  trailIndex = (trailIndex + 1) % trailCount;
});

document.addEventListener('click', () => {
  rotationSpeed = 0.05;
  gsap.to({ val: rotationSpeed }, { val: 0.01, duration: 1, onUpdate: function() { rotationSpeed = this.targets()[0].val; } });
});

window.addEventListener('scroll', () => {
  document.querySelectorAll('section.active .card').forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      gsap.to(card, { boxShadow: `0 8px 50px #00FF00`, borderColor: '#00FF00', duration: 0.5 });
    }
  });
});

// Resize Handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});