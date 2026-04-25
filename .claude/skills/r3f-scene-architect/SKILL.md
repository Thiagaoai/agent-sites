---
name: r3f-scene-architect
description: Build React Three Fiber 3D scenes from scratch — Canvas setup, Suspense, loading states, camera, lighting, environment. Activate when building a 3D scene purely via code.
---

# r3f-scene-architect

## WHEN TO USE
- Building a hero 3D object for a landing page (floating geometry, distorted material, animated mesh) where the visual is generated entirely in code rather than imported from a 3D file.
- Adding a 3D viewport to a section (product configurator, abstract background, interactive scene) and you need the canonical Canvas + Suspense + Environment + lighting boilerplate.
- Bootstrapping any new React Three Fiber scene in a Next.js App Router project — including SSR-safe dynamic import, frameloop tuning, and DPR clamp.

## INSTALLATION
```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

## CANONICAL CANVAS (Next.js App Router)
```tsx
'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Preload, OrbitControls } from '@react-three/drei';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

export default function Hero3D() {
  return (
    <div className="h-screen w-full bg-black">
      <Canvas
        dpr={[1, 1.5]}
        frameloop="demand"
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <Suspense fallback={null}>
          <Scene />
          <Environment preset="studio" />
          <Preload all />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
```

## FLOATING HERO OBJECT PATTERN
```tsx
import { Float, MeshDistortMaterial } from '@react-three/drei';

export function FloatingOrb() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#6366f1"
          distort={0.3}
          speed={2}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}
```

## LIGHTING SETUP
```tsx
<ambientLight intensity={0.4} />
<directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
<pointLight position={[-5, -5, -5]} intensity={0.6} color="#6366f1" />
<Environment preset="studio" />
```
Pair `Environment` with at least one direct light for highlights. Avoid `castShadow` on more than one light per scene — shadow maps are expensive.

## DREI ESSENTIALS (most-used imports)
- `OrbitControls` — debug camera (disable zoom/pan in production heroes)
- `Environment` — IBL via HDRI presets: `studio`, `city`, `sunset`, `dawn`, `night`, `warehouse`, `forest`, `apartment`, `park`, `lobby`
- `Float` — passive floating motion (no `useFrame` needed)
- `Text3D` + `Center` — extruded 3D typography
- `useGLTF` — load GLB/GLTF (cache automatic)
- `Preload` — warm GPU once everything is loaded
- `Detailed` — LOD wrapper for geometry swapping by distance
- `MeshDistortMaterial` — animated noise distortion on a mesh
- `MeshTransmissionMaterial` — glass / refractive material

## RULES
- **Always `dynamic()` import in Next.js** — Three.js touches `window` and breaks SSR.
- **Always wrap in `<Suspense>`** — `useGLTF`, `Environment`, and texture loaders all suspend.
- **Always `dpr={[1, 1.5]}`** — uncapped DPR melts retina displays.
- **Always `frameloop="demand"`** for static scenes — only render when something changes. Use `invalidate()` when you mutate state outside `useFrame`.
- **`gl={{ antialias: false }}`** by default — postprocessing chains do MSAA themselves; native antialias doubles cost.
- **`'use client'` directive** at the top of any component using R3F.
- **Never** put the `<Canvas>` itself inside a Suspense fallback path — wrap children, not the Canvas.

## TROUBLESHOOTING
- Black screen on load → missing `Environment` or all lights at intensity 0.
- Hydration mismatch → forgot `dynamic(..., { ssr: false })`.
- Janky scroll → `frameloop="always"` is rendering every frame; switch to `demand`.
- Material looks flat → `MeshStandardMaterial` needs `Environment` for reflections.
