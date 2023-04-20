import { DisplayManager, Camera } from "../../display/display";
import { colors } from "../../assets/test/colors";
import { entities } from "../../assets/test/images";
import { generateTerrain } from "./generate";
import { CameraManager } from "./camera";
let colorArray = Object.values(colors);
let entityArray = Object.values(entities);

let camera: Camera = new Camera(0, 0);
let manager: DisplayManager = new DisplayManager(camera);

// let grid: number[][] = [];
// let gWidth: number = 60;
// let gHeight: number = 60;
// for(let y = 0; y < gHeight; y++){
//     grid.push([]);
//     for(let x = 0; x < gWidth; x++){
//         let color = Math.floor(Math.random() * colorArray.length);
//         grid[grid.length - 1].push(color);
//     }
// }
let grid = generateTerrain(100, 100);

let canvas = manager.genCanvas(window.innerWidth / 1.1, window.innerHeight / 1.1, 4);
document.body.appendChild(canvas);

let cameraManager = new CameraManager(camera, document.body, 0.25);

animate();

function animate(){
    cameraManager.update()

    manager.clear();
    manager.drawGrid(grid, 30, colorArray, entityArray);
    requestAnimationFrame(animate);
}

