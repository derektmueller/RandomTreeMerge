#!/usr/bin/node
'use strict';

let random = require ('./randomTreeMerge.js');

class TestNode extends random.Node {
    constructor (data) {
        super (data);
        this.data = data;
        this.parentNode = null;
        this.children = [];
    }
    destroy () {
        let parentsChildren = this.parentNode.getChildren ();
        for (var i in parentsChildren) {
            if (parentsChildren[i] === this) {
                delete parentsChildren[i];
                break;
            }
        }
    }
    addChild (node) {
        node.parentNode = this;
        this.children.push (node);
        return this;
    }
    getParent () {
    }
    getChildren () {
        return this.children;
    }
    removeChildren () {
        this.children = [];
    }
}


let a = new TestNode(1);
a.addChild (new TestNode (2));
a.addChild (new TestNode (3));
a.addChild (new TestNode (4));
a.addChild ((new TestNode (5)).addChild (new TestNode (6)));
let b = new TestNode(7);
b.addChild (new TestNode (8));
b.addChild (new TestNode (9));
b.addChild (new TestNode (10));
b.addChild (new TestNode (11));

let randTree = random.mergeTreesRandomly ([a, b], TestNode);
console.log (random.getAllNodes (randTree).map (v => v.data));

