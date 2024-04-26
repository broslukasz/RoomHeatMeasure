import { OrbitControls } from "@react-three/drei";

import { useControls } from "leva";
import { Perf } from "r3f-perf";
import Room from "./Room/room";

export const Experience = () => {
  const { performanceVisible } = useControls({ 
    performanceVisible: false,
  });
  
  return (
    <>
      { performanceVisible && <Perf position={'top-left'}></Perf>}
      <ambientLight />
      <OrbitControls />
      <Room />
    </>
  );
};
