const tree = new URL("./images/Pine Tree.png", import.meta.url).href;
const oak = new URL("./images/Oak-Tree.png", import.meta.url).href;
let treeElement = document.createElement("img");
let oakElement = document.createElement("img");
treeElement.src = tree;
oakElement.src = oak;

export let entities = {
    "tree": treeElement,
    "oak": oakElement
}