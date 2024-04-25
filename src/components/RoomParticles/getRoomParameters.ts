import { IMeasurementSettings as IMeasurementSettings } from "./models/IMeasurementSettings";
import colorSelectedParticle from "./functions/colorSelectedParticle";
import { colorParticleWithRange } from "./functions/colorParticlesWithRange";
import { ICubeSettings } from "./models/ICubeSettings";
import * as THREE from 'three';

export default function getRoomParameters<T = undefined>(
   {qubeSize, particlesDistance}: ICubeSettings,
   measurementSettings: IMeasurementSettings,
   mesh: THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[]>,
   translatedPosition: number
  ): [Float32Array, Float32Array] {
  const particlesCount = qubeSize * qubeSize * qubeSize;
  const numberOfParametersPerParticle = 3;
  const distanceBetweenParticles = particlesDistance;

  const positions = new Float32Array(particlesCount * numberOfParametersPerParticle);
  let colors = new Float32Array(particlesCount * numberOfParametersPerParticle);

  const [xIndex, yIndex, zIndex] = [0, 1, 2];

  const currentParticlePosition: number[] = [0, 0, 0];

  let currentPositionInFloatX: number;
  let currentPositionInFloatY: number;
  let currentPositionInFloatZ: number;
  
  let i: number;
  let isInside: boolean;
  let rayDirection = new THREE.Vector3(1, 0, 0).normalize();
  for(i = 0; i < particlesCount; i++) {
    currentPositionInFloatX = i * numberOfParametersPerParticle;
    currentPositionInFloatY = i * numberOfParametersPerParticle + yIndex;
    currentPositionInFloatZ = i * numberOfParametersPerParticle + zIndex;

    positions[currentPositionInFloatX] = currentParticlePosition[xIndex] * distanceBetweenParticles;
    positions[currentPositionInFloatY] = currentParticlePosition[yIndex] * distanceBetweenParticles;
    positions[currentPositionInFloatZ] = currentParticlePosition[zIndex] * distanceBetweenParticles;

    if(mesh) {
      let raycasterPosition = new THREE.Vector3(
        positions[currentPositionInFloatX] + translatedPosition,
        positions[currentPositionInFloatY] + translatedPosition,
        positions[currentPositionInFloatZ] + translatedPosition
      );

      const ray = new THREE.Raycaster(raycasterPosition, rayDirection);      
      mesh.updateMatrixWorld();
      const hit = ray.intersectObject(mesh as THREE.Object3D);

      // const arrowHelper = new THREE.ArrowHelper(rayDirection, raycasterPosition);
      // scene.add(arrowHelper)

      isInside = hit.length % 2 === 1; 
    }

    colors[currentPositionInFloatX] = isInside ? 0.8 : 0.0;
    colors[currentPositionInFloatY] = isInside ? 0.8 : 0.1;
    colors[currentPositionInFloatZ] = isInside ? 0.8 : 0.0;

    generateNextParticle();
  }
  

  assignColors();

    return [positions, colors];

  function generateNextParticle(): void {
    const maxSize = qubeSize - 1;

    if(currentParticlePosition[yIndex] === maxSize && currentParticlePosition[xIndex] === maxSize) {
      currentParticlePosition[xIndex] = 0;
      currentParticlePosition[yIndex] = 0;
      currentParticlePosition[zIndex]++;

      return;
    }

    if(currentParticlePosition[xIndex] === maxSize) {
      currentParticlePosition[xIndex] = 0;
      currentParticlePosition[yIndex]++;

      return;
    }

    currentParticlePosition[xIndex]++;
  }

  function assignColors(): void {
    const [x, y ,z] = measurementSettings.measurementPosition;
    const yIndexOffset = qubeSize;
    const zIndexOffset = qubeSize * qubeSize;
    
    const pointInFloat = x + y * yIndexOffset + z * zIndexOffset;
    const pointInFloatIndex = pointInFloat * numberOfParametersPerParticle;
    
    colors = colorParticleWithRange(colors, measurementSettings, yIndexOffset, zIndexOffset);
    colors = colorSelectedParticle(colors, pointInFloatIndex);
  }
}