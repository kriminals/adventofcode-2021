let input = `xz-end
CJ-pt
pt-QW
hn-SP
pw-CJ
SP-end
hn-pt
GK-nj
fe-nj
CJ-nj
hn-ZZ
hn-start
hn-fe
ZZ-fe
SP-nj
SP-xz
ZZ-pt
nj-ZZ
start-ZZ
hn-GK
CJ-end
start-fe
CJ-xz`
let vertices = new Set(input.split('\n').flatMap(entry => entry.split('-')))
console.log(vertices)
let edges = input.split('\n').map(entry => entry.split('-'))
console.log(edges)
function createAdjacentVertices(edges) {
    // Initialise Empty Adjacent Vertices
    let adjacentVertices = new Map()
    for (let vertice of vertices) {
        adjacentVertices.set(vertice, [])
    }
    edges.forEach(edge => {
        adjacentVertices.get(edge[0]).push(edge[1])
        adjacentVertices.get(edge[1]).push(edge[0])
    });
    return adjacentVertices
}
let adjacentVertices = createAdjacentVertices(edges)
function findAdjacentVertices(vertix) {
    return adjacentVertices.get(vertix)
}

let sollutions = 0
function bfs(vertix, path) {
    let queue = findAdjacentVertices(vertix)
    path.push(vertix)
    
    queue.forEach(element => {
        if (element === 'end') {
            sollutions++
            return
        }
        if (path.includes(element) && (element.toLowerCase() === element)) {
            return 
        }
        let newPath = [...path]
        bfs(element, newPath)
    })
}
bfs('start', [])
console.log(sollutions)