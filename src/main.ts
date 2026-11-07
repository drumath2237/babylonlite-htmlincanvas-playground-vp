import "./style.css";
import {
  addToScene,
  attachControl,
  createBox,
  createDefaultCamera,
  createDirectionalLight,
  createEngine,
  createHtmlTexture,
  createSceneContext,
  createStandardMaterial,
  registerScene,
  setStandardEmissiveTexture,
  startEngine,
  whenHtmlTextureReady,
} from "@babylonjs/lite";

async function main() {
  const renderCanvas = document.getElementById("renderCanvas");
  if (!(renderCanvas instanceof HTMLCanvasElement)) {
    return;
  }

  const panel = document.getElementById("panel");
  if (!panel) {
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
  const htmlTex = createHtmlTexture(engine, panel, {});
  await whenHtmlTextureReady(htmlTex);
  // mat.diffuseTexture = htmlTex;
  setStandardEmissiveTexture(mat, htmlTex);
  mat.disableLighting = true;
  box.material = mat;

  addToScene(scene, box);

  await registerScene(scene);
  await startEngine(engine);
}

main().catch(console.log);
