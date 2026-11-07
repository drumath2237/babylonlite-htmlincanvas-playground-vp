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
  isHtmlInCanvasSupported,
  onBeforeRender,
  registerScene,
  setStandardEmissiveTexture,
  startEngine,
  whenHtmlTextureReady,
} from "@babylonjs/lite";

main().catch(console.log);

async function main() {
  const [success, elm] = tryResolveElements();
  if (success === false) {
    return;
  }

  const { container, renderCanvas, textInput, pText } = elm;
  textInput.value = pText.textContent;
  textInput.addEventListener("input", () => {
    pText.textContent = textInput.value;
  });

  const engine = await createEngine(renderCanvas);
  if (isHtmlInCanvasSupported(engine) === false) {
    return;
  }

  const scene = createSceneContext(engine);

  const camera = createDefaultCamera(scene);
  attachControl(camera, renderCanvas, scene);
  const light = createDirectionalLight([1, -2, 3]);
  addToScene(scene, light);

  const box = createBox(engine, {
    size: 0.5,
  });

  onBeforeRender(scene, () => {
    const { x, y, z } = box.rotation;
    box.rotation.set(x + 0.01, y + 0.01, z + 0.01);
  });

  const mat = createStandardMaterial();
  const htmlTex = createHtmlTexture(engine, container);
  await whenHtmlTextureReady(htmlTex);
  setStandardEmissiveTexture(mat, htmlTex);
  mat.disableLighting = true;
  box.material = mat;

  addToScene(scene, box);

  await registerScene(scene);
  await startEngine(engine);
}

function tryResolveElements() {
  const renderCanvas = document.getElementById("renderCanvas");
  if (!(renderCanvas instanceof HTMLCanvasElement)) {
    return [false, null] as const;
  }

  const container = document.getElementById("container");
  if (!container) {
    return [false, null] as const;
  }

  const pText = document.getElementById("p-text");
  if (!(pText instanceof HTMLParagraphElement)) {
    return;
  }

  const textInput = document.getElementById("text-input");
  if (!(textInput instanceof HTMLInputElement)) {
    return [false, null] as const;
  }

  return [
    true,
    {
      renderCanvas,
      container,
      textInput,
      pText,
    },
  ] as const;
}
