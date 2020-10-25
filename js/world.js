class World {
    constructor(width, lenght, depth) {
        this.width = width; // x
        this.lenght = lenght; // y
        this.depth = depth; // z
        this.elements = [];

        for(let i = 0; i < lenght * width * depth; i++) {
            let x = Math.floor(i % lenght);
            let y = Math.floor(( i / lenght ) % width);
            let z = Math.floor(i / ( lenght * width ));
            this.elements[i] = new Element(i, x, y, z);    
        }
    }

    getElementNeighbors(e) {
        const n000100 = this.getElementByCoords(e.position.x,      e.position.y + 1,  e.position.z);
        const n000101 = this.getElementByCoords(e.position.x,      e.position.y + 1,  e.position.z + 1);
        const n000111 = this.getElementByCoords(e.position.x,      e.position.y + 1,  e.position.z - 1);
        const n010100 = this.getElementByCoords(e.position.x + 1,  e.position.y + 1,  e.position.z);
        const n010101 = this.getElementByCoords(e.position.x + 1,  e.position.y + 1,  e.position.z + 1)
        const n010111 = this.getElementByCoords(e.position.x + 1,  e.position.y + 1,  e.position.z - 1)
        const n110100 = this.getElementByCoords(e.position.x - 1,  e.position.y + 1,  e.position.z);
        const n110101 = this.getElementByCoords(e.position.x - 1,  e.position.y + 1,  e.position.z + 1)
        const n110111 = this.getElementByCoords(e.position.x - 1,  e.position.y + 1,  e.position.z - 1)

        const n001100 = this.getElementByCoords(e.position.x,      e.position.y - 1,  e.position.z);
        const n001101 = this.getElementByCoords(e.position.x,      e.position.y - 1,  e.position.z + 1);
        const n001111 = this.getElementByCoords(e.position.x,      e.position.y - 1,  e.position.z - 1);
        const n011100 = this.getElementByCoords(e.position.x + 1,  e.position.y - 1,  e.position.z);
        const n011101 = this.getElementByCoords(e.position.x + 1,  e.position.y - 1,  e.position.z + 1);
        const n011111 = this.getElementByCoords(e.position.x + 1,  e.position.y - 1,  e.position.z - 1);
        const n111100 = this.getElementByCoords(e.position.x - 1,  e.position.y - 1,  e.position.z);
        const n111101 = this.getElementByCoords(e.position.x - 1,  e.position.y - 1,  e.position.z + 1);
        const n111111 = this.getElementByCoords(e.position.x - 1,  e.position.y - 1,  e.position.z - 1);

        const n000001 = this.getElementByCoords(e.position.x,      e.position.y,       e.position.z + 1);
        const n000011 = this.getElementByCoords(e.position.x,      e.position.y,       e.position.z - 1);
        const n010000 = this.getElementByCoords(e.position.x + 1,  e.position.y,       e.position.z);
        const n010001 = this.getElementByCoords(e.position.x + 1,  e.position.y,       e.position.z + 1);
        const n010011 = this.getElementByCoords(e.position.x + 1,  e.position.y,       e.position.z - 1);
        const n110000 = this.getElementByCoords(e.position.x - 1,  e.position.y,       e.position.z);
        const n110001 = this.getElementByCoords(e.position.x - 1,  e.position.y,       e.position.z + 1);
        const n110011 = this.getElementByCoords(e.position.x - 1,  e.position.y,       e.position.z - 1);

        return [
            n000100, n000101, n000111, n010100, n010101, n010111, n110100, n110101, n110111,
            n001100, n001101, n001111, n011100, n011101, n011111, n111100, n111101, n111111,
            n000001, n000011, n010000, n010001, n010011, n110000, n110001, n110011
        ];
    }

    getElementByCoords(x, y, z) {
        return this.elements[x + y * this.width + z * this.width * this.lenght];
    }
}