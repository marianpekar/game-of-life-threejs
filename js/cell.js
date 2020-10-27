class Cell {
    constructor(index, x, y, z) {
        this.index = index;
        this.position = {x: x, y: y, z: z};
        this.isAlive = false;
        this.shouldDie = false;
        this.shouldBorn = false;
    }

    born() {
        this.isAlive = true;
        return this;
    }

    die() {
        this.isAlive = false;
        return this;
    }

    toggle() {
        this.isAlive = !this.isAlive;
        return this;
    }
}