let inputDir={x: 0,y: 0};
const foodsound=new Audio('eater.wav');
const gameOverSound= new Audio('Snake.mp3');
const moveSound= new Audio('eater.wav');
const musicSound= new Audio('Snake Song.mp3');
let speed=9 ;
let score=0;
let lastPaintTime= 0;
let snakeArr= [
{x: 13,y:15 }
]
food= {x: 6,y: 7} ; 

//gamefunction
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime - lastPaintTime)/1000 <  1/speed){
        return;
    }
    lastPaintTime= ctime;
    gameEngine();
}
function isCollide(snake)
{
    for (let i=1; i< snakeArr.length;i++){
        if(snake[i].x ===snake[0].x&& snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y>=18 || snake[0].y<=0 ){
        return true;
    }
}

function gameEngine(){
    //part1:update the snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir ={x: 0,y: 0};
        alert ("Game over! prees any key play again");
        snakeArr=[{x: 13,y: 15}];
        musicSound.play();
        score=0; 
    }
    //if you want.....
    if(snakeArr[0].y==food.y && snakeArr[0].x== food.x){
        foodsound.play(); 
        score += 1;
        scoreBox.innerHTML= "Score: " + score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y})
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)* Math.random()),y:Math.round(a+(b-a)* Math.random())}
    }

    //moving the snake
    for (let i=snakeArr.length -2; i>=0; i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //part 2 display the snake and food 
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement= document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;

        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
 });
 //display the food
       foodElement= document.createElement('div');
       foodElement.style.gridRowStart=food.y;
       foodElement.style.gridColumnStart=food.x;
       foodElement.classList.add('food');
       board.appendChild(foodElement);

} 
//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir= {x:0,y:1}
    moveSound.play();
    switch(e.key)
{
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;

}
});
