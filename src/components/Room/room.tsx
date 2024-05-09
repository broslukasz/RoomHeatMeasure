import { useLoader, useThree } from "@react-three/fiber";
import { useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Room() {
  const gltf = useLoader(GLTFLoader, 'src/assets/office/scene.gltf');
  const {scene} = useThree();
  const model = gltf.scene;

  const [measurement, setMeasurement] = useState(null)

  model.traverse(o => {
    if(o.isMesh) {
      o.receiveShadow = true;
    }
  })

  const addMesh = ($event: any) => {
    const {x, y, z} = $event.intersections[0].point;
    const yTransition = 1;
    setMeasurement([x, y + yTransition, z])
  }

  return <>
    <primitive castShadow receiveShadow onClick={($event) => addMesh($event)} object={model} />
    {measurement && <mesh castShadow position={measurement}>
      <sphereGeometry args={[ 0.1, 32, 16]} />
      <meshStandardMaterial color={0xffff00} />
    </mesh>}
  </>
}