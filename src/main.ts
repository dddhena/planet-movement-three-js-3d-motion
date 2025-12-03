import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000011)

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 80, 160)

// Renderer with enhanced settings
const renderer = new THREE.WebGLRenderer({ 
  antialias: true,
  powerPreference: "high-performance"
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
document.body.appendChild(renderer.domElement)

// Add CSS for modern styling with improved visibility
const style = document.createElement('style')
style.innerHTML = `
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(45deg, #0c0c2e, #1a1a3e);
  }
  
  #ui-container {
    position: absolute;
    top: 20px;
    left: 20px;
    color: white;
    z-index: 100;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(20, 20, 40, 0.9));
    padding: 25px;
    border-radius: 20px;
    backdrop-filter: blur(15px);
    border: 1px solid rgba(100, 100, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    min-width: 280px;
  }
  
  #title {
    font-size: 28px;
    margin-bottom: 20px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    font-weight: 700;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
  
  .control-group {
    margin: 15px 0;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    color: #e0e0ff;
    font-weight: 600;
    font-size: 14px;
  }
  
  button {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
    border: 1px solid rgba(100, 150, 255, 0.3);
    color: white;
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    width: 100%;
    backdrop-filter: blur(10px);
  }
  
  select {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(30, 30, 60, 0.8));
    border: 1px solid rgba(100, 150, 255, 0.3);
    color: #ffffff;
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    width: 100%;
    backdrop-filter: blur(10px);
  }
  
  select option {
    background: #1a1a3e;
    color: #ffffff;
    padding: 10px;
    border: none;
  }
  
  select:hover, button:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15));
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(100, 150, 255, 0.2);
    border-color: rgba(100, 200, 255, 0.5);
  }
  
  select:focus, button:focus {
    outline: none;
    border-color: #4ecdc4;
    box-shadow: 0 0 0 2px rgba(78, 205, 196, 0.3);
  }
  
  button.active {
    background: linear-gradient(135deg, rgba(78, 205, 196, 0.3), rgba(78, 205, 196, 0.1));
    border-color: #4ecdc4;
    color: #4ecdc4;
  }
  
  #info-panel {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(20, 20, 40, 0.9));
    padding: 20px;
    border-radius: 15px;
    backdrop-filter: blur(15px);
    border: 1px solid rgba(100, 100, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    max-width: 320px;
    color: white;
  }
  
  .panel-title {
    font-size: 18px;
    margin-bottom: 12px;
    background: linear-gradient(45deg, #4ecdc4, #45b7d1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
  }
  
  .planet-info {
    margin: 8px 0;
    font-size: 14px;
    line-height: 1.5;
    color: #e0e0ff;
  }
  
  #current-planet {
    font-weight: 600;
    color: #4ecdc4;
    margin-top: 10px;
    padding: 8px;
    background: rgba(78, 205, 196, 0.1);
    border-radius: 6px;
    border-left: 3px solid #4ecdc4;
  }
  
  .loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 20px;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.8);
    padding: 20px 30px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
  }
  
  .decoration {
    position: absolute;
    pointer-events: none;
    z-index: 1;
  }
  
  .floating-element {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(5deg); }
  }
  
  .pulse {
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  #instructions {
    position: absolute;
    bottom: 20px;
    left: 20px;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(20, 20, 40, 0.8));
    padding: 15px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(100, 100, 255, 0.2);
    color: #e0e0ff;
    font-size: 12px;
    max-width: 250px;
  }
  
  .instruction-item {
    margin: 5px 0;
    display: flex;
    align-items: center;
  }
  
  .instruction-icon {
    margin-right: 8px;
    font-size: 14px;
  }
`
document.head.appendChild(style)

// Add floating decorative elements
function createDecorations() {
  const decorations = [
    { emoji: '✨', left: '5%', top: '15%' },
    { emoji: '🌟', left: '95%', top: '25%' },
    { emoji: '💫', left: '10%', top: '85%' },
    { emoji: '⭐', left: '90%', top: '75%' },
    { emoji: '🔭', left: '85%', top: '15%' },
    { emoji: '🚀', left: '15%', top: '75%' }
  ]
  
  decorations.forEach((dec, index) => {
    const element = document.createElement('div')
    element.className = `decoration floating-element ${index % 2 === 0 ? 'pulse' : ''}`
    element.innerHTML = dec.emoji
    element.style.left = dec.left
    element.style.top = dec.top
    element.style.fontSize = `${24 + index * 4}px`
    element.style.animationDelay = `${index * 0.5}s`
    document.body.appendChild(element)
  })
}

createDecorations()

// Create UI
const uiContainer = document.createElement('div')
uiContainer.id = 'ui-container'
uiContainer.innerHTML = `
  <div id="title">🌌 Solar System Explorer</div>
  <div class="control-group">
    <label for="speedControl">⚡ Animation Speed</label>
    <select id="speedControl">
      <option value="0.5">Slow Motion</option>
      <option value="1" selected>Normal Speed</option>
      <option value="2">Fast Forward</option>
      <option value="5">Ludicrous Speed!</option>
    </select>
  </div>
  <div class="control-group">
    <label for="viewControl">👁️ View Mode</label>
    <select id="viewControl">
      <option value="free" selected>Free Exploration</option>
      <option value="mercury">🌑 Mercury</option>
      <option value="venus">♀️ Venus</option>
      <option value="earth">🌍 Earth</option>
      <option value="mars">♂️ Mars</option>
      <option value="jupiter">♃ Jupiter</option>
      <option value="saturn">♄ Saturn</option>
      <option value="uranus">♅ Uranus</option>
      <option value="neptune">♆ Neptune</option>
      <option value="sun">☀️ Sun</option>
    </select>
  </div>
  <div class="control-group">
    <button id="toggleOrbits">🔄 Hide Orbits</button>
    <button id="toggleStars">⭐ Hide Stars</button>
  </div>
  <div class="control-group">
    <button id="toggleLabels">🏷️ Show Planet Labels</button>
  </div>
`
document.body.appendChild(uiContainer)

// Instructions panel
const instructions = document.createElement('div')
instructions.id = 'instructions'
instructions.innerHTML = `
  <div style="margin-bottom: 10px; font-weight: bold; color: #4ecdc4;">Controls</div>
  <div class="instruction-item">
    <span class="instruction-icon">🖱️</span>
    <span>Drag to rotate view</span>
  </div>
  <div class="instruction-item">
    <span class="instruction-icon">🎯</span>
    <span>Scroll to zoom</span>
  </div>
  <div class="instruction-item">
    <span class="instruction-icon">✨</span>
    <span>Hover planets for info</span>
  </div>
`
document.body.appendChild(instructions)

// Info panel
const infoPanel = document.createElement('div')
infoPanel.id = 'info-panel'
infoPanel.innerHTML = `
  <div class="panel-title">📡 Planet Information</div>
  <div class="planet-info">Hover over any planet to discover fascinating facts about our solar system!</div>
  <div class="planet-info" id="current-planet">Currently viewing: Free exploration mode</div>
`
document.body.appendChild(infoPanel)

// Texture loader with loading manager
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
  const loadingDiv = document.createElement('div')
  loadingDiv.className = 'loading'
  loadingDiv.textContent = '🚀 Loading cosmic textures...'
  document.body.appendChild(loadingDiv)
}
loadingManager.onLoad = () => {
  const loadingDiv = document.querySelector('.loading')
  if (loadingDiv) loadingDiv.remove()
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const sunTexture = textureLoader.load('/textures/sun.jpg')
const earthTexture = textureLoader.load('/textures/earth.webp')
const marsTexture = textureLoader.load('/textures/mars.jpg')
const mercuryTexture = textureLoader.load('/textures/mercury.webp')
const venusTexture = textureLoader.load('/textures/venus.webp')
const jupiterTexture = textureLoader.load('/textures/jupiter.webp')
const saturnTexture = textureLoader.load('/textures/saturn.webp')
const uranusTexture = textureLoader.load('/textures/uranus.webp')
const neptuneTexture = textureLoader.load('/textures/neptune.webp')

// Create enhanced starfield with different star sizes
function createStarfield(): THREE.Points {
  const starGeometry = new THREE.BufferGeometry()
  
  const starVertices: number[] = []
  const starSizes: number[] = []
  
  for (let i = 0; i < 20000; i++) {
    const x = (Math.random() - 0.5) * 3000
    const y = (Math.random() - 0.5) * 3000
    const z = (Math.random() - 0.5) * 3000
    starVertices.push(x, y, z)
    starSizes.push(Math.random() * 1.5 + 0.1)
  }

  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))
  starGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1))
  
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8
  })
  
  return new THREE.Points(starGeometry, starMaterial)
}

