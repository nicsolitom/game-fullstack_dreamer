class Game {
  constructor() {
    this.time = 0;
    this.end = false;
    this.obstaclesArr = [];
    this.giftsArr = [];
    this.shootArr = [];
  }

  intro() {
    this.introElement = document.createElement("div");
    this.introElement.className = "intro";
    this.introElement.style.width = "100%";
    this.introElement.style.height = "100%";
    this.introElement.style.background =
      "url('./img/eclipse-1492818_1920.jpg')";
    this.introElement.style.backgroundSize = "cover";
    this.introElement.style.backgroundPosition = "center";

    this.introHeader = document.createElement("h1");
    this.introHeader.innerHTML = "Fullstack<br />Dreamer";
    this.introElement.appendChild(this.introHeader);

    this.introText = document.createElement("p");
    this.introText.id = "intro-text";
    this.introText.innerHTML =
      "A skilled dreamer<br />only begins with flying...";
    this.introElement.appendChild(this.introText);

    const clickToStart = () => {
      this.dreamAgainBtn.remove();
      this.introElement.remove();
      game.start();
    };
    this.dreamAgain = document.createElement("div");
    this.dreamAgain.id = "start-game-wrapper";

    this.dreamAgainBtn = document.createElement("button");
    this.dreamAgainBtn.id = "start-game-btn";
    this.dreamAgainBtn.type = "button";
    this.dreamAgainBtn.innerText = "START DREAMING";

    this.dreamAgainBtn.addEventListener("click", () => {
      clickToStart();
    });

    this.dreamAgain.appendChild(this.dreamAgainBtn);

    this.introElement.appendChild(this.dreamAgain);

    const gameBoard = document.getElementById("game");
    gameBoard.appendChild(this.introElement);

    document.addEventListener(
      "keydown",
      (event) => {
        switch (event.key) {
          case " ":
            this.introElement.remove();
            game.start();
            break;
        }
      },
      { once: true }
    );
  }

  start() {
    this.time = 0;
    this.end = false;
    this.obstaclesArr = [];
    this.giftsArr = [];
    this.lucidity = 0;
    this.player = null;
    this.positionX = 0;

    this.levelOneBg = document.createElement("div");
    this.levelOneBg.id = "level-one-bg";
    this.levelOneBg.style.position = "absolute";
    this.levelOneBg.style.height = "100%";
    this.levelOneBg.style.width = "2000%";
    this.levelOneBg.style.left = this.positionX + "%";
    this.levelOneBg.style.background = "url('./img/mysterious_land.jpg')";
    this.levelOneBg.style.backgroundSize = "contain";
    this.levelOneBg.style.backgroundRepeat = "no-repeat";

    const gameBoard = document.getElementById("game");
    gameBoard.appendChild(this.levelOneBg);

    const moveBgOne = setInterval(() => {
      this.positionX -= 1;
      this.levelOneBg.style.left = this.positionX + "%";
    }, 100);

    this.player = new Player();
    this.movementEventListeners();

    const addObstacle = setInterval(() => {
      const newObstacle = new Obstacle();
      this.obstaclesArr.push(newObstacle);

      this.time++;
    }, 1200);
   
    const addGift = setInterval(() => {
      const newGift = new Gift();
      this.giftsArr.push(newGift);
    }, 1200);

    const moveObstacle = setInterval(() => {
      this.obstaclesArr.forEach((obstacle) => {
        obstacle.moveLeft();
      });
    }, 200);

    const moveGift = setInterval(() => {
      this.giftsArr.forEach((gift) => {
        gift.moveLeft();
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
          this.gameOver();

          clearInterval(addObstacle);
          clearInterval(moveObstacle);
          clearInterval(moveGift);
          clearInterval(moveBgOne);

          this.player.playerElement.remove();
          this.levelOneBg.remove();
          this.obstaclesArr.forEach((obstacle) => {
            obstacle.obstacleElement.remove();
          });
          this.giftsArr.forEach((gift) => {
            gift.giftElement.remove();
          });

          clearInterval(impactObstacle);
        }
      });
    }, 50);


    const impactGift = setInterval(() => {
      this.giftsArr.forEach((gift) => {
        if (
          this.player.positionX < gift.positionX + gift.width &&
          this.player.positionX + this.player.width > gift.positionX &&
          this.player.positionY < gift.positionY + gift.height &&
          this.player.height + this.player.positionY > gift.positionY
        ) {
          this.lucidity += 600;
          gift.giftElement.remove();
          
        }
      });
    }, 50);

    const moveShoot = setInterval(() => {
      this.shootArr.forEach((shoot) => {
        shoot.moveRight();
      });
    }, 200);
  }

  gameOver() {
    this.end = true;

    this.gameOverElement = document.createElement("div");
    this.gameOverElement.className = "game-over";
    this.gameOverElement.style.width = "100%";
    this.gameOverElement.style.height = "100%";
    this.gameOverElement.style.background = "url('./img/earth-3391040.jpg')";
    this.gameOverElement.style.backgroundSize = "cover";
    this.gameOverElement.style.backgroundPosition = "center";

    this.gameOverHeader = document.createElement("h1");
    this.gameOverHeader.innerHTML = "Oh no!<br />You woke up!<br/>";
    this.gameOverElement.appendChild(this.gameOverHeader);

    this.gameOverText = document.createElement("p");
    this.gameOverText.innerHTML =
      "It is possible to induce lucid dreams<br />during being awake...";
    this.gameOverElement.appendChild(this.gameOverText);

    this.dreamAgain = document.createElement("div");
    this.dreamAgain.id = "restart-game-wrapper";
    this.dreamAgain.innerHTML =
      '<button id="restart-game-btn" type="button" onclick="window.location.reload()">DREAM AGAIN</button>';
    this.gameOverElement.appendChild(this.dreamAgain);

    const gameBoard = document.getElementById("game");
    gameBoard.appendChild(this.gameOverElement);
  }

  // restart(player) {
  //   if (this.end === true) {
  //     window.location.reload();
  //   } else if (this.end === false) {
  //     this.player.shoot(player);
  //   }
  // }

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
          // check for shooting function 
        // case " ":
        //   this.restart(this.player);
        //   break;
      }
    });
  }
}

