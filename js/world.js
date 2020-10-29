class World {
    constructor(width, height, depth) {
        this.width = width; // x
        this.height = height; // y
        this.depth = depth; // z
        this.center = {
            x: Math.floor(width / 2),
            y: Math.floor(height / 2),
            z: Math.floor(depth / 2)
        };
        this.cells = [];

        for(let i = 0; i < height * width * depth; i++) {
            let x = Math.floor(i % height);
            let y = Math.floor(( i / height ) % width);
            let z = Math.floor(i / ( height * width ));
            this.cells[i] = new Cell(i, x, y, z);    
        }
    }

    getCellNeighbors(cell) {
        const n000100 = this.getCellByCoords(cell.position.x,      cell.position.y + 1,  cell.position.z);
        const n000101 = this.getCellByCoords(cell.position.x,      cell.position.y + 1,  cell.position.z + 1);
        const n000111 = this.getCellByCoords(cell.position.x,      cell.position.y + 1,  cell.position.z - 1);
        const n010100 = this.getCellByCoords(cell.position.x + 1,  cell.position.y + 1,  cell.position.z);
        const n010101 = this.getCellByCoords(cell.position.x + 1,  cell.position.y + 1,  cell.position.z + 1)
        const n010111 = this.getCellByCoords(cell.position.x + 1,  cell.position.y + 1,  cell.position.z - 1)
        const n110100 = this.getCellByCoords(cell.position.x - 1,  cell.position.y + 1,  cell.position.z);
        const n110101 = this.getCellByCoords(cell.position.x - 1,  cell.position.y + 1,  cell.position.z + 1)
        const n110111 = this.getCellByCoords(cell.position.x - 1,  cell.position.y + 1,  cell.position.z - 1)

        const n001100 = this.getCellByCoords(cell.position.x,      cell.position.y - 1,  cell.position.z);
        const n001101 = this.getCellByCoords(cell.position.x,      cell.position.y - 1,  cell.position.z + 1);
        const n001111 = this.getCellByCoords(cell.position.x,      cell.position.y - 1,  cell.position.z - 1);
        const n011100 = this.getCellByCoords(cell.position.x + 1,  cell.position.y - 1,  cell.position.z);
        const n011101 = this.getCellByCoords(cell.position.x + 1,  cell.position.y - 1,  cell.position.z + 1);
        const n011111 = this.getCellByCoords(cell.position.x + 1,  cell.position.y - 1,  cell.position.z - 1);
        const n111100 = this.getCellByCoords(cell.position.x - 1,  cell.position.y - 1,  cell.position.z);
        const n111101 = this.getCellByCoords(cell.position.x - 1,  cell.position.y - 1,  cell.position.z + 1);
        const n111111 = this.getCellByCoords(cell.position.x - 1,  cell.position.y - 1,  cell.position.z - 1);

        const n000001 = this.getCellByCoords(cell.position.x,      cell.position.y,       cell.position.z + 1);
        const n000011 = this.getCellByCoords(cell.position.x,      cell.position.y,       cell.position.z - 1);
        const n010000 = this.getCellByCoords(cell.position.x + 1,  cell.position.y,       cell.position.z);
        const n010001 = this.getCellByCoords(cell.position.x + 1,  cell.position.y,       cell.position.z + 1);
        const n010011 = this.getCellByCoords(cell.position.x + 1,  cell.position.y,       cell.position.z - 1);
        const n110000 = this.getCellByCoords(cell.position.x - 1,  cell.position.y,       cell.position.z);
        const n110001 = this.getCellByCoords(cell.position.x - 1,  cell.position.y,       cell.position.z + 1);
        const n110011 = this.getCellByCoords(cell.position.x - 1,  cell.position.y,       cell.position.z - 1);

        return [
            n000100, n000101, n000111, n010100, n010101, n010111, n110100, n110101, n110111,
            n001100, n001101, n001111, n011100, n011101, n011111, n111100, n111101, n111111,
            n000001, n000011, n010000, n010001, n010011, n110000, n110001, n110011
        ];
    }

    getCellByCoords(x, y, z) {
        return this.cells[x + y * this.width + z * this.width * this.height];
    }
}