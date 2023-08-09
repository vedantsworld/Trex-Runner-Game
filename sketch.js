var trex, trex_running, trex_collided, trexGOimg;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var PLAY = 1
var END = 0
var gameState = PLAY
var gameOver, restart, gameOverImg, restartImg;


function preload() {

  trexGOimg = loadImage('trex_collided.png')

  gameOverImg = loadImage('gameOver.png')

  restartImg = loadImage('restart.png')

  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

}

function setup() {
  createCanvas(600, 200);

  gameOver = createSprite(300, 50)
  gameOver.addImage(gameOverImg)
  gameOver.scale = 0.5
  gameOver.visible = false

  restart = createSprite(300, 100)
  restart.addImage(restartImg)
  restart.scale = 0.5
  restart.visible = false

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.debug = true
  trex.setCollider('rectangle', 0, 0, 100, 100)
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  cloudsGroup = new Group()
  obstaclesGroup = new Group()

  score = 0;
}

function draw() {
  if (gameState === PLAY) {

    //score
    score = score + Math.round(frameCount / 60);
    //spawn the clouds
    spawnClouds();

    //spawn obstacles on the ground
    spawnObstacles();
  }
  else if (gameState === END) {
    ground.velocityX = 0;
    gameOver.visible = true
    restart.visible = true
    trex.changeAnimation('collided', trex_collided)
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
  }
  background(180);
  text("Score: " + score, 500, 50);


  if (keyDown("space") && trex.y >= 159) {
    trex.velocityY = -13;
  }
  console.log(trex.y)

  trex.velocityY = trex.velocityY + 0.8

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  trex.collide(invisibleGround);

  //game over
  if (trex.isTouching(obstaclesGroup)) {
    gameState = END
  }

  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(650, 165, 10, 40);
    obstacle.velocityX = -6;


    // generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;
      case 6: obstacle.addImage(obstacle6);
        break;
      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 500;

    obstaclesGroup.add(obstacle)
  }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 40, 10);
    cloud.y = Math.round(random(10, 60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud)
    console.log(cloudsGroup)
  }

}