class WorldSerializer {
    static serialize(world) {
        return JSON.stringify(this.worldToArrayOfAliveCells(world));
    }

    static deserialize(world, jsonStringOfAliveCells) {
        const aliveCellsIndexes = JSON.parse(jsonStringOfAliveCells);
        this.arrayOfLifeCellsToWorld(world, aliveCellsIndexes);
    }

    static worldToArrayOfAliveCells(world) {
        let aliveCellsIndexes = [];
        world.cells.forEach(cell => {
            if(cell.isAlive)
                aliveCellsIndexes.push(cell.index);
        });

        return aliveCellsIndexes;
    }

    static arrayOfLifeCellsToWorld(world, aliveCellsIndexes) {
        aliveCellsIndexes.forEach(cellIndex => {
            world.cells[cellIndex].isAlive = true;
        })
    }
}