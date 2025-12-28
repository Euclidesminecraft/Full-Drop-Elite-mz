import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, MeshReflectorMaterial, Float, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import Button from '../components/ui/Button';
import { ArrowLeft, Rotate3d, Palette } from 'lucide-react';

// --- Componente do Carro Procedural (Estilo Cyberpunk/JDM Simplificado) ---
const StylizedCar = ({ color }: { color: string }) => {
  const group = useRef<THREE.Group>(null);

  // Animação suave (levitação leve se quiser, ou apenas estático)
  useFrame((state) => {
    if (group.current) {
        // Pequena oscilação de motor/suspensão
        group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.005; 
    }
  });

  return (
    <group ref={group}>
      {/* Chassis Principal */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.5, 4]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} envMapIntensity={1} />
      </mesh>

      {/* Cabine (Vidros) */}
      <mesh position={[0, 1.1, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.5, 2.2]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Detalhe Frontal (Capô) */}
      <mesh position={[0, 0.61, 1.2]} rotation={[0.1, 0, 0]} castShadow>
         <boxGeometry args={[1.4, 0.05, 1.4]} />
         <meshStandardMaterial color="#000" roughness={0.5} /> {/* Carbon Fiber look */}
      </mesh>

      {/* Faróis Dianteiros */}
      <mesh position={[0.6, 0.6, 2.01]}>
        <boxGeometry args={[0.4, 0.1, 0.1]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <mesh position={[-0.6, 0.6, 2.01]}>
        <boxGeometry args={[0.4, 0.1, 0.1]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} toneMapped={false} />
      </mesh>

      {/* Luzes Traseiras */}
      <mesh position={[0, 0.6, -2.01]}>
        <boxGeometry args={[1.6, 0.1, 0.1]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={3} toneMapped={false} />
      </mesh>

      {/* Aerofólio (Spoiler) */}
      <mesh position={[0, 1.1, -1.9]}>
        <boxGeometry args={[1.8, 0.05, 0.4]} />
        <meshStandardMaterial color="#000" metalness={0.6} />
      </mesh>
      <mesh position={[0.7, 0.9, -1.9]}>
        <boxGeometry args={[0.05, 0.4, 0.2]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[-0.7, 0.9, -1.9]}>
        <boxGeometry args={[0.05, 0.4, 0.2]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      {/* Rodas */}
      <Wheel position={[0.95, 0.35, 1.2]} />
      <Wheel position={[-0.95, 0.35, 1.2]} />
      <Wheel position={[0.95, 0.35, -1.2]} />
      <Wheel position={[-0.95, 0.35, -1.2]} />
      
      {/* Neon Underglow */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
         <planeGeometry args={[1.6, 3.8]} />
         <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
      
      {/* Placa */}
      <mesh position={[0, 0.4, 2.01]}>
        <planeGeometry args={[0.4, 0.12]} />
        <meshBasicMaterial color="#fff" />
      </mesh>
    </group>
  );
};

const Wheel = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.25, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      {/* Aros */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
         <cylinderGeometry args={[0.2, 0.2, 0.26, 6]} />
         <meshStandardMaterial color="#cfcfcf" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
};

// --- Cena Principal ---
const VirtualShowroom: React.FC = () => {
  const [carColor, setCarColor] = useState('#9333ea'); // Começa com Roxo Elite
  
  const colors = [
    { name: 'Elite Purple', value: '#9333ea' },
    { name: 'Midnight Black', value: '#111111' },
    { name: 'Nardo Grey', value: '#6b7280' },
    { name: 'Racing Red', value: '#dc2626' },
    { name: 'Electric Blue', value: '#2563eb' },
    { name: 'Pearl White', value: '#f3f4f6' },
  ];

  return (
    <div className="h-screen w-full bg-fde-black relative overflow-hidden flex flex-col">
      {/* Interface Overlay */}
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
        <div className="p-6 md:p-8 flex justify-between items-start">
          <div className="pointer-events-auto">
            <Button to="/gallery" variant="ghost" className="text-white bg-black/50 backdrop-blur-md border border-white/10">
              <ArrowLeft size={18} className="mr-2" /> Voltar
            </Button>
          </div>
          <div className="text-right pointer-events-auto bg-black/50 backdrop-blur-md p-4 border border-white/10 rounded-bl-2xl">
            <h1 className="text-4xl font-display font-bold text-white uppercase leading-none">
              Configurador <span className="text-fde-purple">3D</span>
            </h1>
            <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">
              JDM Concept Alpha
            </p>
          </div>
        </div>
      </div>

      {/* Canvas 3D */}
      <div className="flex-grow relative cursor-grab active:cursor-grabbing">
        <Canvas shadows camera={{ position: [4, 2, 5], fov: 45 }}>
          <color attach="background" args={['#050505']} />
          <fog attach="fog" args={['#050505', 5, 20]} />
          
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.5} contactShadow={{ resolution: 1024, scale: 10, blur: 2, opacity: 0.5, color: '#000000' }}>
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
                  <StylizedCar color={carColor} />
              </Float>
            </Stage>
            
            {/* Chão Refletivo */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
              <planeGeometry args={[20, 20]} />
              <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={1024}
                mixBlur={1}
                mixStrength={40}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#101010"
                metalness={0.5}
                mirror={0} // Fixed: mirror prop is often required as 0 or 1 in recent versions, though type might be number
              />
            </mesh>
            
            {/* Texto 3D no fundo */}
            <Text
              position={[0, 2, -4]}
              fontSize={1.5}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="https://fonts.gstatic.com/s/teko/v15/LYjCdG7kmE0gdQhfr-ys.woff"
            >
              FULL DROP
              <meshStandardMaterial emissive="white" emissiveIntensity={0.2} />
            </Text>
          </Suspense>

          <OrbitControls 
            minPolarAngle={0} 
            maxPolarAngle={Math.PI / 2 - 0.1} 
            enablePan={false}
            minDistance={3}
            maxDistance={10}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
        
        {/* Loading Indicator for Suspense (Simulated visually if canvas loads slow) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0">
           <span className="text-fde-purple font-display animate-pulse">Carregando Modelo...</span>
        </div>
      </div>

      {/* Controls Footer */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent pt-12 pb-8 px-8 z-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
             <div className="bg-fde-darkgray p-3 rounded-full border border-white/10">
                <Rotate3d className="text-white" />
             </div>
             <div className="text-sm text-gray-400">
                <span className="block text-white font-bold uppercase">Navegação Livre</span>
                Arraste para girar • Scroll para zoom
             </div>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto max-w-full pb-2 md:pb-0 no-scrollbar">
             <div className="flex items-center gap-2 pr-4 border-r border-white/10 mr-4">
                <Palette size={18} className="text-fde-purple" />
                <span className="text-xs font-bold text-white uppercase">Pintura</span>
             </div>
             {colors.map((c) => (
               <button
                 key={c.name}
                 onClick={() => setCarColor(c.value)}
                 className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-125 ${carColor === c.value ? 'border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'border-transparent'}`}
                 style={{ backgroundColor: c.value }}
                 title={c.name}
               />
             ))}
          </div>

          <Button onClick={() => alert("Configuração salva! Envie para o WhatsApp.")} className="whitespace-nowrap">
            Solicitar Orçamento
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VirtualShowroom;