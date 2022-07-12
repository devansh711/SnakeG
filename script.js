/*jshint esversion: 6 */
let cvs=document.getElementById("canvas");
let ctx = cvs.getContext("2d");
let dragon1=document.getElementById("dragon1");
let dragon2=document.getElementById("dragon2");

let box=32;
let move;
let score=0;
let sound=true;
//Images
let ground=new Image();
ground.src="Images/ground.jpg";

let food=new Image();
food.src="Images/food.png";

let gameover=new Image();
gameover.src="Images/gameover.png";

//Sounds
 let dead=new Audio();
 dead.src="audio/dead.mp3";
 let down=new Audio();
 down.src="audio/down.mp3";
 let left=new Audio();
 left.src="audio/left.mp3";
 let right=new Audio();
 right.src="audio/right.mp3";
 let up=new Audio();
 up.src="audio/up.mp3";
 let eat=new Audio();
 eat.src="audio/eat.mp3";




//Snake array
let snake=[];
snake[0]=
{
  x:3*32,
  y:6*32
};
//Food object
let foodi=
{
  x:Math.floor(Math.random() *17 +1)*box,
  y:Math.floor(Math.random()*15 +3)*box,
};

//Event Listener
document.addEventListener("keydown",function(e){
  if(e.keyCode==37 && move!="Right")
  {
    move="Left";
    if(sound)
    left.play();

  }
  else if(e.keyCode==38 && move!="Down")
  {
    move="Up";
    if(sound)
    up.play();
  }
  else if(e.keyCode==39 && move!="Left")
  {
    move="Right";
    if(sound)
    right.play();
  }
  else if(e.keyCode==40 && move!="Up")
  {
    move="Down";
    if(sound)
    down.play();
  }
  console.log(move);
});

function draw()
{
  for(let i=0;i<snake.length;i++)
  {

    ctx.fillStyle=(i%2==0 && i!=0)?"black":"yellow";
    if(i==0)
    ctx.fillStyle="green";
    ctx.fillRect(snake[i].x,snake[i].y,box,box);
    ctx.strokeStyle="#000000";
    ctx.strokeRect(snake[i].x,snake[i].y,box,box);
  }
  let snakex=snake[0].x;
  let snakey=snake[0].y;

  if(move=="Left")
  {
      snakex=snakex-32;
  }
  else if(move=="Right")
  {
      snakex=snakex+32;
  }
  else if(move=="Up")
  {
      snakey=snakey-32;
  }
  else if(move=="Down")
  {
      snakey=snakey+32;
  }
  let newhead=
  {
    x:snakex,
    y:snakey
  };
  if(snakex==foodi.x && snakey==foodi.y)
  {
    score++;
    eat.play();
    foodi.x=Math.floor(Math.random() *17 +1)*box;
    foodi.y=Math.floor(Math.random()*15 +3)*box;
  }
  else
  {
    snake.pop();
  }
  function collision(newhead,snake)
  {
    for(let i=0;i<snake.length;i++)
    {
      if(snake[i].x==newhead.x && snake[i].y==newhead.y)
      {
        return true;
      }
    }
    return false;
  }
  //Game Over Logic
  function dragon()
  {
    dragon1.style.display="block";
    dragon2.style.display="block";
  }
  if(snakex<box|| snakex>box*17||snakey<box*3 || snakey>box*17 || collision(newhead,snake))
  {
      dragon();
      dead.play();
      clearInterval(game);
      ctx.drawImage(gameover,0,0,512,371,cvs.width/2-100,cvs.height/2-100,200,200);
      sound=false;

  }
  snake.unshift(newhead);
  ctx.fillStyle="#ffffff";
  ctx.font="40px impact";
  ctx.fillText(score,box*2.2,box*1.6);
  ctx.drawImage(food,0,0,box,box,foodi.x,foodi.y,box,box);
}
function loop()
{
  ctx.drawImage(ground,0,0,608,608,0,0,608,608);
  draw();
}
let game=setInterval(loop,100);
