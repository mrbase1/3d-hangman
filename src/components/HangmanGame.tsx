import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface HangmanGameProps {
  mistakes: number;
  gameStatus: "playing" | "won" | "lost";
  resetConfetti?: boolean;
}

const HangmanGame: React.FC<HangmanGameProps> = ({
  mistakes,
  gameStatus,
  resetConfetti,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const hangmanPartsRef = useRef<THREE.Object3D[]>([]);
  const particleSystemRef = useRef<THREE.Points | null>(null);

  // Initialize the 3D scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a202c);
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 10);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
    );
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create gallows
    createGallows(scene);

    // Create hangman parts (initially hidden)
    hangmanPartsRef.current = createHangmanParts(scene);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current)
        return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
    };
  }, []);

  // Update hangman parts visibility based on mistakes
  useEffect(() => {
    hangmanPartsRef.current.forEach((part, index) => {
      if (part) {
        part.visible = index < mistakes;
      }
    });
  }, [mistakes]);

  // Handle game status changes
  useEffect(() => {
    if (!sceneRef.current) return;

    // Add celebration particles when the game is won
    if (gameStatus === "won" && !particleSystemRef.current) {
      particleSystemRef.current = createCelebrationParticles(sceneRef.current);
    }

    // Make the hangman red when the game is lost
    if (gameStatus === "lost") {
      hangmanPartsRef.current.forEach((part) => {
        if (
          part &&
          part instanceof THREE.Mesh &&
          part.material instanceof THREE.MeshStandardMaterial
        ) {
          part.material.color.set(0xff0000);
          part.material.emissive.set(0x330000);
        }
      });
    }
  }, [gameStatus]);

  // Reset confetti when starting a new game
  useEffect(() => {
    if (resetConfetti && particleSystemRef.current && sceneRef.current) {
      sceneRef.current.remove(particleSystemRef.current);
      particleSystemRef.current = null;

      // Reset hangman color
      hangmanPartsRef.current.forEach((part) => {
        if (
          part &&
          part instanceof THREE.Mesh &&
          part.material instanceof THREE.MeshStandardMaterial
        ) {
          part.material.color.set(0x2c3e50);
          part.material.emissive.set(0x000000);
        }
      });
    }
  }, [resetConfetti]);

  return (
    <div ref={containerRef} className="w-full h-full" data-oid="ykwb5a-" />
  );
};

// Create the gallows structure
function createGallows(scene: THREE.Scene) {
  const material = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
    roughness: 0.7,
    metalness: 0.1,
  });

  // Base
  const baseGeometry = new THREE.BoxGeometry(6, 0.5, 2);
  const base = new THREE.Mesh(baseGeometry, material);
  base.position.y = -4;
  scene.add(base);

  // Vertical pole
  const poleGeometry = new THREE.BoxGeometry(0.5, 8, 0.5);
  const pole = new THREE.Mesh(poleGeometry, material);
  pole.position.set(-2.5, -0.25, 0);
  scene.add(pole);

  // Horizontal beam
  const beamGeometry = new THREE.BoxGeometry(4, 0.5, 0.5);
  const beam = new THREE.Mesh(beamGeometry, material);
  beam.position.set(-0.5, 3.75, 0);
  scene.add(beam);

  // Support beam
  const supportGeometry = new THREE.BoxGeometry(3, 0.5, 0.5);
  const support = new THREE.Mesh(supportGeometry, material);
  support.position.set(-1.5, 2.5, 0);
  support.rotation.z = Math.PI / 4;
  scene.add(support);

  // Rope
  const ropeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
  const rope = new THREE.Mesh(
    ropeGeometry,
    new THREE.MeshStandardMaterial({ color: 0xcccccc }),
  );
  rope.position.set(1.5, 3.25, 0);
  scene.add(rope);
}

// Create the hangman body parts (initially hidden)
function createHangmanParts(scene: THREE.Scene): THREE.Object3D[] {
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x2c3e50,
    roughness: 0.5,
    metalness: 0.1,
  });

  // Head
  const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const head = new THREE.Mesh(headGeometry, bodyMaterial);
  head.position.set(1.5, 2.5, 0);
  head.visible = false;
  scene.add(head);

  // Body
  const bodyGeometry = new THREE.CylinderGeometry(0.25, 0.25, 1.5, 16);
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.set(1.5, 1.25, 0);
  body.visible = false;
  scene.add(body);

  // Left arm
  const leftArmGeometry = new THREE.BoxGeometry(0.2, 1, 0.2);
  const leftArm = new THREE.Mesh(leftArmGeometry, bodyMaterial);
  leftArm.position.set(1, 1.25, 0);
  leftArm.rotation.z = Math.PI / 4;
  leftArm.visible = false;
  scene.add(leftArm);

  // Right arm
  const rightArmGeometry = new THREE.BoxGeometry(0.2, 1, 0.2);
  const rightArm = new THREE.Mesh(rightArmGeometry, bodyMaterial);
  rightArm.position.set(2, 1.25, 0);
  rightArm.rotation.z = -Math.PI / 4;
  rightArm.visible = false;
  scene.add(rightArm);

  // Left leg
  const leftLegGeometry = new THREE.BoxGeometry(0.2, 1.2, 0.2);
  const leftLeg = new THREE.Mesh(leftLegGeometry, bodyMaterial);
  leftLeg.position.set(1.25, 0, 0);
  leftLeg.rotation.z = Math.PI / 8;
  leftLeg.visible = false;
  scene.add(leftLeg);

  // Right leg
  const rightLegGeometry = new THREE.BoxGeometry(0.2, 1.2, 0.2);
  const rightLeg = new THREE.Mesh(rightLegGeometry, bodyMaterial);
  rightLeg.position.set(1.75, 0, 0);
  rightLeg.rotation.z = -Math.PI / 8;
  rightLeg.visible = false;
  scene.add(rightLeg);

  return [head, body, leftArm, rightArm, leftLeg, rightLeg];
}

// Create celebration particles when the game is won
function createCelebrationParticles(scene: THREE.Scene): THREE.Points {
  const particleCount = 200;
  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    // Random positions in a sphere around the hangman
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;

    // Random colors
    colors[i] = Math.random();
    colors[i + 1] = Math.random();
    colors[i + 2] = Math.random();
  }

  particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
  });

  const particleSystem = new THREE.Points(particles, particleMaterial);
  scene.add(particleSystem);

  // Animate particles
  const animate = () => {
    if (!particleSystem.parent) return; // Stop animation if removed from scene

    const positions = particles.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += (Math.random() - 0.5) * 0.05;
      positions[i + 1] += (Math.random() - 0.5) * 0.05;
      positions[i + 2] += (Math.random() - 0.5) * 0.05;
    }

    particles.attributes.position.needsUpdate = true;

    requestAnimationFrame(animate);
  };

  animate();

  return particleSystem;
}

export default HangmanGame;