class Player {
  constructor() {
    this.positionX = 5;
    this.positionY = 45;
    this.width = 14;
    this.height = 10;
    this.playerPicWidth = 10;
    this.playerPicHeight = 0;
    this.playerElement = null;
    this.shootElement = null;
    this.createDomElement();
  }
  createDomElement() {
    this.playerElement = document.createElement("div");
    this.playerElement.className = "player";
    this.playerElement.style.left = this.positionX + "%";
    this.playerElement.style.bottom = this.positionY + "%";
    this.playerElement.style.width = this.width + "%";
    this.playerElement.style.height = this.height + "%";

    this.playerPic = document.createElement("img");
    this.playerPic.id = "player-pic"
    this.playerPic.src = "./img/player_small.png";
    this.playerPic.style.width = this.playerPicWidth + "%";
    this.playerPic.style.width = "auto";
    this.playerElement.appendChild(this.playerPic);

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

  shoot() {

  }

  // Notes to self on Shooting function:

  // moveLeft() {
  //   switch (true) {
  //     case this.positionX <= -10:
  //       this.obstacleElement.remove();
  //       break;
  //     default:
  //       this.positionX -= 5;
  //       this.obstacleElement.style.left = this.positionX + "%";
  //       break;
  //   }
  // }

  // moveShoot() {
  //   switch (true) {
  //     case this.positionX <= -10:
  //       this.shootElement.remove();
  //       break;
  //       default:
  //         this.positionX += 7;
  //         this.shootElement.style.left = this.positionX + "%";
  //         break;
  //       }
  //     }
}

class Shoot {
  constructor() {}
}

class Obstacle {
  constructor() {
    this.positionX = 110;
    this.positionY = Math.floor(Math.random() * (90 - 0)) + 0;
    this.width = 7;
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

    this.obstaclePic = document.createElement("img");

    let randomObstacle = Math.floor(Math.random() * (4 - 1)) + 1;
    if (randomObstacle === 1) {
      this.obstaclePic.src = "./img/eye.png";
    } else if (randomObstacle === 2) {
      this.obstaclePic.src = "./img/ghost.png";
    } else if (randomObstacle === 3) {
      this.obstaclePic.src = "./img/spider.png";
    }
    this.obstaclePic.className = "obstacle-pic";
    this.obstaclePic.style.width = this.obstaclePicWidth + "%";
    this.obstaclePic.style.heigth = "auto";
    this.obstacleElement.appendChild(this.obstaclePic);

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

class Gift {
  constructor() {
    this.positionX = 110;
    this.positionY = Math.floor(Math.random() * (90 - 0)) + 0;
    this.width = 7;
    this.height = 10;
    this.giftElement = null;
    this.createDomElement();
  }
  createDomElement() {
    this.giftElement = document.createElement("div");
    this.giftElement.className = "gift";
    this.giftElement.style.left = this.positionX + "%";
    this.giftElement.style.bottom = this.positionY + "%";
    this.giftElement.style.width = this.width + "%";
    this.giftElement.style.height = this.height + "%";

    this.giftPic = document.createElement("img");

    let randomGift = Math.floor(Math.random() * (4 - 1)) + 1;
    if (randomGift === 1) {
      this.giftPic.src = "./img/candies.png";
    } else if (randomGift === 2) {
      this.giftPic.src = "./img/cotton-candy.png";
    } else if (randomGift === 3) {
      this.giftPic.src = "./img/rainbow.png";
    } else if (randomGift === 4) {
      this.giftPic.src = "./img/star.png";
    } else if (randomGift === 5) {
      this.giftPic.src = "./img/unicorn.png";
    }
    this.giftPic.className = "gift-pic";
    this.giftPic.style.width = this.giftPicWidth + "%";
    this.giftPic.style.heigth = "auto";
    this.giftElement.appendChild(this.giftPic);

    const gameBoard = document.getElementById("game");
    gameBoard.appendChild(this.giftElement);
  }
  moveLeft() {
    switch (true) {
      case this.positionX <= -10:
        this.giftElement.remove();
        break;
      default:
        this.positionX -= 5;
        this.giftElement.style.left = this.positionX + "%";
        break;
    }
  }
}

const game = new Game();
game.intro();
