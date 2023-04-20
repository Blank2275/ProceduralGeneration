import { createNoise2D } from "simplex-noise";
import { entities } from "../../assets/test/images";
const noise2D = createNoise2D();

export function generateTerrain(w, h){
    let hmScales = [100, 20, 5, 1];
    let hmInfluences = [60, 15, 5, 2];
    let heightMap: number[][] = generateMap(w, h, hmScales, hmInfluences);
    let map: number[][][] = [];

    for(let y = 0; y < heightMap.length; y++){
        map.push([]);
        for(let x = 0; x < heightMap[0].length; x++){
            let biome = getBiome(heightMap[y][x]);
            let entity = getEntity(biome);
            map[map.length - 1].push([biome, entity]);
        }
    }
    return map;
}

function getEntity(biome): number{
    if(biome === 2)
        if(Math.random() < 0.05)
            return 0
    return -1;
}

function getBiome(height): number{
    if(height > 55){
        return 4
    } else if(height > 45){
        return 3;
    } else if(height > 25){
        return 2;
    } else if(height > 10){
        return 1;
    }
    return 0;
}

function generateMap(w, h, scales, influences){

    let heights: number[][] = [];
    for(let y = 0; y < h; y++){
        heights.push([]);
        for(let x = 0; x < w; x++){
            heights[heights.length - 1].push(0);
        }
    }

    for(let i in scales){
        for(let y = 0; y < heights.length; y++){
            for(let x = 0; x < heights[0].length; x++){
                let adjustedX = x / scales[i];
                let adjustedY = y / scales[i];

                heights[y][x] += noise2D(adjustedX, adjustedY) * influences[i];
            }
        }
    }

    return heights;
}