const stars = createStarfield()
scene.add(stars)

// Sun with enhanced glow effect
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(5, 64, 64),
  new THREE.MeshBasicMaterial({ 
    map: sunTexture,
    toneMapped: false
  })
)
scene.add(sun)

// Add sun glow effect
const sunGlowGeometry = new THREE.SphereGeometry(5.5, 32, 32)
const sunGlowMaterial = new THREE.MeshBasicMaterial({
  color: 0xff4500,
  transparent: true,
  opacity: 0.3,
  side: THREE.BackSide
})
const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial)
sun.add(sunGlow)

// Create a simple character sitting on the sun
function createCharacter(): THREE.Group {
  const character = new THREE.Group()
  
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0x4ECDC4 })
  )
  character.add(body)
  
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xFFE66D })
  )
  head.position.y = 0.5
  character.add(head)
  
  const leftArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8),
    new THREE.MeshBasicMaterial({ color: 0x4ECDC4 })
  )
  leftArm.position.set(0.3, 0.2, 0)
  leftArm.rotation.z = Math.PI / 4
  character.add(leftArm)
  
  const rightArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8),
    new THREE.MeshBasicMaterial({ color: 0x4ECDC4 })
  )
  rightArm.position.set(-0.3, 0.2, 0)
  rightArm.rotation.z = -Math.PI / 4
  character.add(rightArm)
  
  character.position.y = 5.5
  character.rotation.x = Math.PI / 6
  
  return character
}

