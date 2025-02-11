import { OrbitControls, useHelper } from "@react-three/drei";

import { useControls } from "leva";
import { Perf } from "r3f-perf";
import Room from "./Room/room";
import { useRef, useState } from "react";
import { DirectionalLightHelper, PointLightHelper} from "three";

export const Experience = () => {
  const { performanceVisible } = useControls({ 
    performanceVisible: false,
  });
  const lightHelper = useRef(null);
  const pointLightHelper = useRef(null);
  const [measurement, setMeasurement] = useState(null);

  const [pointerDownPageX, setPointerDownPageX] = useState(null);
  const [pointerDownPageY, setPointerDownPageY] = useState(null);

  const onRoomClick = ($event: any) => {
    $event.stopPropagation();

    if(pointerDownPageX !== $event.pageX && pointerDownPageY !== $event.pageY) {
      return;
    }

    const {x, y, z} = $event.intersections[0].point;
    const yTransition = 1;
    setMeasurement([x, y + yTransition, z]);
  }

  const onPointerDownOnRoom = ($event: any) => {
    $event.stopPropagation();
    setPointerDownPageX(Math.floor($event.pageX));
    setPointerDownPageY(Math.floor($event.pageY));
  }

  const onPointerUpOnRoom = ($event: any) => {
    $event.stopPropagation();
  }

  useHelper(lightHelper, DirectionalLightHelper )
  useHelper(pointLightHelper, PointLightHelper )
  
  return (
    <>
      { performanceVisible && <Perf position={'top-left'}></Perf>}
      <OrbitControls />
      <directionalLight castShadow ref={lightHelper} position={[0, 4.5, 0]} intensity={0.5}></directionalLight>
      
      <Room
        onPointerDown={onPointerDownOnRoom}
        onPointerUp={onPointerUpOnRoom}
        onClick={onRoomClick}
      />

      {measurement && <mesh castShadow position={measurement}>
        <sphereGeometry args={[ 0.1, 32, 16]} />
        <meshStandardMaterial color={0xffff00} />
      </mesh>}
    </>
  );
};
