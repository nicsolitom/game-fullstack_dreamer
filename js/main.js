class Game {
  constructor() {
    this.time = 0;
    this.player = null;
    this.obstaclesArr = [];
    this.giftsArr = [];
  }
  start() {
    this.player = new Player();
    this.movementEventListeners();
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
        case 80:
            break;
        default:
            this.positionX += 5;
            this.playerElement.style.left = this.positionX + "%"; 
    }
    // this.positionX += 5;
    // this.playerElement.style.left = this.positionX + "%";
  }
  moveLeft() {
    switch (this.positionX) {
        case 0:
            break;
        default:
            this.positionX -= 5;
            this.playerElement.style.left = this.positionX + "%";
    }
    // this.positionX -= 5;
    // this.playerElement.style.left = this.positionX + "%";
  }
}

class Obstacles {}

class Gifts {}

const game = new Game();
game.start();