const character = createCharacter()
sun.add(character)

// Planets creation with enhanced materials
const mercury = new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 32), new THREE.MeshPhongMaterial({ 
  map: mercuryTexture,
  shininess: 30 
}))
const venus = new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 32), new THREE.MeshPhongMaterial({ 
  map: venusTexture,
  shininess: 50 
}))
const earth = new THREE.Mesh(new THREE.SphereGeometry(1.3, 32, 32), new THREE.MeshPhongMaterial({ 
  map: earthTexture,
  shininess: 40 
}))
const mars = new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 32), new THREE.MeshPhongMaterial({ 
  map: marsTexture,
  shininess: 25 
}))
const jupiter = new THREE.Mesh(new THREE.SphereGeometry(2.8, 32, 32), new THREE.MeshPhongMaterial({ 
  map: jupiterTexture,
  shininess: 60 
}))
const saturn = new THREE.Mesh(new THREE.SphereGeometry(2.4, 32, 32), new THREE.MeshPhongMaterial({ 
  map: saturnTexture,
  shininess: 55 
}))
const uranus = new THREE.Mesh(new THREE.SphereGeometry(1.8, 32, 32), new THREE.MeshPhongMaterial({ 
  map: uranusTexture,
  shininess: 45 
}))
const neptune = new THREE.Mesh(new THREE.SphereGeometry(1.7, 32, 32), new THREE.MeshPhongMaterial({ 
  map: neptuneTexture,
  shininess: 45 
}))

const planets = { mercury, venus, earth, mars, jupiter, saturn, uranus, neptune }
Object.values(planets).forEach(planet => {
  planet.castShadow = true
  scene.add(planet)
})

// Create planet labels
const planetLabels: THREE.Sprite[] = []
function createPlanetLabel(text: string, planet: THREE.Mesh): THREE.Sprite {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!
  canvas.width = 256
  canvas.height = 64
  
  // Draw label background
  context.fillStyle = 'rgba(0, 0, 0, 0.8)'
  context.fillRect(0, 0, canvas.width, canvas.height)
  
  // Draw text
  context.font = 'bold 24px Arial'
  context.fillStyle = 'white'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(text, canvas.width / 2, canvas.height / 2)
  
  const texture = new THREE.CanvasTexture(canvas)
  const material = new THREE.SpriteMaterial({ 
    map: texture,
    transparent: true,
    opacity: 0.8
  })
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(4, 1, 1)
  sprite.position.copy(planet.position)
  sprite.position.y += 2
  sprite.visible = false // Start hidden
  
  return sprite
}

// Add labels to planets
Object.entries(planets).forEach(([name, planet]) => {
  const label = createPlanetLabel(name.charAt(0).toUpperCase() + name.slice(1), planet)
  planetLabels.push(label)
  scene.add(label)
})

