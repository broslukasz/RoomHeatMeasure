import { OrbitControls, useHelper } from "@react-three/drei";

import { useControls } from "leva";
import { Perf } from "r3f-perf";
import Room from "./Room/room";
import { useRef } from "react";
import { PointLightHelper} from "three";

export const Experience = () => {
  const { performanceVisible } = useControls({ 
    performanceVisible: false,
  });
  const lightHelper = useRef(null);

  useHelper(lightHelper, PointLightHelper )
  
  return (
    <>
      {/* <ambientLight /> */}
      { performanceVisible && <Perf position={'top-left'}></Perf>}
      <OrbitControls />
      <pointLight castShadow ref={lightHelper} position={[0, 3, 0]} intensity={1}></pointLight>
      <Room />
    </>
  );
};
