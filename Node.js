export default class Node{
    constructor(data){
        this.data = data
        this.left = null
        this.right = null
    }

    display(){
        console.log(this.data);
    }
}