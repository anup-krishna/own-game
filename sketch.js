var PLAY=1;
var END=0;
var gameState=PLAY;
var trash,trash1,trash2,trash3,trash4;
var shooter;
var alien,alienImg,alienImg2,alienImg3,alienImg4;
var backroundImg,backroundImg1,backroundImg2;
var back,back1,back2;
var spaceship,spaceshipImg;
var bag,bagImg;
var bullet,bulletImg;
var life1,life2,life3;
var reset,resetImg;
var invisible;
var lifeCount=0;
var score=0;
var score2=0;


function preload(){
  backroundImg=loadImage("star backgrounds.jpg");
  backroundImg1=loadImage("background1.png");
  backroundImg2=loadImage("background2.png");
  spaceshipImg=loadImage("spaceship.png");
  bagImg=loadImage("bag.png");
  alienImg=loadImage("alien.png");
  alienImg2=loadImage("alien2.png");
  alienImg3=loadImage("alien3.png");
  alienImg4=loadImage("alien4.png");
  trash1=loadImage("trash1.png");
  trash2=loadImage("trash2.png");
  trash3=loadImage("trash3.png");
  trash4=loadImage("trash.png");
  bulletImg=loadImage("bullet.png");
  resetImg=loadImage("reset.png");
}



function setup() {
  createCanvas(800,1500);
  back=createSprite(400,400,1000,1000) 
  back.addImage(backroundImg);
  back.scale = 6; 
  back.velocityY=2+(score/5);
    
  bag=createSprite(400,400,10,10) 
  bag.addImage(bagImg);
  bag.scale =0.5;
  
  invisible=createSprite(400,1495,1495,10);
  invisible.visible=false;
  
  life1=createSprite(70,1400,10,10) 
  life1.addImage(spaceshipImg);
  life1.scale = 0.15; 
  
  life2=createSprite(180,1400,10,10) 
  life2.addImage(spaceshipImg);
  life2.scale = 0.15; 
  
  life3=createSprite(290,1400,10,10) 
  life3.addImage(spaceshipImg);
  life3.scale = 0.15; 
  
  spaceship=createSprite(500,1350,10,10) 
  spaceship.addImage(spaceshipImg);
  spaceship.scale = 0.4;
  
  
  garbageGroup = createGroup();
  AlienGroup = createGroup();
  bulletGroup = createGroup();
  
}

