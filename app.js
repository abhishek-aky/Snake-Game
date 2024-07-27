let canvas = document.querySelector('canvas'); // Board
let ctx = canvas.getContext('2d'); // brush

//---------------------- Step - 1 ---------------------------------------
let cellSize = 50;
let cellSize1 = 50;
let boardHeight = 600;
let boardWidth = 1000;
let direction;
//Snake ke cells jiski vajah se snake rectangle bn rha hai
//let snakeCells = [[0,0], [50,0], [100,0]]
let snakeCells = [ [0,0], [50,0],  [100,0]];


function foodgenerate(){
    return [
        Math.round((Math.random()*(boardWidth - cellSize))/cellSize)*cellSize,
        Math.round((Math.random()*(boardHeight - cellSize))/cellSize)*cellSize
    ]
}
let food = foodgenerate();


//Snake ko draw
function draw(){
    //erase poori board
    ctx.clearRect(0, 0, boardWidth, boardHeight)
    // draw
    for(let cell of snakeCells){
        ctx.fillStyle = 'red';

        ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
    }
    ctx.fillStyle = 'green';
    ctx.fillRect(food[0],food[1],cellSize,cellSize);
}
// harr thodi der baad snake update hoga
function update(){
    let headX = snakeCells[snakeCells.length-1][0];
    let headY = snakeCells[snakeCells.length-1][1];

    let newHeadX = headX + cellSize;
    let newHeadY = headY;
    if(direction ==='right'){ // Right
        newHeadX = headX + cellSize;
        newHeadY = headY;
    }
    else if(direction === 'left'){ // Left 
        newHeadX = headX - cellSize;
        newHeadY = headY;
    }
    else if(direction === 'up'){ // top
        newHeadX = headX;
        newHeadY = headY - cellSize;
    }
    else if(direction == 'down'){ // down
        newHeadX = headX;
        newHeadY = headY +cellSize;
    }
    snakeCells.push([newHeadX, newHeadY]);
    if(food[0] === newHeadX && food[1] === newHeadY){
        food = foodgenerate();
    }
    else{
        snakeCells.shift();
    }
    
}
document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowUp') direction = 'up';

    else if(e.key === 'ArrowRight') direction = 'right';

    else if(e.key === 'ArrowDown') direction = 'down';

    else if(e.key === 'ArrowLeft') direction = 'left';
})



setInterval(function(){
    update();
    draw();
},300)