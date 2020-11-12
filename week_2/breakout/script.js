var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var gameInterval;

// Lives
var life = 3;

// Difficulty
var difficulty;

// Score
var score = 0;

// Ball
var x = canvas.width / 2;
var y = canvas.height / 2;

var dx = 2;
var dy = 2;

var ballRadius = 17;

// Paddle
var paddleWidth = 150;
var paddleHeight = 20;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

// Bricks
var bricks = [];
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 140;
var brickHeight = 40;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var brickColors = {
  1: "#63cdda",
  2: "#778beb",
  3: "#786fa6",
  4: "#f8a5c2",
  5: "#e66767",
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var bricksLeft = 0;
  for (var c = 0; c < brickColumnCount; c++) {
    bricksLeft += bricks[c].filter((b) => b.status > 0).length;
  }

  // Draw objects
  if (bricksLeft > 0) {
    if (life > 0) {
      drawBall();
      drawPaddle();
      collisionDetection();
      drawBricks();
      drawLife();
      drawSpeed();
      drawScore();
      drawDifficulty();
    } else {
      clearInterval(gameInterval);
      drawEndMessage("lost");
      resetGame();
    }
  } else {
    console.log(life);
    clearInterval(gameInterval);
    drawEndMessage("win");
    resetGame();
  }

  // Update the position of the ball
  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
  }

  // Ball touches the bottom
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      life -= 1;
      x = canvas.width / 2;
      y = canvas.height / 2;
    }
  }

  // Repeat
  x = x + dx;
  y = y + dy;

  if (rightPressed) {
    paddleX = paddleX + 7;

    if (paddleX + paddleWidth >= canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  }
  if (leftPressed) {
    paddleX = paddleX - 7;
    if (paddleX <= 0) {
      paddleX = 0;
    }
  }

  dx = Math.round(dx * 100) / 100;
  dy = Math.round(dy * 100) / 100;
}

var ballImage = document.createElement("img");
var ballImageLoaded = false;

ballImage.onload = function () {
  ballImageLoaded = true;
};

var imageIndex = Math.round(Math.random());

ballImage.src = ["assets/uku.jpg", "assets/lele.jpg"][imageIndex];

function drawBall() {
  if (ballImageLoaded) {
    // Border
    ctx.beginPath();
    ctx.arc(
      x + ballRadius,
      y + ballRadius,
      ballRadius + 2,
      0,
      Math.PI * 2,
      true
    );
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    // Ball
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + ballRadius, y + ballRadius, ballRadius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(ballImage, x, y, ballRadius * 2, ballRadius * 2);

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, true);
    ctx.clip();
    ctx.closePath();
    ctx.restore();
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "white";
  ctx.fill();
}

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status > 0) {
        var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        // White Border
        ctx.beginPath();
        ctx.rect(brickX - 1, brickY - 1, brickWidth + 2, brickHeight + 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();

        // Fill
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = brickColors[bricks[c][r].status];
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawLife() {
  document.getElementById("life").innerHTML = `Life: ${life}`;
}

function drawSpeed() {
  document.getElementById("game-speed").innerHTML = `Game Speed: ${Math.abs(
    dx
  )}`;
}

function drawScore() {
  document.getElementById("score").innerHTML = `Score: ${score}`;
}

function drawDifficulty() {
  document.getElementById("difficulty").innerHTML = `Difficulty: ${difficulty}`;
}

function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status > 0) {
        if (
          x + ballRadius + 2 > b.x &&
          x - 2 < b.x + brickWidth &&
          y + ballRadius + 2 > b.y &&
          y - 2 < b.y + brickHeight
        ) {
          dy = -dy;
          b.status -= 1;
          score++;
        }
      }
    }
  }
}

function drawEndMessage(s) {
  ctx.textAlign = "center";
  ctx.fillStyle = "white";

  if (s === "win") {
    ctx.beginPath();
    ctx.font = "bold 80px Roboto,sans-serif";
    ctx.fillText("You Won!", canvas.width / 2, canvas.height / 2);
    ctx.closePath();
    ctx.beginPath();
    ctx.font = "bold 40px Roboto,sans-serif";
    ctx.fillStyle = "#786fa6";
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 50);
    ctx.closePath();
  } else {
    ctx.beginPath();
    ctx.font = "bold 80px Roboto,sans-serif";
    ctx.fillText("GAME OVER :(", canvas.width / 2, canvas.height / 2);
    ctx.closePath();
  }
}

function resetGame() {
  document.getElementById("info").style.display = "none";
  var resetButton = document.createElement("button");
  resetButton.id = "reset-button";
  resetButton.innerHTML = "Play Again";
  resetButton.addEventListener("click", function () {
    document.location.reload();
  });

  document.getElementById("game-area").appendChild(resetButton);
}

function keyDownHandler(e) {
  if (e.key === "ArrowRight") {
    rightPressed = true;
  }
  if (e.key === "ArrowLeft") {
    leftPressed = true;
  }
  if (e.key === "ArrowUp") {
    if (dx > 0) {
      dx += 0.5;
    } else {
      dx -= 0.5;
    }

    if (dy > 0) {
      dy += 0.5;
    } else {
      dy -= 0.5;
    }
  } else if (e.key === "ArrowDown") {
    if (dx > 0) {
      dx -= 0.5;
    } else if (dx < 0) {
      dx += 0.5;
    }

    if (dy > 0) {
      dy -= 0.5;
    } else if (dy < 0) {
      dy += 0.5;
    }
  }
}
function keyUpHandler(e) {
  if (e.key === "ArrowRight") {
    rightPressed = false;
  }
  if (e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function startGame() {
  var countdown = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLife();
    drawSpeed();
    drawScore();
    drawDifficulty();
    if (timer > 0) {
      ctx.beginPath();
      ctx.font = "bold 200px Roboto,sans-serif";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(timer, canvas.width / 2, canvas.height / 2);
      ctx.closePath();
    }

    timer -= 1;
    if (timer === -1) {
      clearInterval(countdown);
      gameInterval = setInterval(draw, 10);
    }
  }, 1000);
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

var game = document.getElementById("game-canvas");
var info = document.getElementById("info");
game.style.visibility = "hidden";
info.style.visibility = "hidden";

// Countdown
var timer = 3;

// Start game
for (var i = 1; i <= 5; i++) {
  difficultyBtn = document.createElement("button");
  difficultyBtn.classList += "difficulty-btn";
  difficultyBtn.innerHTML = i;
  difficultyBtn.addEventListener("click", function (e) {
    difficulty = e.target.innerHTML;

    for (var c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (var r = 0; r < brickRowCount; r++) {
        var brickLevel = Math.floor(Math.random() * difficulty) + 1;
        bricks[c][r] = { x: 0, y: 0, status: brickLevel };
      }
    }

    document.getElementById("welcome").style.display = "none";
    game.style.visibility = "visible";
    info.style.visibility = "visible";
    startGame();
  });

  document.getElementById("difficulty-buttons").appendChild(difficultyBtn);
}
