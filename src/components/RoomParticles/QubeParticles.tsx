import { useTexture, meshBounds } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber'

import getRoomParameters from './getRoomParameters';
import { useEffect, useMemo, useRef } from 'react';

import particlesVertexShader from './shaders/particles.vertex.glsl'
import particlesFragmentShader from './shaders/particles.fragment.glsl'
import * as THREE from 'three';

type QubeParticlesProps = {
  particleSize: number;
  qubeSize: number;
  particlesDistance: number;
  measurementPosition: [number, number, number],
  measurementRange?: number;
}

export default function QubeParticles({particleSize, qubeSize, particlesDistance, measurementPosition, measurementRange = 0}: QubeParticlesProps) {
  const { clock, gl } = useThree();
  let geometryRef = useRef<THREE.BufferGeometry>(null);
  let pointsMaterialRef = useRef<THREE.ShaderMaterial>(null);
  let particlesRef = useRef<THREE.Points>(null);
  let sphereRef = useRef<THREE.Mesh>();

  const makePositionCentral = 0.5;
  const translatedPosition = -qubeSize / 2 * particlesDistance + makePositionCentral * particlesDistance;

  let [positions, colors] = useMemo(() => {
    return getRoomParameters({qubeSize, particlesDistance}, {measurementPosition, measurementRange }, sphereRef.current, translatedPosition);    
  }, [qubeSize, measurementPosition, measurementRange, sphereRef.current])

  useEffect(() =>{
    geometryRef.current.dispose();
    pointsMaterialRef.current.dispose();
    particlesRef.current.clear();

  }, [qubeSize, measurementRange, measurementPosition])

  
  useFrame(() =>
  {
    pointsMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
  })

  return (
  <>
    <points ref={particlesRef} position={[translatedPosition, translatedPosition, translatedPosition]}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3} />
        <bufferAttribute 
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        ref={pointsMaterialRef}
        depthWrite={false}
        vertexColors={true}
        needsUpdate={true}
        transparent={true}
        vertexShader={particlesVertexShader}
        fragmentShader={particlesFragmentShader}
        uniforms={{
          uSize: {value: particleSize * gl.getPixelRatio()},
          uTime: {value: 0},
        }}
       />
    </points>

    <mesh visible={true} scale={[0.05, 0.05, 0.05]} ref={sphereRef}>
      <sphereGeometry args={[10, 10, 10]} />
      <meshStandardMaterial side={THREE.DoubleSide} wireframe={true} transparent />
    </mesh>

    <ambientLight intensity={2}></ambientLight>
</>
  )
}