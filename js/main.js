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
    this.domElement = null;
    this.createDomElement();
  }
  createDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.className = "player";
    this.domElement.style.left = this.positionX + "%";
    this.domElement.style.bottom = this.positionY + "%";
    this.domElement.style.width = this.width + "%";
    this.domElement.style.height = this.height + "%";

    const gameBoard = document.getElementById("game");
    gameBoard.appendChild(this.domElement);
  }
  moveUp() {
    console.log("up");
  }
  moveRight() {
    console.log("right");
  }
  moveDown() {
    console.log("down");
  }
  moveLeft() {
    console.log("left");
  }
}

class Obstacles {}

class Gifts {}

const game = new Game();
game.start();
