import { createNoise2D } from "simplex-noise";
import { entities } from "../../assets/test/images";
const noise2D = createNoise2D();

export function generateTerrain(w, h){
    let hmScales: number[] = [50, 15, 4, 1, 20];
    let hmInfluences: number[] = [60, 15, 5, 2, 20];
    let heightMap: number[][] = generateMap(w, h, hmScales, hmInfluences);

    let humidityScales: number[] = [60, 30, 15, 7];
    let humidityInfluences: number[] = [30, 15, 15, 20];
    let humidityMap: number[][] = generateMap(w, h, humidityScales, humidityInfluences);

    let tempScales: number[] = [40, 20, 10, 5];
    let tempInfluences: number[] = [30, 15, 20, 10];
    let tempMap: number[][] = generateMap(w, h, tempScales, tempInfluences);

    //account for elevation in temperature
    for(let y = 0; y < heightMap.length; y++){
        for(let x = 0; x < heightMap[0].length; x++){
            tempMap[y][x] -= heightMap[y][x] / 1.8;
        }
    }

    let map: number[][][] = [];

    for(let y = 0; y < heightMap.length; y++){
        map.push([]);
        for(let x = 0; x < heightMap[0].length; x++){
            let biome = getBiome(heightMap[y][x], humidityMap[y][x], tempMap[y][x]);
            let entity = getEntity(biome);
            map[map.length - 1].push([biome, entity]);
        }
    }
    return map;
}

function getEntity(biome): number{
    if(biome === 2)
        if(Math.random() < 0.05)
            return 1;
    if(biome === 3)
        if(Math.random() < 0.4)
            return 0;
    if(biome === 7)
        if(Math.random() < 0.06)
            return 2;
    return -1;
}

function getBiome(height: number, humidity: number, temp: number): number{
    let options = [0, 3, 6, 1, 7, 8, 2, 4, 5];
    if(temp < -10){
        options = remove(options, [2]);
    }
    if(temp < 12){
        options = remove(options, [7]);
    }
    if(temp > 15){
        options = remove(options, [5]);
    }
    if(height > 45){
        options = removeAllBut(options, [4, 5]);
    } else {
        options = remove(options, [4, 5]);
    }
    
    if(humidity < -10){
        options = remove(options, [5, 3, 6, 1]);
    }
    if(humidity > 20){
        options = remove(options, [2]);
    }
    if(humidity > 28){
        options = remove(options, [4]);
    }
    if(height > 17){
        options = remove(options, [0]);
    }
    if(humidity > 20){
        options = remove(options, [1]);
    }
    if(height > 20){
        options = remove(options, [1, 8]);
    }
    if(temp > 16 && humidity < 5){
        options = removeAllBut(options, [1, 8, 7]);
    }

    // if(options.length) console.log(options);
    if(options.length) {
        return options[0];
    }
    //backup if no matches
    if(height > 60){
        return 5
    } else if(height > 50){
        return 4;
    } else if(height > 36){
        return 3;
    } else if(height > 25){
        return 2;
    } else if(height > 10){
        return 1;
    }
    return 0;
}

function removeAllBut(arr: number[], vals: number[]){
    return arr.filter(val => vals.includes(val));
}

function remove(arr: number[], vals: number[]){
    return arr.filter(val => !vals.includes(val));
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