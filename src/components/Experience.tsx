import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

export const Experience = () => {
  const { performanceVisible } = useControls({ 
    performanceVisible: false,
  })
  
  return (
    <>
      { performanceVisible && <Perf position={'top-left'}></Perf>}
      <ambientLight />
      <mesh>
        <boxGeometry args={[1, 1, 1]}/>
        <meshStandardMaterial color={'red'} />
      </mesh>
      <OrbitControls />
    </>
  );
};
