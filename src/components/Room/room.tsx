import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Room({ onDoubleClick, onPointerMove }) {
  const gltf = useLoader(GLTFLoader, 'src/assets/office/scene.gltf');
  const model = gltf.scene;

  model.traverse(o => {
    if(o.isMesh) {
      o.receiveShadow = true;
    }
  })

  return <>
    <primitive castShadow receiveShadow onPointerMove={onPointerMove} onDoubleClick={onDoubleClick} object={model} />
  </>
}