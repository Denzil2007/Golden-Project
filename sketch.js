var canvas;
var boy,boyImg;
var stone,stoneImg;
var mango,mangoImg;
var music;
var bg,bgImg;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var invisibleGround;
var stonesGroup,mangoesGroup;
var gameOver, restart;

function preload(){
    music = loadSound("music.mp3");
    boyImg = loadAnimation("images/boy1.png","images/boy2.png");
    stoneImg = loadImage("images/Stone1.png");
    mangoImg = loadImage("images/Mango.png")
    bgImg = loadImage("images/Bg.jpg")
    gameOverImg = loadImage("images/gameOver.png");
    restartImg = loadImage("images/restart.png");
}

function setup(){
    canvas = createCanvas(1200,600);    
    
    bg = createSprite(600,300,1200,600);
    bg.addImage("bg",bgImg);
    bg.x = bg.width /2;
    bg.velocityX = -(6 + 3*score/100);
    
    boy = createSprite(150,500);
    boy.addAnimation("boy",boyImg);
    boy.scale = 2.5;

    gameOver = createSprite(600,200);
    gameOver.addImage(gameOverImg);
  
    restart = createSprite(600,300);
    restart.addImage(restartImg);
  
    gameOver.scale = 1;
    restart.scale = 1;

    gameOver.visible = false;
    restart.visible = false;
    
    invisibleGround = createSprite(600,550,1200,10);
    invisibleGround.visible = false;    

    stonesGroup = new Group();
    mangoesGroup = new Group();
}

function draw() {
    background(bgImg);
    if (gameState===PLAY){

        spawnStone();
        spawnMango();
        if(mangoesGroup.isTouching(boy)){
            score = score + 50;
            mangoesGroup.destroyEach();
        }

        bg.velocityX = -(6 + 3*score/100);

        if(keyDown("up") && boy.y >= 350) {
            boy.velocityY = -12;
        }
    
        boy.velocityY = boy.velocityY + 0.8
    
        if (bg.x < 300){
            bg.x = bg.width/2;
        }
    
        boy.collide(invisibleGround);

        if(stonesGroup.isTouching(boy)){
            gameState = END;
        }
    }
    else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
    
        //set velcity of each game object to 0
        bg.velocityX = 0;
        boy.velocityY = 0;
        stonesGroup.setVelocityXEach(0);
        mangoesGroup.setVelocityXEach(0);
        
        //set lifetime of the game objects so that they are never destroyed
        stonesGroup.setLifetimeEach(-1);
        
        if(mousePressedOver(restart)) {
        reset();
        }
    }
    
    drawSprites();
    textSize(35);
    text("Score : " + score , 500,50);
}

    

function spawnStone(){
    if(frameCount % 250 === 0){
        stone = createSprite(1150,510);
        stone.addImage("stone",stoneImg)
        stone.scale = 0.4;
        stone.velocityX = -3;
        stonesGroup.add(stone);
    }
}

function spawnMango(){
    if(frameCount % 300 === 0){
        mango = createSprite(1150,300);
        mango.addImage("mango",mangoImg)
        mango.scale = 0.2;
        mango.velocityX = -3;
        mangoesGroup.add(mango);
    }
}
    
function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    stonesGroup.destroyEach();
    mangoesGroup.destroyEach();

    score = 0;
    
  }