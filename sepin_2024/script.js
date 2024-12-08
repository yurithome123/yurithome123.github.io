// Configurar cena, câmera e renderizador
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // funcionando
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.6);
document.getElementById('container').appendChild(renderer.domElement);

// Adicionar luz
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
light.position.set(0, 200, 0);
scene.add(light);

// Criar um objeto pivot
const pivot = new THREE.Object3D();
scene.add(pivot);

// Variável para armazenar o modelo
let model;

// Carregar o modelo (GLB/GLTF)
const loader = new GLTFLoader();
loader.load('modelo/modelo.glb', (gltf) => {
  model = gltf.scene;
  
  // Calcular o bounding box para obter o centro do modelo
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  
  // Ajustar a posição do modelo para que fique centrado na origem
  model.position.sub(center);
  
  // Adicionar o modelo ao pivot
  pivot.add(model);
  
  // Definir o alvo dos controles para a origem
  controls.target.set(0, 0, 0);
  controls.update();
  
  // Posicionar a câmera em um deslocamento da origem
  camera.position.set(0, 40, 50);
}, undefined, (error) => {
  console.error('Erro ao carregar o modelo:', error);
});

// Posicionar a câmera
// camera.position.set(50, 20, 10);

// Adicionar controle de órbita para interação
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Variável para controlar a rotação
let isRotating = false;

// Botão para alternar a rotação
document.getElementById('toggle-rotation').addEventListener('click', () => {
  isRotating = !isRotating;
  const button = document.getElementById('toggle-rotation');
  button.textContent = isRotating ? 'Parar Rotação' : 'Iniciar Rotação';
});

// Theme states
let isModelDark = true;
let isSiteDark = true;

// Get theme toggle buttons
const modelThemeButton = document.getElementById('toggle-model-theme');
const siteThemeButton = document.getElementById('toggle-site-theme');

// Toggle model theme
modelThemeButton.addEventListener('click', () => {
  isModelDark = !isModelDark;
  scene.background = new THREE.Color(isModelDark ? 0xffffff : 0x0e0e0e);
  modelThemeButton.textContent = isModelDark ? 'Modelo: Modo Claro' : 'Modelo: Modo Escuro';
  
  // Add fade effect to container
  const container = document.getElementById('container');
  container.classList.remove('fade');
  void container.offsetWidth; // Trigger reflow
  container.classList.add('fade');
});

// Toggle site theme
siteThemeButton.addEventListener('click', () => {
  isSiteDark = !isSiteDark;
  
  // Add fade effect to body
  document.body.classList.remove('fade');
  void document.body.offsetWidth; // Trigger reflow
  document.body.classList.add('fade');

  if (isSiteDark) {
    document.documentElement.style.setProperty('--background-color', '#0e0e0e');
    document.documentElement.style.setProperty('--text-color', '#fff');
    document.documentElement.style.setProperty('--primary-color', '#0ff');
    document.documentElement.style.setProperty('--secondary-color', '#00f');
    document.documentElement.style.setProperty('--container-bg', '#1a1a1a');
    siteThemeButton.textContent = 'Site: Modo Claro';
  } else {
    document.documentElement.style.setProperty('--background-color', '#fff');
    document.documentElement.style.setProperty('--text-color', '#000');
    document.documentElement.style.setProperty('--primary-color', '#007bff');
    document.documentElement.style.setProperty('--secondary-color', '#0056b3');
    document.documentElement.style.setProperty('--container-bg', '#f0f0f0');
    siteThemeButton.textContent = 'Site: Modo Escuro';
  }
});

// Função de animação
function animate() {
  requestAnimationFrame(animate);
  
  if (isRotating) {
    pivot.rotation.y += 0.01;
  }
  
  controls.update();
  renderer.render(scene, camera);
}

animate();
