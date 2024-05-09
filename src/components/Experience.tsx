import { OrbitControls, useHelper } from "@react-three/drei";

import { useControls } from "leva";
import { Perf } from "r3f-perf";
import Room from "./Room/room";
import { useRef } from "react";
import { DirectionalLightHelper, PointLightHelper} from "three";

export const Experience = () => {
  const { performanceVisible } = useControls({ 
    performanceVisible: false,
  });
  const lightHelper = useRef(null);
  const pointLightHelper = useRef(null);

  useHelper(lightHelper, DirectionalLightHelper )
  useHelper(pointLightHelper, PointLightHelper )
  
  return (
    <>
      {/* <ambientLight /> */}
      { performanceVisible && <Perf position={'top-left'}></Perf>}
      <OrbitControls />
      <directionalLight castShadow ref={lightHelper} position={[0, 4.5, 0]} intensity={0.5}></directionalLight>
      <pointLight ref={pointLightHelper} position={[0, 4.5, 0]} intensity={0.5}></pointLight>
      <Room />
    </>
  );
};
