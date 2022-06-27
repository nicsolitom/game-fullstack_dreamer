class Game {
  constructor() {
    this.time = 0;
    this.stop = false;
    this.obstaclesArr = [];
    this.giftsArr = [];
  }

  intro() {
    this.introElement = document.createElement("div");
    this.introElement.className = "intro";
    this.introElement.style.width = "100%";
    this.introElement.style.height = "100%";
    this.introElement.style.background = "url('../img/the_unknown.png')";
    this.introElement.style.backgroundSize = "cover";
    this.introElement.style.backgroundPosition = "center";

    this.introHeader = document.createElement("h1");
    this.introHeader.innerHTML = "Fullstack <br /> Dreamer";
    this.introElement.appendChild(this.introHeader);

    this.introText = document.createElement("p");
    this.introText.innerText = "< press space to start >";
    this.introElement.appendChild(this.introText);

    const gameBoard = document.getElementById("game");
    gameBoard.appendChild(this.introElement);
    
    let counter = true;
    
    const introEventListen = document.addEventListener("keydown", (event) => {
        switch (event.key) {
          case " ":
        
            this.introElement.remove();
            game.start();
            break;
          }
        },{once : true});
      }
  
  start() {
    this.positionX = 0;
    this.levelOneBg = document.createElement("div");
    this.levelOneBg.id = "level-one-bg";
    this.levelOneBg.style.position = "absolute";
    this.levelOneBg.style.height = "100%";
    this.levelOneBg.style.width = "1000%";
    this.levelOneBg.style.left = this.positionX + "%";
    this.levelOneBg.style.background = "url('../img/mysterious_land.jpg')";
    this.levelOneBg.style.backgroundSize = "contain";

    const gameBoard = document.getElementById("game");
    gameBoard.appendChild(this.levelOneBg);

    const moveBgOne = setInterval(() => {
      this.positionX -= 1;
      this.levelOneBg.style.left = this.positionX + "%";
    }, 100)


    this.player = new Player();
    this.movementEventListeners();

    const addObstacle = setInterval(() => {
      const newObstacle = new Obstacle();
      this.obstaclesArr.push(newObstacle);

      this.time++;
      // console.log("TIME: ", this.time);
    }, 1200);

    const moveObstacle = setInterval(() => {
      this.obstaclesArr.forEach((obstacle) => {
        obstacle.moveLeft();
      });
    }, 200);

    const impactObstacle = setInterval(() => {
      this.obstaclesArr.forEach((obstacle) => {
        if (
          this.player.positionX < obstacle.positionX + obstacle.width &&
          this.player.positionX + this.player.width > obstacle.positionX &&
          this.player.positionY < obstacle.positionY + obstacle.height &&
          this.player.height + this.player.positionY > obstacle.positionY
        ) {
          console.log("Game Over");
        }
      });
    }, 50);
  }
  movementEventListeners() {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.player.moveUp();
          break;
        case "ArrowRight":
          this.player.moveRight();
          break;
        case "ArrowDown":
          this.player.moveDown();
          break;
        case "ArrowLeft":
          this.player.moveLeft();
          break;
        case " ":
          console.log("spacebar");
          break;
      }
    });
  }
}

class Player {
  constructor() {
    this.positionX = 5;
    this.positionY = 45;
    this.width = 10;
    this.height = 10;
    this.playerElement = null;
    this.createDomElement();
  }
  createDomElement() {
    this.playerElement = document.createElement("div");
    this.playerElement.className = "player";
    this.playerElement.style.left = this.positionX + "%";
    this.playerElement.style.bottom = this.positionY + "%";
    this.playerElement.style.width = this.width + "%";
    this.playerElement.style.height = this.height + "%";

    const gameBoard = document.getElementById("game");
    gameBoard.appendChild(this.playerElement);
  }
  moveUp() {
    switch (this.positionY) {
      case 90:
        break;
      default:
        this.positionY += 5;
        this.playerElement.style.bottom = this.positionY + "%";
        break;
    }
  }
  moveDown() {
    switch (this.positionY) {
      case 0:
        break;
      default:
        this.positionY -= 5;
        this.playerElement.style.bottom = this.positionY + "%";
        break;
    }
  }
  moveRight() {
    switch (this.positionX) {
      case 85:
        break;
      default:
        this.positionX += 5;
        this.playerElement.style.left = this.positionX + "%";
        break;
    }
  }
  moveLeft() {
    switch (this.positionX) {
      case 0:
        break;
      default:
        this.positionX -= 5;
        this.playerElement.style.left = this.positionX + "%";
        break;
    }
  }
}

class Obstacle {
  constructor() {
    this.positionX = 110;
    this.positionY = Math.floor(Math.random() * (90 - 0)) + 0;
    this.width = 8;
    this.height = 10;
    this.obstacleElement = null;
    this.createDomElement();
  }
  createDomElement() {
    this.obstacleElement = document.createElement("div");
    this.obstacleElement.className = "obstacle";
    this.obstacleElement.style.left = this.positionX + "%";
    this.obstacleElement.style.bottom = this.positionY + "%";
    this.obstacleElement.style.width = this.width + "%";
    this.obstacleElement.style.height = this.height + "%";

    const gameBoard = document.getElementById("game");
    gameBoard.appendChild(this.obstacleElement);
  }
  moveLeft() {
    switch (true) {
      case this.positionX <= -10:
        this.obstacleElement.remove();
        break;
      default:
        this.positionX -= 5;
        this.obstacleElement.style.left = this.positionX + "%";
        break;
    }
  }
}

class Gifts {}

const game = new Game();
game.intro();
