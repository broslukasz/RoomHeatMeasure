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
  const [measurementMarker, setMeasurementMarker] = useState(null);

  const onRoomDoubleClick = ($event: any) => {
    $event.stopPropagation()
    const {x, y, z} = $event.intersections[0].point;
    const yTransition = 1;
    setMeasurement([x, y + yTransition, z]);
  }

  const onPointerMoveOnRoom = ($event: any) => {
    $event.stopPropagation();
    const {x, y, z} = $event.intersections[0].point;
    const yTransition = 1;
    setMeasurementMarker([x, y + yTransition, z]);
  }

  useHelper(lightHelper, DirectionalLightHelper )
  useHelper(pointLightHelper, PointLightHelper )
  
  return (
    <>
      {/* <ambientLight /> */}
      { performanceVisible && <Perf position={'top-left'}></Perf>}
      <OrbitControls />
      <directionalLight castShadow ref={lightHelper} position={[0, 4.5, 0]} intensity={0.5}></directionalLight>
      <pointLight ref={pointLightHelper} position={[0, 4.5, 0]} intensity={0.5}></pointLight>
      <Room onPointerMove={onPointerMoveOnRoom} onDoubleClick={onRoomDoubleClick} />

      {measurement && <mesh castShadow position={measurement}>
        <sphereGeometry args={[ 0.1, 32, 16]} />
        <meshStandardMaterial color={0xffff00} />
      </mesh>}

      {measurementMarker && <mesh castShadow position={measurementMarker}>
        <sphereGeometry args={[ 0.1, 32, 16]} />
        <meshStandardMaterial transparent={true} opacity={0.5} color={0xffff00} />
      </mesh>}
    </>
  );
};
