'use strict';

let RandomTreeMerge = {};

function fisherYates (array) {
    var temp, j;
    for (var i = array.length - 1; i >= 0; i--) {
        j = Math.floor (Math.random () * i);
        temp = array[i];
        array[i] = array[j]; 
        array[j] = temp;
    }
    return array;
};

/*
Abstract tree class
*/
class Node {
    constructor () {
    }
    addChild () {
    }
    removeChild () {
    }
    getParent () {
    }
    getChildren () {
    }
}

RandomTreeMerge.Node = Node;

/*
Walks tree, putting all nodes into an array
*/
RandomTreeMerge.getAllNodes = function (node, allNodes) {
    allNodes = typeof allNodes === 'undefined' ? [node] : allNodes; 
    let children = node.getChildren ();
    for (let i in children) {
        if (!(children[i] instanceof Node)) continue;
        allNodes.push (children[i]);
        RandomTreeMerge.getAllNodes (children[i], allNodes);    
    }
    return allNodes;
}

/*
Constructs random tree from given forest
*/
RandomTreeMerge.mergeTreesRandomly = function (nodes, constructor) {
    let randomTree;
    let allNodes = [];

    // get ramdomly ordered list of all nodes across forest
    for (let i in nodes) {
        allNodes = allNodes.concat (fisherYates (RandomTreeMerge.getAllNodes (nodes[i])));
    }

    // construct tree randomly
    let randomTreeNodes = [];
    for (let i in allNodes) {

        // select random parent from in-progress tree
        let randomParentIndex =  Math.floor (Math.random () * randomTreeNodes.length);

        // select random node from original forest
        let nextChild = allNodes[i];
        nextChild.removeChildren ();
        randomTreeNodes.push (nextChild);

        // add random node from original forest to random position in in-progress tree
        if (randomTreeNodes.length === 1) {
            randomTree = nextChild;
        } else {
            randomTreeNodes[randomParentIndex].addChild (nextChild);
        }
    }
    return randomTree;
}

module.exports = RandomTreeMerge;
