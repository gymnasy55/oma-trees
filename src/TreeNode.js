var Node = function(data, right, left) {
  this.data = data;
  this.right = right || null;
  this.left = left || null;
};

module.exports = Node;