var ITree = require('./ITree');
var Node = require('./TreeNode')

var BST = function () {
  this.root = null;
  this.size = 0;
};

BST.prototype = Object.create(ITree.prototype);
BST.prototype.constructor = BST;

function insertNode(node, newNode) {
  if (newNode.data < node.data) {
    if (node.left === null) {
      node.left = newNode;
    } else {
      insertNode(node.left, newNode);
    }
  } else {
    if (node.right === null) {
      node.right = newNode;
    } else {
      insertNode(node.right, newNode);
    }
  }
}

BST.prototype.insert = function (data) {
  var newNode = new Node(data);
  if (this.root === null) {
    this.root = newNode;
  } else {
    insertNode(this.root, newNode);
  }
  this.size++;
};

BST.prototype.init = function (array) {
  for (var i = 0; i < array.length; i++) {
    this.insert(array[i]);
  }
};

BST.prototype.clear = function () {
  this.root = null;
};

BST.prototype.size = function () {
  return this.size();
};

function aboba(node) {
  var result = [];
  var array = [];
  if (node.left) {
    array = aboba(node.left);
    result.push(...array);
  }

  result.push(node.data);

  if (node.right) {
    array = aboba(node.right);
    result.push(...array);
  }

  return result;
}

BST.prototype.print = function (node, callback) { // TODO: wtf is this ABOBA

};

BST.prototype.toArray = function () {
  return aboba(this.root);
};

function searchNode(node, data) {
  if (node === null) {
    return null;
  }
  if (node.data < data) {
    return searchNode(node.right, data);
  }

  if (node.data > data) {
    return searchNode(node.left, data);
  }

  return node;
}

BST.prototype.search = function (data) {
  if (this.root === null) {
    return null;
  } else {
    return searchNode(this.root, data);
  }
};

function tempWidth(node, level) {
  if (node === null) {
    return 0;
  }

  if (level === 1) {
    return 1;
  }

  return tempWidth(node.left, level - 1) + tempWidth(node.right, level - 1);
}

BST.prototype.width = function () {
  if (this.root === null) {
    return 0;
  }

  var maxWidth = 0;
  for (var i = 1; i < this.height(); i++) {
    var width = tempWidth(this.root, i);
    maxWidth = Math.max(maxWidth, width);
  }
  return maxWidth;
};

function tempHeight (node, result) {
  if (node.right === null && node.left === null) {
    return result;
  }

  if (node.right === null) {
    return tempHeight(node.left, result + 1);
  }

  if (node.left === null) {
    return tempHeight(node.right, result + 1);
  }

  return Math.max(tempHeight(node.right, result + 1), tempHeight(node.left, result + 1));
}

BST.prototype.height = function () {
  if (this.root === null) {
    return 0;
  }
  return tempHeight(this.root, 1);
};

BST.prototype.nodes = function () { // считаем "узлом" тот узел, у которого есть хотя бы один потомок
  return this.size - this.leaves();
};

function tempLeaves(node, result) {
  var tempResult = 0;

  if (node.left === null && node.right === null) {
    return result + 1;
  }

  if (node.left) {
    tempResult += tempLeaves(node.left, result);
  }

  if (node.right) {
    tempResult += tempLeaves(node.right, result);
  }

  return tempResult;
}

BST.prototype.leaves = function () {
  if (this.root === null) {
    return 0;
  }

  return tempLeaves(this.root, 0);
};

function tempReverse(node) {
  var temp = node.left;
  node.left = node.right;
  node.right = temp;

  if (node.left) {
    tempReverse(node.left)
  }

  if (node.right) {
    tempReverse(node.right)
  }
}

BST.prototype.reverse = function () {
  tempReverse(this.root);
};

BST.prototype.minNode = function () {
  var current = this.root;
  while (current.left) {
    current = current.left;
  }
  return current;
};

BST.prototype.maxNode = function () {
  var current = this.root;
  while (current.right) {
    current = current.right;
  }
  return current;
};

function findMinNode(node) {
  if(node.left === null) {
    return node;
  }

  return findMinNode(node.left)
}

function removeNode (node, value) {
  if (node === null) {
    return null;
  }

  if (value < node.data) {
    node.left = removeNode(node.left, value);
    return node;
  }

  if (value > node.data) {
    node.right = removeNode(node.right, value);
    return node;
  }

  if (node.left === null && node.right === null) {
    node = null;
    return node;
  }

  if (node.left === null) {
    node = node.right;
    return node;
  }

  if (node.right === null) {
    node = node.left;
    return node;
  }

  var temp = findMinNode(node.right);
  node.data = temp.data;
  node.right = removeNode(node.right, temp.data);
  return node;
}

BST.prototype.remove = function (value) {
  this.root = removeNode(this.root, value)
};

module.exports = BST;
