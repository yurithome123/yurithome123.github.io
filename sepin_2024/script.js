import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

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

// Variáveis para armazenar os modelos
let currentModel = null;
let model1 = null;
let model2 = null;
let isFirstModel = true;

// Variável para controlar o carregamento
let modelsLoaded = 0;
const totalModels = 2;

// Função para verificar se todos os modelos foram carregados
function checkAllModelsLoaded() {
  modelsLoaded++;
  if (modelsLoaded === totalModels) {
    // Todos os modelos carregados, animar e esconder tela de loading
    setTimeout(() => {
      const lockHook = document.querySelector('.lock-hook');
      const lockContainer = document.querySelector('.lock-container');
      lockHook.classList.add('opening');
      lockContainer.classList.add('opening');
      
      setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
      }, 1000);
    }, 1000);
  }
}

// Função para carregar modelo
function loadModel(url, callback) {
  const loader = new GLTFLoader();
  loader.load(url, (gltf) => {
    const model = gltf.scene;
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    callback(model);
  }, undefined, (error) => {
    console.error('Erro ao carregar o modelo:', error);
  });
}

// Carregar ambos os modelos
loadModel('modelo/modelo.glb', (loadedModel) => {
  model1 = loadedModel;
  currentModel = model1;
  pivot.add(currentModel);
  checkAllModelsLoaded();
});

loadModel('modelo/modelo2.glb', (loadedModel) => {
  model2 = loadedModel;
  model2.visible = false;
  pivot.add(model2);
  
  // Configurar controles e câmera
  controls.target.set(0, 0, 0);
  controls.update();
  camera.position.set(0, 40, 50);
  
  checkAllModelsLoaded();
});

// Adicionar evento para alternar modelos
document.getElementById('toggle-model').addEventListener('click', () => {
  isFirstModel = !isFirstModel;
  
  // Fade out
  if (currentModel) {
    currentModel.traverse((child) => {
      if (child.isMesh) {
        child.material.transparent = true;
        child.material.opacity = 0;
      }
    });
  }
  
  // Trocar modelos
  setTimeout(() => {
    if (isFirstModel) {
      model2.visible = false;
      model1.visible = true;
      currentModel = model1;
    } else {
      model1.visible = false;
      model2.visible = true;
      currentModel = model2;
    }
    
    // Fade in
    currentModel.traverse((child) => {
      if (child.isMesh) {
        child.material.transparent = true;
        child.material.opacity = 1;
      }
    });
  }, 500);

  const button = document.getElementById('toggle-model');
  button.textContent = isFirstModel ? 'Modelo Aberto' : 'Modelo Fechado';
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
    siteThemeButton.textContent = 'Site: Modo Escuro';
  } else {
    document.documentElement.style.setProperty('--background-color', '#fff');
    document.documentElement.style.setProperty('--text-color', '#000');
    document.documentElement.style.setProperty('--primary-color', '#007bff');
    document.documentElement.style.setProperty('--secondary-color', '#0056b3');
    document.documentElement.style.setProperty('--container-bg', '#f0f0f0');
    siteThemeButton.textContent = 'Site: Modo Claro';
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
