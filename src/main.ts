import "./style.css";
import {
  addToScene,
  attachControl,
  createBox,
  createDefaultCamera,
  createDirectionalLight,
  createEngine,
  createSceneContext,
  createStandardMaterial,
  registerScene,
  startEngine,
} from "@babylonjs/lite";

async function main() {
  const renderCanvas = document.getElementById("renderCanvas");
  if (!(renderCanvas instanceof HTMLCanvasElement)) {
    return;
  }

  const engine = await createEngine(renderCanvas);
  const scene = createSceneContext(engine);

  const camera = createDefaultCamera(scene);
  attachControl(camera, renderCanvas, scene);
  const light = createDirectionalLight([1, -2, 3]);
  addToScene(scene, light);

  const box = createBox(engine);
  const mat = createStandardMaterial();
  box.material = mat;

  addToScene(scene, box);

  await registerScene(scene);
  await startEngine(engine);
}

main().catch(console.log);
