import "./style.css";

function main() {
  const renderCanvas = document.getElementById("renderCanvas");
  if (!(renderCanvas instanceof HTMLCanvasElement)) {
    return;
  }

  console.log("hello!");
}

main();
