var BST = require('./BST');

var tree = new BST();
tree.insert(4);
tree.insert(1);
tree.insert(5);
tree.insert(2);
tree.insert(3);
console.log(tree.toArray());
tree.reverse();
console.log(tree.toArray())