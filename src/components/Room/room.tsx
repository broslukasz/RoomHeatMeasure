import { useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let addedMesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;

function addObject($event: any, scene: THREE.Scene) {
  const {x, y, z} = $event.intersections[0].point;
  
  if(addedMesh) {
    scene.remove(addedMesh);
  }

  const geometry = new THREE.SphereGeometry( 0.1, 32, 16 );
  const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  const mesh = new THREE.Mesh( geometry, material );

  addedMesh = mesh;
  scene.add(mesh);

  mesh.position.set(x, y, z)
}

export default function Room() {
  const model = useLoader(GLTFLoader, 'src/assets/home_office.glb');
  const {scene} = useThree();

  return <primitive onClick={($event) => addObject($event, scene)} object={model.scene} />
}