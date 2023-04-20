const tree = new URL("./images/Pine Tree.png", import.meta.url).href;
const oak = new URL("./images/Oak-Tree.png", import.meta.url).href;
const cactus = new URL("./images/Cactus.png", import.meta.url).href;
const palmA = new URL("./images/Palm-Tree-A.png", import.meta.url).href;
const palmB = new URL("./images/Palm-Tree-B.png", import.meta.url).href;
let treeElement = document.createElement("img");
let oakElement = document.createElement("img");
let cactusElement = document.createElement("img");
let palmAElement = document.createElement("img");
let palmBElement = document.createElement("img");
treeElement.src = tree;
oakElement.src = oak;
cactusElement.src = cactus;
palmAElement.src = palmA;
palmBElement.src = palmB;

export let entities = {
    "tree": treeElement,    //0
    "oak": oakElement,      //1
    "cactus": cactusElement,//2
    "palmA": palmAElement,  //3
    "palmB": palmBElement   //4
}