import { Canvas, useThree } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Leva } from "leva";
import { Environment, Html, useProgress } from "@react-three/drei";
import { Suspense } from "react";

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

function App() {
  const cameraScalingFactor = 2;
  // const [cameraX, cameraY, cameraZ] = [-0.5, 1.3, -3]

  // Camera for basic office model
  // const [cameraX, cameraY, cameraZ] = [7, 6, 5]

  // Camera for Gdansk office bigger
  // const [cameraX, cameraY, cameraZ] = [-6, 4, -5]

    // Camera for Gdansk office smaller
    const [cameraX, cameraY, cameraZ] = [6, 4, 5]

  return (<>
      <Leva collapsed />
        <Canvas shadows camera={{ position: [cameraX * cameraScalingFactor, cameraY * cameraScalingFactor, cameraZ * cameraScalingFactor], fov: 30 }}>
          <color attach="background" args={["#000000"]} />
          <Suspense fallback={<Loader />}>
            <Experience />
          </Suspense>
          <Environment preset="dawn" background />
        </Canvas>
    </>
  );
}

export default App;
