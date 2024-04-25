export default function colorSelectedParticle(colors: Float32Array, pointInFloatIndex: number): Float32Array {  
  colors[pointInFloatIndex] = 1;
  colors[pointInFloatIndex + 1] = 0;
  colors[pointInFloatIndex + 2] = 0;

  return colors;
}