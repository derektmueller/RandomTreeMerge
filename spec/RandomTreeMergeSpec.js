'use strict';

describe('randomTreeMerge', () => {
    it('produces a tree which contains every node in source forest', () => {
        let random = require ('../RandomTreeMerge.js');

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

        var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        var expectedData = data.slice();

        let a = new TestNode(data.pop());
        a.addChild (new TestNode (data.pop()));
        a.addChild (new TestNode (data.pop()));
        a.addChild (new TestNode (data.pop()));
        a.addChild ((new TestNode (data.pop())).addChild (new TestNode (data.pop())));
        let b = new TestNode(data.pop());
        b.addChild (new TestNode (data.pop()));
        b.addChild (new TestNode (data.pop()));
        b.addChild (new TestNode (data.pop()));
        b.addChild (new TestNode (data.pop()));

        let randTree = random.mergeTreesRandomly ([a, b], TestNode);
        expect(
            random.getAllNodes (randTree).map (v => v.data).
                sort((a, b) => { return a - b; })).toEqual(expectedData);
    });
});
