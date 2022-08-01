let speed=7;
let canvas;
let context;
let tilesize=20;
let snake=[{x:200,y:200},{x:180,y:200},{x:160,y:200},{x:140,y:200},{x:120,y:200}];
let xdirection=20;
let ydirection=0;
let applex=100;
let appley=100;
let score=0;
let score_text=document.getElementById("score-content");
let gameovertext=document.getElementById("gameover");
canvas =document.getElementById("canvas");
context=canvas.getContext("2d");
let audio=new Audio('gamemusic.mp3');
let gameovermusic=new Audio('gameover.wav');
let foodmusic=new Audio('foodmusic.wav')


"use strict";

gameloop();
function gameloop()
{   if(has_game_ended()) return;
    setTimeout(function onTick()
        {
        audio.play();
      
        clearscreen();
        changesnakeposition();
        drawsnakefood();
        drawsnake();
        gameloop();
        } ,1000/speed)
       
}
function changesnakeposition(){
    const head={x:snake[0].x+xdirection,y:snake[0].y+ydirection};
    snake.unshift(head);
    if(snake[0].x==applex && snake[0].y==appley){
        speed=speed+0.5;
        score+=1;
        score_text.innerHTML=" "+score;
        foodmusic.play()
        generatefood();
    }
    else{
        snake.pop()
    }
}
function generatefood(){
    applex=Math.round((Math.random()*((canvas.width-tilesize)-0)+0)/tilesize)*tilesize;
    appley=Math.round((Math.random()*((canvas.height-tilesize)-0)+0)/tilesize)*tilesize;
}
function drawsnake(){
for(let i=0;i<snake.length;i++){ 
        if(i==0){
        context.fillStyle='#ffffff';
        context.trokestyle="#ff5733";
        context.fillRect(snake[0].x,snake[0].y,tilesize,tilesize);
        context.strokeRect(snake[0].x,snake[0].y,tilesize,tilesize);
        }
        else{
        context.fillStyle='#ff5733';
        context.trokestyle="#ffffff";
        context.fillRect(snake[i].x,snake[i].y,tilesize,tilesize);
        context.strokeRect(snake[i].x,snake[i].y,tilesize,tilesize);
    }
    
}
}


function drawsnakefood(){
context.fillStyle="#32cd32";
context.strokestyle="#ffffff";
context.fillRect(applex,appley,tilesize,tilesize);
context.strokeRect(applex,appley,tilesize,tilesize);
}
function clearscreen(){
    context.clearRect(0,0,canvas.width,canvas.height);
}
function has_game_ended(){
for (let i=1;i<snake.length;i++){
    if(snake[i].x==snake[0].x && snake[i].y==snake[0].y ){
        gameovertext.style.display="block";
        audio.pause();
        gameovermusic.play();
        return true;
    }
    if(snake[0].x<20 || snake[0].x>=600-20 || snake[0].y<20 || snake[0].y>=400-20){
        gameovertext.style.display="block";
        audio.pause();
        gameovermusic.play();
        return true;
        
    }

}

}

document.onkeydown = function(e){
    const keyPressed=e.keyCode;
    if(keyPressed===37 && xdirection!=20 ){
        ydirection=0;
        xdirection=-20;
    }
    else if(keyPressed===39 && xdirection!=-20){
        ydirection=0;
        xdirection=20;
    }
    else if(keyPressed===38 && ydirection!=20){
        ydirection=-20;
        xdirection=0;
    }
    else if(keyPressed===40 && ydirection!=-20){
        ydirection=20;
        xdirection=0;
    }
}
