import SceneClient from './SceneClient';

export const metadata = {
  title: 'Teste 3D — motion-3d-specialist',
};

export default function Teste3DPage() {
  return (
    <main className="h-screen w-screen bg-black overflow-hidden">
      <SceneClient />
    </main>
  );
}
