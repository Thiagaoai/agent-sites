---
name: shader-fundamentals
description: Custom GLSL shaders and Three.js TSL for WebGL effects not covered by libraries. Activate when postprocessing presets are insufficient or a fully custom visual effect is needed.
---

# shader-fundamentals

## WHEN TO USE
- **Distortion on hover** — drei materials don't cover the visual you want (specific UV warping, mouse-reactive ripple).
- **Noise background** — animated procedural gradient or curl-noise field as a section background.
- **Custom animated material** — beyond `MeshDistortMaterial` / `MeshTransmissionMaterial`: time-driven color mixing, scanlines, holographic, glitch.
- **SDF shapes** — render circles, rounded rects, or organic blobs in a fragment shader instead of geometry (cheap, infinite resolution).

## TSL EXAMPLE (recommended for 2026, WebGPU-ready)
Three.js Shading Language is node-based GLSL that compiles to both WebGL2 and WebGPU.
```tsx
import { MeshStandardNodeMaterial } from 'three/webgpu';
import { mix, sin, time, uv, vec3 } from 'three/tsl';

export function tslGradient() {
  const mat = new MeshStandardNodeMaterial();
  const blue   = vec3(0.388, 0.4, 0.945);   // #6366f1
  const violet = vec3(0.545, 0.361, 0.965); // #8b5cf6
  const wave   = sin(uv().y.mul(10).add(time.mul(2))).mul(0.5).add(0.5);
  mat.colorNode = mix(blue, violet, wave);
  return mat;
}
```

## CLASSIC GLSL — drei `shaderMaterial`
```tsx
'use client';
import * as THREE from 'three';
import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { useRef } from 'react';

const WaveMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color('#6366f1') },
  // vertex
  /* glsl */`
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vUv = uv;
      vec3 p = position;
      p.z += sin(p.x * 4.0 + uTime) * 0.15;
      p.z += cos(p.y * 4.0 + uTime * 1.3) * 0.15;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }
  `,
  // fragment
  /* glsl */`
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;
    void main() {
      float w = 0.5 + 0.5 * sin(vUv.x * 8.0 + uTime);
      gl_FragColor = vec4(uColor * w, 1.0);
    }
  `
);
extend({ WaveMaterial });

export function WavePlane() {
  const ref = useRef<any>();
  useFrame((_, dt) => { if (ref.current) ref.current.uTime += dt; });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
      <planeGeometry args={[6, 6, 64, 64]} />
      {/* @ts-ignore */}
      <waveMaterial ref={ref} />
    </mesh>
  );
}
```

## LYGIA SHADER LIBRARY (lygia.xyz)
Drop-in `#include` for noise, SDFs, lighting, easing — battle-tested, MIT.
```glsl
#include "lygia/generative/snoise.glsl"
#include "lygia/sdf/circleSDF.glsl"

void main() {
  float n = snoise(vUv * 4.0 + uTime * 0.2);
  float d = circleSDF(vUv);
  gl_FragColor = vec4(vec3(n * (1.0 - d)), 1.0);
}
```
Resolve includes at build time with [resolve-lygia](https://github.com/patriciogonzalezvivo/lygia/tree/main/resolve) or fetch the snippet manually.

## ESSENTIAL GLSL FUNCTIONS
- `smoothstep(edge0, edge1, x)` — smooth threshold, replaces `if`. Best friend for masks.
- `mix(a, b, t)` — linear interpolation between colors / vectors.
- `fract(x)` — repeat in `[0,1]` — UV tiling, scanlines.
- `length(uv - 0.5)` — distance from center → radial gradients, vignettes.
- **remap helper**: `float remap(float v, float a, float b, float c, float d){ return c + (d - c) * (v - a) / (b - a); }`
- **UV distortion**: `vec2 d = uv + vec2(sin(uv.y*10.0 + uTime), cos(uv.x*10.0 + uTime)) * 0.05;`

## RULES
- Animate via `uTime` uniform — never recreate the material each frame.
- Use `varying vec2 vUv;` to pass UV from vertex to fragment.
- Keep heavy work (noise loops, raymarch) in fragment, not vertex.
- TSL for new code (WebGPU-ready); classic GLSL when you copy-paste from Shadertoy.

## RESOURCES
- [thebookofshaders.com](https://thebookofshaders.com) — fundamentals, free.
- [lygia.xyz](https://lygia.xyz) — shader snippet library.
- [shadertoy.com](https://shadertoy.com) — port from `iTime`/`iResolution` to `uTime`/`resolution`.
- [threejs.org/docs/#api/en/nodes](https://threejs.org/docs/#api/en/nodes) — TSL reference.