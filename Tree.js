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
        let unique = [array[0]];
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

    insert(data) {
        this.root = this.addNode(data, this.root);
    }

    addNode(data, node) {
        if (node === null) {
            return new Node(data);
        }
        
        if (data <= node.data) {
            node.left = this.addNode(data, node.left);
        } else {
            node.right = this.addNode(data, node.right);
        }

        return node;
    }

    deleteItem(data) {
        this.root = this.#delete_BST(data, this.root);
    }

    #delete_BST(data, node) {
        if (node === null) {
            return null;
        }

        if (data < node.data) {
            node.left = this.#delete_BST(data, node.left);
        } else if (data > node.data) {
            node.right = this.#delete_BST(data, node.right);
        } else {
            return this.#deleteNode(node);
        }
        return node;
    }

    #findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    #deleteNode(node) {
        if (node.left === null && node.right === null) {
            return null;
        } else if (node.left === null) {
            return node.right;
        } else if (node.right === null) {
            return node.left;
        } else {
            return this.#updateNode(node);
        }
    }

    #updateNode(node) {
        const minNode = this.#findMin(node.right);
        node.data = minNode.data;
        node.right = this.#delete_BST(minNode.data, node.right);
        return node;
    }

    find(data, root = this.root) {
        if (root === null) {
            return null;
        } else {
            if (root.data === data) {
                return root;
            } else {
                if (data < root.data) {
                    return this.find(data, root.left);
                } else {
                    return this.find(data, root.right);
                }
            }
        }
    }

    levelOrder(callback) {
        const file = [this.root];
        const levelOrderList = [];

        while (file.length > 0) {
            const currentNode = file.shift();
            
            callback ? callback(currentNode) : levelOrderList.push(currentNode.data);

            if (currentNode.left !== null) {
                file.push(currentNode.left);
            }

            if (currentNode.right !== null) {
                file.push(currentNode.right);
            }
        }

        return levelOrderList;
    }

    inorder(callback, node = this.root, list = []) {
        if (node === null) {
            return;
        }

        this.inorder(callback, node.left, list);
        callback ? callback(node) : list.push(node.data);
        this.inorder(callback, node.right, list);

        return list;
    }

    preorder(callback, node = this.root, list = []) {
        if (node === null) {
            return;
        }

        callback ? callback(node) : list.push(node.data);
        this.preorder(callback, node.left, list);
        this.preorder(callback, node.right, list);

        return list;
    }

    postorder(callback, node = this.root, list = []) {
        if (node === null) {
            return;
        }
    
        this.postorder(callback, node.left, list);
        this.postorder(callback, node.right, list);
        callback ? callback(node) : list.push(node.data);

        return list;
    }

    height(node = this.root) {
        if (node === null) return 0;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node, data) {
        if (node === null) {
            return -1;
        }

        var dist = -1;

        if ((node.data === data) || (dist = this.depth(node.right, data)) >= 0 || (dist = this.depth(node.left, data)) >= 0) {
            return dist + 1;
        }

        return dist;
    }

    isBalanced() {
        return this.#testBalance(this.root) !== -1;
    }

    #testBalance(node) {
        if (node === null) return 0;

        const leftBalance = this.#testBalance(node.left);
        const rightBalance = this.#testBalance(node.right);

        const diff = Math.abs(leftBalance - rightBalance);

        if (leftBalance === -1 || rightBalance === -1 || diff > 1) {
            return -1;
        } else {
            return Math.max(leftBalance, rightBalance) + 1;
        }
    }

    rebalance() {
        const list = this.inorder();
        this.root = this.buildTree(list);
    }
}