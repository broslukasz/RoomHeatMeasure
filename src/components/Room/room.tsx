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
  mesh.receiveShadow = true;

  addedMesh = mesh;
  scene.add(mesh);

  mesh.position.set(x, y + 0.3, z)
}

const newMaterial = new THREE.MeshStandardMaterial();

export default function Room() {
  // const gltf = useLoader(GLTFLoader, 'src/assets/room/scene.gltf');
  const gltf = useLoader(GLTFLoader, 'src/assets/room_office/scene.gltf');
  const {scene} = useThree();
  const model = gltf.scene;

  model.castShadow = true;

  model.traverse(o => {
    if(o.isMesh) {
      o.material = newMaterial;
      o.receiveShadow = true;
    }
  })
  
  // model.scale.set(0.1, 0.1, 0.1);

  return <primitive castShadow receiveShadow onClick={($event) => addObject($event, scene)} object={model} />
}