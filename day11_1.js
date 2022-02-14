let input = `6617113584
6544218638
5457331488
1135675587
1221353216
1811124378
1387864368
4427637262
6778645486
3682146745`

let grid = input.split('\n').map(entry => entry.split('').map(entry => parseInt(entry)))

function increaseLevel(grid) {
    return grid.map(row => row.map(column => ++column)
    )
}

function increaseAdjacentLevel(point, grid) {
    let adjacentPoints = []
    const maxColIndex = 9
    const maxRowIndex = 9
    // right
    if (point[1] < maxColIndex) adjacentPoints.push([point[0], point[1] + 1])
    // left
    if (point[1] > 0) adjacentPoints.push([point[0], point[1] - 1])
    // up
    if (point[0] > 0) adjacentPoints.push([point[0] - 1, point[1]])
    // up Right
    if ((point[0] > 0) && (point[1] < maxColIndex)) adjacentPoints.push([point[0] - 1, point[1] + 1])
    // up Left
    if ((point[0] > 0) && (point[1] > 0)) adjacentPoints.push([point[0] - 1, point[1] - 1])
    // down 
    if (point[0] < maxRowIndex) adjacentPoints.push([point[0] + 1, point[1]])
    // down Right
    if ((point[0] < maxRowIndex) && (point[1] < maxColIndex)) adjacentPoints.push([point[0] + 1, point[1] + 1])
    // down Left
    if ((point[0] < maxRowIndex) && (point[1] > 0)) adjacentPoints.push([point[0] + 1, point[1] - 1])
    
    if (adjacentPoints.length > 0) {
        adjacentPoints.forEach(point => {
            (grid[point[0]][point[1]] != 0)? grid[point[0]][point[1]]++ : 0
        })
    }
    
    let adjacentFlashingPoints = findFlashingPoints(grid)
    if (adjacentFlashingPoints.length > 0) {
        adjacentFlashingPoints.forEach(point => {
            
            grid = increaseAdjacentLevel(point, resetFlashingPoints(grid))
        })
    }
    return grid
}

function findFlashingPoints(grid) {
    let flashingPoints =[]
    grid.forEach((row, indexRow) => {
        row.forEach((entry, indexColumn) => {
            if (entry > 9) flashingPoints.push([indexRow, indexColumn])
        })
    })
    return flashingPoints
}

function resetFlashingPoints(grid) {
    return grid.map(row => row.map(column => (column > 9) ? 0 : column))
}

function stimulate(step, grid) {
    if (grid.every(row => row.every(point => point ==0))) return step - 1
    
    let newGrid = increaseLevel(grid)
    
    let flashingPoints = findFlashingPoints(newGrid)
    if (flashingPoints.length > 0) {
        flashingPoints.forEach((point) => {
            newGrid = resetFlashingPoints(newGrid)
            newGrid = increaseAdjacentLevel(point, newGrid)
            
        })
    }
    
    return stimulate(++step, newGrid)
}
console.log(stimulate(1, grid))