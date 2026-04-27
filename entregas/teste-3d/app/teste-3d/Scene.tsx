'use client';

import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useFrame, type ThreeElement } from '@react-three/fiber';
import {
  Environment,
  Float,
  MeshDistortMaterial,
  OrbitControls,
  Preload,
  Sparkles,
  shaderMaterial,
} from '@react-three/drei';

const WaveMaterial = shaderMaterial(
  { uTime: 0 },
  /* glsl */ `
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    void main() {
      vUv = uv;
      vec3 p = position;
      float w1 = sin(p.x * 4.0 + uTime) * 0.22;
      float w2 = cos(p.y * 4.0 + uTime * 1.3) * 0.22;
      float w3 = sin((p.x + p.y) * 2.0 + uTime * 0.7) * 0.12;
      p.z += w1 + w2 + w3;
      vWave = (w1 + w2 + w3);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }
  `,
  /* glsl */ `
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;

    // IQ procedural palette — https://iquilezles.org/articles/palettes/
    vec3 palette(float t) {
      vec3 a = vec3(0.5, 0.5, 0.5);
      vec3 b = vec3(0.5, 0.5, 0.5);
      vec3 c = vec3(1.0, 1.0, 1.0);
      vec3 d = vec3(0.00, 0.33, 0.67);
      return a + b * cos(6.28318 * (c * t + d));
    }

    void main() {
      float t = vUv.x + vUv.y * 0.6 + uTime * 0.15 + vWave * 1.4;
      vec3 col = palette(t);
      // ripple shimmer
      float shimmer = 0.5 + 0.5 * sin(vUv.x * 14.0 - uTime * 2.0);
      col *= mix(0.65, 1.15, shimmer);
      gl_FragColor = vec4(col, 1.0);
    }
  `
);

extend({ WaveMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    waveMaterial: ThreeElement<typeof WaveMaterial>;
  }
}

const ORB_PALETTE = [
  { color: '#ff3d8b', emissive: '#ff0066', position: [0, 0.6, 0] as const, scale: 1.0, speed: 1.6 },
  { color: '#22d3ee', emissive: '#00b8d4', position: [-1.8, 0.2, -0.4] as const, scale: 0.55, speed: 2.2 },
  { color: '#facc15', emissive: '#f59e0b', position: [1.7, 0.3, -0.2] as const, scale: 0.5, speed: 1.9 },
  { color: '#a855f7', emissive: '#7e22ce', position: [-1.0, 1.4, -0.8] as const, scale: 0.4, speed: 2.4 },
  { color: '#84cc16', emissive: '#65a30d', position: [1.1, 1.3, -0.7] as const, scale: 0.42, speed: 2.1 },
];

function ColorOrb({
  color,
  emissive,
  position,
  scale,
  speed,
}: (typeof ORB_PALETTE)[number]) {
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={0.9}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.55}
          distort={0.35}
          speed={2.2}
          roughness={0.15}
          metalness={0.25}
        />
      </mesh>
    </Float>
  );
}

function WavePlane() {
  const ref = useRef<THREE.ShaderMaterial & { uTime: number }>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.uTime += dt;
  });
  return (
    <mesh rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -1.6, 0]}>
      <planeGeometry args={[6, 6, 96, 96]} />
      <waveMaterial ref={ref} />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop="always"
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.6, 4.5], fov: 45 }}
    >
      <color attach="background" args={['#0a0118']} />
      <fog attach="fog" args={['#0a0118', 6, 14]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} color="#ffffff" />
      <pointLight position={[-4, 2, 2]} intensity={1.4} color="#ff3d8b" />
      <pointLight position={[4, -1, 2]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[0, 3, -3]} intensity={1.0} color="#facc15" />
      <pointLight position={[-3, -2, -2]} intensity={0.9} color="#a855f7" />

      <Suspense fallback={null}>
        {ORB_PALETTE.map((orb, i) => (
          <ColorOrb key={i} {...orb} />
        ))}
        <WavePlane />
        <Sparkles
          count={120}
          scale={[8, 5, 5]}
          size={3}
          speed={0.4}
          opacity={0.9}
          color="#ffffff"
        />
        <Environment preset="sunset" />
        <Preload all />
      </Suspense>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
}