function draw() {
   background(0)
  if(gameState === PLAY){
  
  if(back.y>800){
    back.y=400;
  }
  
  //spaceship.y= World.mouseY;
  //spaceship.x=World.mouseX;
  
  
  bag.y=spaceship.y+150;
  bag.x=spaceship.x;
  
  Trash();
  
  if(garbageGroup.isTouching(bag)){
    score=score+5;
    garbageGroup.destroyEach();
  }
  
  
  if(score>=40 && score<60 || score>=120 && score<160 || score>=220 && score<260 || score>=340 && score<380 ){
  //back2=createSprite(400,400,1000,1000) 
  back.addImage(backroundImg2);
  //back.scale = 4;
  //back.velocityY=2;
  
    }
  
  
  else if(score>=60 && score<100 || score>160 && score<180 || score>=260 && score<300 || score>=380 && score<420 || score>=460 && score<500){
  //back2=createSprite(400,400,1000,1000) 
  back.addImage(backroundImg);
  //back.scale = 4;
  //back.velocityY=2;
  
    }
  
  
 else if(score>100 && score<120 || score>180 && score<220 || score>=300 && score<340 || score>=420 && score<460){
  //back1=createSprite(400,1,1000,1000) 
  back.addImage(backroundImg1);

  
    }
  
    createalien();
  
  if(keyWentDown("s")){
     Bullet();
     }
  
  if(AlienGroup.isTouching(bulletGroup)){
    score2=score2+1;
    bulletGroup.destroyEach();
  }
  
  if(score2 === 3){
     AlienGroup.destroyEach();
     }
  
  
  if(keyDown(RIGHT_ARROW)){
    spaceship.x=spaceship.x+20+(score/6);
  }
  if(keyDown(LEFT_ARROW)){
    spaceship.x=spaceship.x-20-(score/6);
  }
  if(keyDown(UP_ARROW)){
    spaceship.y=spaceship.y-20-(score/6);
  }
  if(keyDown(DOWN_ARROW)){
    spaceship.y=spaceship.y+20+(score/6);
  }
  
  if(AlienGroup.isTouching(spaceship)){
     lifeCount=lifeCount+1;
     }
    
    
    
  if(garbageGroup.isTouching(invisible)){
     lifeCount+=1;
    garbageGroup.destroyEach();
     }
    if(lifeCount === 1){
      life3.destroy();
    }
    
     if(lifeCount === 2){
      life2.destroy();
    }
    
     if(lifeCount === 3){
      life3.destroy();
    }
  
  if(lifeCount === 3){
     gameState = END;
     }
  }
  
  if(gameState === END){
     garbageGroup.setVelocityYEach(0);
     AlienGroup.setVelocityYEach(0);
     back.destroy();
     spaceship.destroy();
     bag.destroy();
     garbageGroup.destroyEach();
     AlienGroup.destroyEach();
     life1.destroy();
    life2.destroy();
    life3.destroy();
    reset=createSprite(400,750);
    reset.addImage(resetImg);
    if(mousePressedOver(reset)){
       restart();
       }
     }
    
  drawSprites();
  
  fill("white")
  textSize(30)
  text("score : "+score,600,100)
  
  }

 function Trash(){
  if(World.frameCount%100===0){
    if(World.frameCount/100!=2){
    x=Math.round(random(100,700));
    trash = createSprite(x,0,20,20);
    trash.velocityY=10+(score/5);
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: trash.addImage(trash1);
        trash.scale=0.4;
              break;
      case 2: trash.addImage(trash2);
        trash.scale=0.05;
              break;
      case 3: trash.addImage(trash3);
        trash.scale=0.2;
              break;
      case 4: trash.addImage(trash4);
        trash.scale=0.2;
              break;
      default: break;
    }
       spaceship.depth=trash.depth+1;
       bag.depth=trash.depth+1;
    garbageGroup.add(trash);
    trash.lifetime=150;
    }
  }
}

function Bullet() {
  var bullet= createSprite(100, 100, 60, 10);
  bullet.addImage(bulletImg);
  bullet.x = spaceship.x;
  bullet.y=spaceship.y-150;
  bullet.velocityY = -15;
  bullet.scale = 0.04;
 
  bulletGroup.add(bullet);
}
  


function createalien(){
  if(World.frameCount%200===0){
    x=Math.round(random(100,700));
    alien = createSprite(x,0,20,20);``
      alien.velocityY=2;
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: alien.addImage(alienImg);
        alien.scale=0.4;
              break;
      case 2: alien.addImage(alienImg2);
        alien.scale=0.7;
              break;
      case 3: alien.addImage(alienImg3);
              break;
      case 4: alien.addImage(alienImg4);
        alien.scale=0.2;
              break;
      default: break;
    }
    AlienGroup.add(alien);
    alien.lifetime=750;
  }
}

 function restart(){
   
   gameState =PLAY
   
   back=createSprite(400,400,1000,1000) 
  back.addImage(backroundImg);
  back.scale = 6; 
  back.velocityY=2+(score/5);
    
  bag=createSprite(400,400,10,10) 
  bag.addImage(bagImg);
  bag.scale =0.5;
  
  invisible=createSprite(400,1495,1495,10);
  invisible.visible=false;
  
  life1=createSprite(70,1400,10,10) 
  life1.addImage(spaceshipImg);
  life1.scale = 0.15; 
  
  life2=createSprite(180,1400,10,10) 
  life2.addImage(spaceshipImg);
  life2.scale = 0.15; 
  
  life3=createSprite(290,1400,10,10) 
  life3.addImage(spaceshipImg);
  life3.scale = 0.15; 
  
  spaceship=createSprite(500,1350,10,10) 
  spaceship.addImage(spaceshipImg);
  spaceship.scale = 0.4;
   
   lifeCount=0;
   score=0;
   score2=0;
   
 }