import { worldToScreenLocation } from "./utils";
export class DisplayManager{
    camera: Camera;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    resolution: number;
    entityOffsets: number[][][];
    constructor(camera: Camera){
        this.camera = camera;  
        this.entityOffsets = [];
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
    generateEntityOffsets(w: number, h: number){
        for(let y = 0; y < h; y++){
            this.entityOffsets.push([]);
            for(let x = 0; x < w; x++){
                let xOffset: number = Math.random() * 2 - 1;
                let yOffset: number = Math.random() * 2 - 1;
                this.entityOffsets[this.entityOffsets.length - 1].push([xOffset, yOffset]);
            }
        }
    }
    drawGrid(grid: any[][], size: number, colors, entities){
        if(!(this.entityOffsets.length === grid.length)){
            this.generateEntityOffsets(grid[0].length, grid.length);
        }
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
                    let xOffset = this.entityOffsets[y][x][0];
                    let yOffset = this.entityOffsets[y][x][1];
                    this.ctx.drawImage(entity, drawX + xOffset * this.resolution, drawY + yOffset * this.resolution, size * this.resolution + 0.5, size * this.resolution + 0.5);
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
    zoom: number;
    constructor(x: number, y: number, zoom: number){
        this.x = x;
        this.y = y;
        this.zoom = zoom;
    }
}