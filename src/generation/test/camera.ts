import { Camera } from "../../display/display";
class CameraManager{
    camera: Camera;
    element: HTMLElement;
    down: number[];
    constructor(camera: Camera, element: HTMLElement){
        this.camera = camera;
        this.element = element;
        this.down = [];

        this.element.addEventListener("keydown", this.keyDown);
        this.element.addEventListener("keyup", this.keyUp);
    }
    keyDown(){

    }
    keyUp(){
        
    }
}