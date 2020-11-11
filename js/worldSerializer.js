class WorldSerializer {
    serialize(world) {
        return JSON.stringify(this.worldToArrayOfAliveCells(world));
    }

    deserialize(world, jsonStringOfAliveCells) {
        const aliveCellsIndexes = JSON.parse(jsonStringOfAliveCells);
        this.arrayOfLifeCellsToWorld(world, aliveCellsIndexes);
    }

    worldToArrayOfAliveCells(world) {
        let aliveCellsIndexes = [];
        world.cells.forEach(cell => {
            if(cell.isAlive)
                aliveCellsIndexes.push(cell.index);
        });

        return aliveCellsIndexes;
    }

    arrayOfLifeCellsToWorld(world, aliveCellsIndexes) {
        aliveCellsIndexes.forEach(cellIndex => {
            world.cells[cellIndex].isAlive = true;
        })
    }
}