'use client';

import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useFrame, type ThreeElement } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, OrbitControls, Preload, shaderMaterial } from '@react-three/drei';

const WaveMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color('#6366f1') },
  /* glsl */ `
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vUv = uv;
      vec3 p = position;
      p.z += sin(p.x * 4.0 + uTime) * 0.18;
      p.z += cos(p.y * 4.0 + uTime * 1.3) * 0.18;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }
  `,
  /* glsl */ `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;
    void main() {
      float w = 0.5 + 0.5 * sin(vUv.x * 8.0 + uTime);
      float v = 0.5 + 0.5 * cos(vUv.y * 8.0 - uTime * 1.2);
      vec3 col = uColor * mix(0.4, 1.0, w * v);
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

function FloatingOrb() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial color="#6366f1" distort={0.3} speed={2} roughness={0.1} />
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
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -3, -3]} intensity={0.8} color="#8b5cf6" />
      <Suspense fallback={null}>
        <FloatingOrb />
        <WavePlane />
        <Environment preset="city" />
        <Preload all />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
