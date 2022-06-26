class Game {
  constructor() {
    this.time = 0;
    this.obstaclesArr = [];
    this.giftsArr = [];
  }
  start() {
    this.player = new Player();
    this.movementEventListeners();

    this.obstacle = new Obstacle();
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
      }
    });
    setInterval(() => {
      this.obstacle.moveLeft();
    }, 200);
  }
}

class Player {
  constructor() {
    this.positionX = 5;
    this.positionY = 45;
    this.width = 12;
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
    this.positionX = 101;
    this.positionY = 45;
    this.width = 10;
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
game.start();
