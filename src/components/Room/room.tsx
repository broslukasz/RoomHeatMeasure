import { useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let addedMesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;

function addObject($event: any, scene: THREE.Scene) {
  const {x, y, z} = $event.intersections[0].point;
  if(addedMesh) {
    scene.remove(addedMesh);
  }

  const geometry = new THREE.SphereGeometry( 0.1, 32, 16 );
  const material = new THREE.MeshStandardMaterial( { color: 0xffff00 } );
  const mesh = new THREE.Mesh( geometry, material );
  mesh.castShadow = true;

  addedMesh = mesh;
  scene.add(mesh);

  mesh.position.set(x, y + 0.3, z)
}

export default function Room() {
  const gltf = useLoader(GLTFLoader, 'src/assets/office/scene.gltf');
  const {scene} = useThree();
  const model = gltf.scene;

  model.traverse(o => {
    if(o.isMesh) {
      o.receiveShadow = true;
    }
  })

  return <primitive castShadow receiveShadow onClick={($event) => addObject($event, scene)} object={model} />
}