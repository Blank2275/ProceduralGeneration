export function worldToScreenLocation(sx, sy, x, y){
    let nx = x + sx / 2;
    let ny = y + sy / 2;
    return [nx, ny];
}
