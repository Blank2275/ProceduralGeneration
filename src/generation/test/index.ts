import { DisplayManager, Camera } from "../../display/display";
import { colors } from "../../assets/test/colors";
import { entities } from "../../assets/test/images";
import { generateTerrain } from "./generate";
import { CameraManager } from "../../display/camera";
let colorArray = Object.values(colors);
let entityArray = Object.values(entities);

let camera: Camera = new Camera(0, 0, 30);
let manager: DisplayManager = new DisplayManager(camera);

let grid = generateTerrain(1000, 1000);

let canvas = manager.genCanvas(window.innerWidth / 1.1, window.innerHeight / 1.1, 4);
document.body.appendChild(canvas);

let cameraManager = new CameraManager(camera, document.body, 0.25);

animate();

function animate(){
    cameraManager.update()

    manager.clear();
    manager.drawGrid(grid, camera.zoom, colorArray, entityArray);
    requestAnimationFrame(animate);
}

