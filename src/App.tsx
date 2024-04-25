import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Leva } from "leva";

function App() {
  const cameraScalingFactor = 0.8;
  return (<>
      <Leva collapsed />
        <Canvas shadows camera={{ position: [0.5 * cameraScalingFactor, 1 * cameraScalingFactor, 2 * cameraScalingFactor], fov: 30 }}>
          <color attach="background" args={["#000000"]} />
          <Experience />
        </Canvas>
    </>
  );
}

export default App;