// Enhanced rings
const saturnRing = new THREE.Mesh(
  new THREE.RingGeometry(3, 4.5, 64), 
  new THREE.MeshBasicMaterial({ 
    color: 0xdddddd, 
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
  })
)
saturnRing.rotation.x = Math.PI / 2
saturn.add(saturnRing)

const uranusRing = new THREE.Mesh(
  new THREE.RingGeometry(2.2, 2.5, 64), 
  new THREE.MeshBasicMaterial({ 
    color: 0xaaaaaa, 
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.4
  })
)
uranusRing.rotation.x = Math.PI / 2
uranus.add(uranusRing)

// Enhanced lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 2, 500)
pointLight.position.set(0, 0, 0)
scene.add(pointLight)

const coloredLight1 = new THREE.PointLight(0x4ecdc4, 0.5, 200)
coloredLight1.position.set(30, 20, 30)
scene.add(coloredLight1)

const coloredLight2 = new THREE.PointLight(0xff6b6b, 0.3, 200)
coloredLight2.position.set(-30, -20, -30)
scene.add(coloredLight2)

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.minDistance = 10
controls.maxDistance = 400

// Orbit creation
const orbits: THREE.LineLoop[] = []
function createOrbit(radius: number, color: number): void {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0)
  const points = curve.getPoints(150)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({ 
    color, 
    transparent: true, 
    opacity: 0.4
  })
  const orbit = new THREE.LineLoop(geometry, material)
  orbit.rotation.x = Math.PI / 2
  scene.add(orbit)
  orbits.push(orbit)
}

createOrbit(8, 0x888888)    // Mercury
createOrbit(12, 0xffaa33)   // Venus
createOrbit(16, 0x44ff44)   // Earth
createOrbit(20, 0xff6644)   // Mars
createOrbit(28, 0xffaa66)   // Jupiter
createOrbit(36, 0xdddddd)   // Saturn
createOrbit(42, 0x66ccff)   // Uranus
createOrbit(48, 0x4466ff)   // Neptune

// UI State
let animationSpeed = 1
let orbitsVisible = true
let starsVisible = true
let labelsVisible = false

// UI Event Handlers - FIXED FUNCTIONALITY
document.getElementById('speedControl')!.addEventListener('change', (e) => {
  animationSpeed = parseFloat((e.target as HTMLSelectElement).value)
})

document.getElementById('viewControl')!.addEventListener('change', (e) => {
  const view = (e.target as HTMLSelectElement).value
  const planetPositions = {
    mercury: [8, 5, 8], venus: [12, 5, 12], earth: [16, 5, 16], mars: [20, 5, 20],
    jupiter: [28, 8, 28], saturn: [36, 8, 36], uranus: [42, 8, 42], neptune: [48, 8, 48],
    sun: [0, 15, 25]
  }
  
  if (view !== 'free') {
    const [x, y, z] = planetPositions[view as keyof typeof planetPositions]
    camera.position.set(x, y, z)
    controls.target.set(0, 0, 0)
    document.getElementById('current-planet')!.textContent = `Currently viewing: ${view.charAt(0).toUpperCase() + view.slice(1)}`
  } else {
    document.getElementById('current-planet')!.textContent = 'Currently viewing: Free exploration mode'
  }
})

// Toggle Orbits Button - FIXED
document.getElementById('toggleOrbits')!.addEventListener('click', () => {
  orbitsVisible = !orbitsVisible
  orbits.forEach(orbit => orbit.visible = orbitsVisible)
  
  const button = document.getElementById('toggleOrbits')!
  if (orbitsVisible) {
    button.textContent = '🔄 Hide Orbits'
    button.classList.remove('active')
  } else {
    button.textContent = '🔄 Show Orbits'
    button.classList.add('active')
  }
})

// Toggle Stars Button - FIXED
document.getElementById('toggleStars')!.addEventListener('click', () => {
  starsVisible = !starsVisible
  stars.visible = starsVisible
  
  const button = document.getElementById('toggleStars')!
  if (starsVisible) {
    button.textContent = '⭐ Hide Stars'
    button.classList.remove('active')
  } else {
    button.textContent = '⭐ Show Stars'
    button.classList.add('active')
  }
})

