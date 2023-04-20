const tree = new URL("./images/Pine Tree.png", import.meta.url).href;
let treeElement = document.createElement("img");
treeElement.src = tree;

export let entities = {
    "tree": treeElement
}