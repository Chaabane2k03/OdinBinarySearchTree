import Tree from "./Tree.js";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
Tree.prettyPrint(tree.root);
tree.insert(0);
tree.deleteItem(5);

Tree.prettyPrint(tree.root);