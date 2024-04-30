import { Canvas, useThree } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Leva } from "leva";

function App() {
  const cameraScalingFactor = 2;
  // const [cameraX, cameraY, cameraZ] = [-0.5, 1.3, -3]
  const [cameraX, cameraY, cameraZ] = [-2, 2, 3]

  return (<>
      <Leva collapsed />
        <Canvas shadows camera={{ position: [cameraX * cameraScalingFactor, cameraY * cameraScalingFactor, cameraZ * cameraScalingFactor], fov: 30 }}>
          <color attach="background" args={["#000000"]} />
          <Experience />
        </Canvas>
    </>
  );
}

export default App;