// Toggle Labels Button - FIXED
document.getElementById('toggleLabels')!.addEventListener('click', () => {
  labelsVisible = !labelsVisible
  planetLabels.forEach(label => label.visible = labelsVisible)
  
  const button = document.getElementById('toggleLabels')!
  if (labelsVisible) {
    button.textContent = '🏷️ Hide Planet Labels'
    button.classList.add('active')
  } else {
    button.textContent = '🏷️ Show Planet Labels'
    button.classList.remove('active')
  }
})

// Enhanced planet interaction
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

function onMouseMove(event: MouseEvent) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}

window.addEventListener('mousemove', onMouseMove)

// Enhanced planet information data
const planetInfo = {
  mercury: "Mercury: The smallest and innermost planet. No atmosphere, extreme temperatures!",
  venus: "Venus: Hottest planet with thick clouds of sulfuric acid. A runaway greenhouse effect.",
  earth: "Earth: Our beautiful blue marble. The only known planet with life and liquid water.",
  mars: "Mars: The Red Planet. Home to Olympus Mons, the solar system's largest volcano.",
  jupiter: "Jupiter: King of planets! A gas giant with a Great Red Spot storm larger than Earth.",
  saturn: "Saturn: The ringed beauty. Has the most extensive ring system in our solar system.",
  uranus: "Uranus: An ice giant that rotates on its side. Unique tilt causes extreme seasons.",
  neptune: "Neptune: The windiest planet! Supersonic winds and a deep blue atmosphere."
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// Enhanced animation with smooth transitions
function animate(): void {
  requestAnimationFrame(animate)

  const time = Date.now() * 0.001 * animationSpeed

  // Sun and character animation
  sun.rotation.y += 0.005 * animationSpeed
  character.rotation.y += 0.01 * animationSpeed
  character.position.y = 5.5 + Math.sin(time * 2) * 0.2

  // Planet positions with slight vertical variation
  mercury.position.set(Math.cos(time * 4) * 8, Math.sin(time * 8) * 0.3, Math.sin(time * 4) * 8)
  venus.position.set(Math.cos(time * 3) * 12, Math.sin(time * 6) * 0.4, Math.sin(time * 3) * 12)
  earth.position.set(Math.cos(time * 2) * 16, Math.sin(time * 4) * 0.5, Math.sin(time * 2) * 16)
  mars.position.set(Math.cos(time * 1.5) * 20, Math.sin(time * 3) * 0.4, Math.sin(time * 1.5) * 20)
  jupiter.position.set(Math.cos(time * 0.8) * 28, Math.sin(time * 1.6) * 0.6, Math.sin(time * 0.8) * 28)
  saturn.position.set(Math.cos(time * 0.6) * 36, Math.sin(time * 1.2) * 0.5, Math.sin(time * 0.6) * 36)
  uranus.position.set(Math.cos(time * 0.4) * 42, Math.sin(time * 0.8) * 0.4, Math.sin(time * 0.4) * 42)
  neptune.position.set(Math.cos(time * 0.3) * 48, Math.sin(time * 0.6) * 0.3, Math.sin(time * 0.3) * 48)

  // Update planet labels positions
  if (labelsVisible) {
    Object.entries(planets).forEach(([name, planet], index) => {
      const label = planetLabels[index]
      label.position.copy(planet.position)
      label.position.y += 2
    })
  }

  // Planet rotations
  mercury.rotation.y += 0.004 * animationSpeed
  venus.rotation.y += 0.002 * animationSpeed
  earth.rotation.y += 0.01 * animationSpeed
  mars.rotation.y += 0.008 * animationSpeed
  jupiter.rotation.y += 0.015 * animationSpeed
  saturn.rotation.y += 0.012 * animationSpeed
  uranus.rotation.y += 0.009 * animationSpeed
  neptune.rotation.y += 0.008 * animationSpeed

  // Planet interaction with enhanced feedback
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(Object.values(planets))
  
  if (intersects.length > 0) {
    const planet = intersects[0].object
    const planetName = Object.keys(planets).find(key => planets[key as keyof typeof planets] === planet)
    if (planetName) {
      document.getElementById('current-planet')!.textContent = `Currently viewing: ${planetName.charAt(0).toUpperCase() + planetName.slice(1)}`
      document.querySelector('.planet-info')!.textContent = planetInfo[planetName as keyof typeof planetInfo]
    }
  }

  controls.update()
  renderer.render(scene, camera)
}

// Add initial camera animation
camera.position.set(0, 100, 200)
setTimeout(() => {
  camera.position.set(0, 80, 160)
}, 1000)

animate()