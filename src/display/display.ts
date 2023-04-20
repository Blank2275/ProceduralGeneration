import { worldToScreenLocation } from "./utils";
export class DisplayManager{
    camera: Camera;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    resolution: number;
    constructor(camera: Camera){
        this.camera = camera;   
    }
    genCanvas(width, height, resolution){
        this.width = width;
        this.height = height;
        this.resolution = resolution
        this.canvas = document.createElement("canvas");
        this.canvas.style.width = this.width + "px";
        this.canvas.style.height = this.height + "px";
        this.canvas.width = this.width * this.resolution;
        this.canvas.height = this.height * this.resolution;
        this.ctx = this.canvas.getContext("2d")!;

        return this.canvas;
    }
    drawGrid(grid: any[][], size: number, colors, entities){
        let adjustedWidth = this.width * this.resolution;
        let adjustedHeight = this.height * this.resolution;
        let numVisibleX = Math.ceil(this.width / size + 1 );
        let numVisibleY = Math.ceil(this.height / size + 1);
        let startX = Math.floor(this.camera.x);
        let startY = Math.floor(this.camera.y);

        for(let y = startY - numVisibleY; y < startY + numVisibleY; y++){
            for(let x = startX - numVisibleX; x < startX + numVisibleX; x++){
                if(!(y >= 0 && x >= 0 && y < grid.length && x < grid[0].length)) continue;

                let drawX = (x - this.camera.x) * size * this.resolution;
                let drawY = (y - this.camera.y) * size * this.resolution;

                let color = colors[grid[y][x][0]];
                let entityIndex = grid[y][x][1];

                this.ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                this.ctx.fillRect(drawX, drawY, size * this.resolution + 0.5, size * this.resolution + 0.5);

                if(entityIndex != -1){
                    let entity = entities[grid[y][x][1]];
                    this.ctx.drawImage(entity, drawX, drawY, size * this.resolution + 0.5, size * this.resolution + 0.5);
                }
            }
        }
    }
    clear(){
        this.ctx.clearRect(0, 0, this.width * this.resolution, this.height * this.resolution);
    }
}

export class Camera{
    x: number;
    y: number;
    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}