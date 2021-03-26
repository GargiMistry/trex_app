var trex, trex_run,cloud,cloudimg;
var ground, groundImg, ground2;
var ob,ob1,ob2,ob3,ob4,ob5,ob6;
var score=0, play=0, end=1, gameState=play;
var cactusg, cloudg,trexend;
var go1,go,re,re1,h=0,jump,cp,die; 


function preload(){
  trex_run=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImg=loadImage("ground2.png");
  cloudimg=loadImage("cloud.png");
  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  trexend=loadAnimation("trex_collided.png");
  go1=loadImage("gameOver.png");
  re1=loadImage("restart.png");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  cp=loadSound("checkPoint.mp3");
  
  
}


function setup(){
  createCanvas(windowWidth,windowHeight);
 
  trex=createSprite(45,height-50,20,50);
  trex.addAnimation("running",trex_run);
  trex.scale=0.5;
  trex.addAnimation("trex1",trexend);
  
  ground=createSprite(width/2,height-40,width,5);
  ground.addImage(groundImg);

  ground2=createSprite(width/2,height-35,width,5);
  ground2.visible=false;
  
  cactusg=new Group();
  cloudg=new Group();
  
  trex.debug=false;
  trex.setCollider("rectangle",0,0,90,trex.height);
  
  go=createSprite(width/2,height/2,50,10)
  go.addImage(go1);
 go.scale=0.6;
  re=createSprite(width/2,height/2,50,10)
  re.addImage(re1);
 re.scale=0.3;
 
  
}




function draw(){
  
  background("deeppink");
  
 
  
  fill(255);
  textSize(16);
  text("Score:"+score,width-100,20);
  text("HS:"+h,width-200,20);
  
  if(score>h){
    h=score;
  }
  
  if(score>0 && score%100===0){
    cp.play();
    
  }
  
  if(gameState===play){
    
     go.visible=false;
     re.visible=false;
    
    trex.changeAnimation("running",trex_run)
    
     score = score + Math.round(getFrameRate()/61);
    
  ground.velocityX = -(3+Math.round(score/200));
    
    if((keyDown("space") || touches.length>0)  && trex.y>height-50){
    trex.velocityY=-12; 
    jump.play();
    touches=[];
      
  }
    
    if(ground.x<0){
  ground.x=ground.width/2
}
   
   trex.velocityY=trex.velocityY+0.4;
    
  spawnClouds();
  
  spawnCactus();
  
    if(trex.isTouching(cactusg)){
    gameState=end;
      die.play();
    }
  }
  
  if(gameState===end){  
     go.visible=true;
     re.visible=true;
    ground.velocityX=0;
    trex.velocityY=0;
    cloudg.setVelocityXEach(0);
    cactusg.setVelocityXEach(0);
    cloudg.setLifetimeEach(-1); 
    cactusg.setLifetimeEach(-1);
    trex.changeAnimation("trex1",trexend);
    
    if(mousePressedOver(re) || touches.length>0){
      reset();
      touches=[];
    }
  }
  
  trex.collide(ground2);
  
  drawSprites();
}

function reset(){
  gameState=play;
  cactusg.destroyEach();
  cloudg.destroyEach();
  score=0;
}

function spawnClouds(){
  
  if(frameCount %80===1){
  cloud=createSprite(width,random(20,50),10,10);
    cloud.scale=0.5;
  cloud.velocityX=-3;
  cloud.addImage(cloudimg); 
  cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
   cloud.lifetime=width/2;
  cloudg.add(cloud);
    
  }
  
}

function spawnCactus(){
  if(frameCount %160 ===0){
  ob=createSprite(width,height-55,10,10);
  ob.velocityX=-(3+Math.round(score/200));
  ob.scale=0.5;
    ob.lifetime=width/2;
cactusg.add(ob);
    
    var a = Math.round(random(1,6));
    switch(a){
        
      case 1: ob.addImage(ob1);
      break;
      
        case 2: ob.addImage(ob2);
      break;
      
        case 3: ob.addImage(ob3);
      break;
      
        case 4: ob.addImage(ob4);
      break;
      
        case 5: ob.addImage(ob5);
      break;
      
        case 6: ob.addImage(ob6);
      break;
      
      default: break
      
    }
    
  }
  }
