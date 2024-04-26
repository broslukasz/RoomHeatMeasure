import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Room() {
  const model = useLoader(GLTFLoader, 'src/assets/home_office.glb')
  console.log(model)

  return <primitive object={model.scene} />
}