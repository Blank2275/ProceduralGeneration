import { Camera } from "./display";
export class CameraManager{
    camera: Camera;
    element: HTMLElement;
    down: number[];
    speed: number;
    constructor(camera: Camera, element: HTMLElement, speed: number){
        this.camera = camera;
        this.element = element;
        this.down = [];
        this.speed = speed;

        this.element.addEventListener("keydown", (e) => this.keyDown(e));
        this.element.addEventListener("keyup", (e) => this.keyUp(e));
    }
    keyDown(e){
        if(!this.down.includes(e.keyCode)){
            this.down.push(e.keyCode);
        }
    }
    keyUp(e){
        if(this.down.includes(e.keyCode)){
            this.down.splice(this.down.indexOf(e.keyCode));
        }
    }

    update(){
        if(this.down.includes(38)){
            this.camera.y -= this.speed;
        }
        if(this.down.includes(39)){
            this.camera.x += this.speed;
        }
        if(this.down.includes(40)){
            this.camera.y += this.speed;
        }
        if(this.down.includes(37)){
            this.camera.x -= this.speed;
        }
        if(this.down.includes(16)){//shift
            if(this.camera.zoom < 300)
                this.camera.zoom += 0.5;
        } 
        if(this.down.includes(17)){//ctrl
            if(this.camera.zoom > 3.5)
                this.camera.zoom -= 0.5;
        }
    }
}