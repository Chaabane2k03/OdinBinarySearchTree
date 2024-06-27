import Node from "./Node.js";

export default class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    createTree(start, end, array) {
        if (start > end) {
            return null;
        }

        const mid = Math.floor((start + end) / 2);
        const node = new Node(array[mid]);

        node.left = this.createTree(start, mid - 1, array);
        node.right = this.createTree(mid + 1, end, array);

        return node;
    }

    buildTree(array) {
        if (array.length === 0) return null;

        // Sort the array and remove duplicates
        array = array.sort((a, b) => a - b);
        var unique = [array[0]];
        for (let i = 1; i < array.length; i++) {
            if (array[i - 1] !== array[i]) {
                unique.push(array[i]);
            }
        }

        return this.createTree(0, unique.length - 1, unique);
    }

    static prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            Tree.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            Tree.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    insert(data){
        this.root = this.addNode(data,this.root)
    }

    addNode(data, node){
        if (node === null){
            return new Node(data)
        }
        
        if (data <= node.data){
            node.left = this.addNode(data,node.left)

        }else{
            node.right = this.addNode(data,node.right)
        }

        return node;
    }

    deleteItem(data){
        this.root = this.delete_BST(data, this.root)
    }

    //Elle est fonctionnelle , mais besoin d'ameliorer :) 

    delete_BST(data,node){
        if (node === null) {
            return null;
        }

        if (data < node.data) {
            node.left = this.delete_BST(data, node.left);
        } else if (data > node.data) {
            node.right = this.delete_BST(data, node.right);
        } else {
            if (node.left === null && node.right === null) {
                return null;
            } else if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            } else {
                const minNode = this.findMin(node.right);
                node.data = minNode.data;
                node.right = this.delete_BST(minNode.data, node.right);
            }
        }
        return node;
    }

    findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

   


}
