import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Room({ onClick, onPointerDown, onPointerUp }) {
  // const gltf = useLoader(GLTFLoader, 'src/assets/office/scene.gltf',);
  // const gltf = useLoader(GLTFLoader, 'src/assets/room_office/scene.gltf',);
  const gltf = useMemo(() => useLoader(GLTFLoader, 'src/assets/Scaniverse2022/model.gltf',), []);
  const model = gltf.scene;

  model.traverse(o => {
    if(o.isMesh) {
      o.receiveShadow = true;
    }
  })

  return <>
    <primitive
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      castShadow
      receiveShadow
      onClick={onClick}
      object={model}
     />
  </>
}