const debug = false; // Toggle Debug Mode

let win = false; // Track winning status
let score = 0;

let game; // Canvas
let playerName = "";
let charmander; // Charmander
let charLevel; // Charmander's evolve level

const GAME_WIDTH = 700; // Canvas width
const GAME_HEIGHT = 657; // Canvas height
let GAME_DURATION; // Game Duration
if (debug) {
  GAME_DURATION = 999;
} else {
  GAME_DURATION = 15;
}

const VIDEO_WIDTH = 960;
const VIDEO_HEIGHT = 540;

const MOVE_TIMER = 2; // Enemies move every [MOVE_TIMER] seconds
const SHADOW_COOLDOWN = 5; // Enemies use special every [SHADOW_COOLDOWN] seconds

let enemies = [];
let shoots = [];
let blocks = [];

let shootCooldown = 1000; // Fire normal shoot every [shootCooldown] milliseconds
let onCoolDown = false;

let specialCooldown = 3000; // Fire special shoot every [shootCooldown] milliseconds
let specialOnCooldown = false;

let flyCooldown = 5; // Fly every [flyCooldown] milliseconds
let flyOnCooldown = false;
let cacheFlyCooldown = flyCooldown;

let stun = false; // Track if stunned
let fly = false; // Track if flying

let fixPosition = false; // Whether Charmander position needs fixing after flying

let startTime; // Track start time
let elapsedTime = 0;

let keysPressed = {};
let evolveLevels;

if (debug) {
  evolveLevels = [1, 3, 5];
} else {
  evolveLevels = [1, 7, 13];
}

let evolveIndex = 0; // Track the current number of evolutions
let videoPlayed = true; // Track if evolution video played
let videoPlaying = false; // Track if evolution video playing
let menuPlayed = true; // Track if player clicked Ready! on Menu

const inputMaxLength = 20;

let LEVEL_DESIGN;
if (debug) {
  LEVEL_DESIGN = {
    enemyCommon: [3, 4, 4, 4, 4, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5],
    enemyHeavy: [1, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    enemyMove: [2, 3, 3, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    block: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };
} else {
  LEVEL_DESIGN = {
    enemyCommon: [2, 4, 6, 4, 4, 4, 4, 0, 2, 2, 4, 0, 0, 3, 4, 15, 4, 5, 0, 5],
    enemyHeavy: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 0, 0, 3, 3, 6, 5],
    enemyMove: [0, 0, 0, 1, 2, 2, 3, 5, 5, 4, 4, 5, 6, 6, 8, 0, 4, 5, 0, 5],
    block: [0, 3, 5, 5, 5, 5, 7, 7, 5, 5, 5, 5, 3, 3, 5, 5, 3, 5, 5, 5],
  };
}

const charDesign = {
  1: {
    speed: 4,
    spritesheet: {
      move: {
        numberOfFrames: 3,
        width: 128,
        height: 59,
        source: "images/char-1-move-down.png",
      },
      stun: {
        numberOfFrames: 2,
        width: 85,
        height: 39,
        source: "images/char-1-stun.png",
      },
    },
  },
  2: {
    speed: 5,
    spritesheet: {
      move: {
        numberOfFrames: 3,
        width: 128,
        height: 56,
        source: "images/char-2-move-down.png",
      },
      stun: {
        numberOfFrames: 2,
        width: 85,
        height: 40,
        source: "images/char-2-stun.png",
      },
    },
  },
  3: {
    speed: 6,
    spritesheet: {
      move: {
        numberOfFrames: 3,
        width: 128,
        height: 47,
        source: "images/char-3-move-down.png",
      },
      stun: {
        numberOfFrames: 2,
        width: 85,
        height: 42,
        source: "images/char-3-stun.png",
      },
      fly: {
        numberOfFrames: 1,
        width: 43,
        height: 48,
        source: "images/char-3-fly.png",
      },
    },
  },
};

const enemyDesign = {
  common: {
    speed: 0,
    hp: 1,
    spritesheet: {
      move: {
        numberOfFrames: 3,
        width: 128,
        height: 59,
        source: "images/enemy-1-move-down.png",
      },
      dead: {
        numberOfFrames: 2,
        width: 85,
        height: 43,
        source: "images/enemy-1-dead.png",
      },
    },
  },
  move: {
    speed: 3,
    hp: 1,
    spritesheet: {
      move: {
        numberOfFrames: 3,
        width: 128,
        height: 43,
        source: "images/enemy-2-move-down.png",
      },
      dead: {
        numberOfFrames: 2,
        width: 85,
        height: 43,
        source: "images/enemy-2-dead.png",
      },
    },
  },
  heavy: {
    speed: 4,
    hp: 2,
    spritesheet: {
      move: {
        numberOfFrames: 3,
        width: 134,
        height: 43,
        source: "images/enemy-3-move-down.png",
      },
      dead: {
        numberOfFrames: 2,
        width: 85,
        height: 46,
        source: "images/enemy-3-dead.png",
      },
      sleep: {
        numberOfFrames: 2,
        width: 85,
        height: 51,
        source: "images/enemy-3-sleep.png",
      },
    },
  },
};

const shootSpritesheet = {
  normal: {
    left: {
      width: 32,
      height: 22,
      source: "images/shoot-left.png",
    },
    right: {
      width: 32,
      height: 22,
      source: "images/shoot-right.png",
    },
    up: {
      width: 22,
      height: 32,
      source: "images/shoot-up.png",
    },
    down: {
      width: 22,
      height: 32,
      source: "images/shoot-down.png",
    },
  },
  special: {
    left: {
      width: 64,
      height: 52,
      source: "images/special-left.png",
    },
    right: {
      width: 64,
      height: 52,
      source: "images/special-right.png",
    },
    up: {
      width: 52,
      height: 64,
      source: "images/special-up.png",
    },
    down: {
      width: 52,
      height: 64,
      source: "images/special-down.png",
    },
  },
  shadow: {
    left: {
      width: 64,
      height: 55,
      source: "images/shadow-ball-left.png",
    },
    right: {
      width: 64,
      height: 55,
      source: "images/shadow-ball-right.png",
    },
    up: {
      width: 55,
      height: 64,
      source: "images/shadow-ball-up.png",
    },
    down: {
      width: 55,
      height: 64,
      source: "images/shadow-ball-down.png",
    },
  },
};

const blockSpritesheet = {
  width: 64,
  height: 51,
  source: "images/block.jpg",
};

const gameMenu = {
  0: {
    title: "Greeting, Pokemon Trainer!",
    instructions: [
      `Defeat all enemies within ${GAME_DURATION} seconds to pass the level.`,
      "Use Arrow Keys to move Charmander.",
      "Use Space to shoot.",
      "You will be stunned when hit by enemies.",
    ],
  },

  1: {
    title: "Charmander has involved into Charmeleon!",
    instructions: [
      "Fire Rate & Movement Speed have been increased.",
      "Shoot Cooldown has been decreased.",
      "Gained Special Attack: Fire a bigger orb that pierces through enemies and blocks.",
      `Press E to use Special Attack. Special Attack refreshes every ${
        specialCooldown / 1000
      } seconds.`,
    ],
    videoSource: "images/evolution/charmeleon.mp4",
  },
  2: {
    title: "Charmeleon has involved into Charizard!",
    instructions: [
      "Fire Rate & Movement Speed have been increased.",
      "Shoot Cooldown & Special Attack Cooldown has been decreased.",
      `Gained Fly: Gain Immunity & ability to fly through blocks & enemies for 2 seconds.`,
      `Press F to use Fly. Fly refreshes every ${cacheFlyCooldown} seconds.`,
    ],
    videoSource: "images/evolution/charizard.mp4",
  },
};

let allImages = [
  "shadow-ball-left.png",
  "enemy-2-move-left.png",
  "char-3-fly-left.png",
  "enemy-3-move-down.png",
  "char-2-move-up.png",
  "title.png",
  "char-3-fly-right.png",
  "enemy-1-dead.png",
  "special-left.png",
  "char-3-fly-up.png",
  "char-1-stun.png",
  "char-3-move-down.png",
  "char-1-move-left.png",
  "enemy-3-move-right.png",
  "char-1-move-up.png",
  "enemy-2-move-up.png",
  "special-up.png",
  "enemy-2-move-right.png",
  "shoot-down.png",
  "char-2-move-left.png",
  "background.png",
  "enemy-3-sleep.png",
  "enemy-2-dead.png",
  "enemy-3-dead.png",
  "block.jpg",
  "char-1-move-down.png",
  "char-3-move-left.png",
  "char-2-move-right.png",
  "char-3-move-up.png",
  "special-down.png",
  "char-2-move-down.png",
  "shoot-up.png",
  "shoot-left.png",
  "char-3-move-right.png",
  "shadow-ball-right.png",
  "enemy-2-move-down.png",
  "shadow-ball-down.png",
  "char-1-move-right.png",
  "shoot-right.png",
  "enemy-3-move-up.png",
  "special-right.png",
  "shadow-ball-up.png",
  "char-2-stun.png",
  "char-3-stun.png",
  "char-3-fly-down.png",
  "enemy-1-move-down.png",
  "enemy-3-move-left.png",
  "bg.jpg",
];

function getRandomInt(end, start) {
  return Math.round(Math.random() * (end - start) + start);
}

// Generate new random values for x and y until there is no overlapping
function generateXY(xy, objWidth, objHeight, updateCondition) {
  let x = xy[0];
  let y = xy[1];
  x = getRandomInt(0, game.canvas.width - objWidth);
  y = getRandomInt(0, game.canvas.height - objHeight);

  condition = updateCondition(x, y, objWidth, objHeight);
  if (condition) {
    return generateXY([x, y], objWidth, objHeight, updateCondition); // Recursion
  } else {
    return [x, y];
  }
}

// Display Game Menu
function displayMenu(level, menu) {
  // Menu Properties
  menu.id = "menu";
  menu.style.width = GAME_WIDTH + "px";
  menu.style.height = GAME_HEIGHT + "px";

  // Menu title
  let title = document.createElement("p");
  title.classList = "menu-title";
  title.innerHTML = gameMenu[level].title;

  // Menu Instruction
  let instructionList = document.createElement("ul");

  for (let i = 0; i < gameMenu[level].instructions.length; i++) {
    let instructionItem = document.createElement("li");
    instructionItem.classList = "instruction-item";
    instructionItem.innerHTML = gameMenu[level].instructions[i];
    instructionList.appendChild(instructionItem);
  }

  // User name input
  let nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "name-input";
  nameInput.placeholder = "What is your name?";
  nameInput.addEventListener("keyup", function (e) {
    let input = e.target;
    let inputMessage = document.getElementsByClassName("input-message")[0];

    // Check max character length
    if (input.value.length <= inputMaxLength) {
      inputMessage.id = "";
      inputMessage.innerHTML = `${
        inputMaxLength - input.value.length
      } character(s) left.`;
    } else {
      input.value = input.value.slice(0, inputMaxLength);
    }
  });

  // Ready Button
  let inputMessage = document.createElement("p");
  inputMessage.classList = "input-message";
  inputMessage.innerHTML = `Maximum ${inputMaxLength} characters`;

  let readyButton = document.createElement("button");
  readyButton.classList = "game-button";
  readyButton.innerHTML = "Ready!";

  // Remove menu & start game
  let ready = function (menu) {
    menuPlayed = true;
    menu.remove();
  };

  // Submit playerName
  readyButton.addEventListener("click", function () {
    startTime = Date.now(); // Start timer

    if (game.level === 1) {
      let nameInput = document.getElementById("name-input");
      playerName = nameInput.value;

      // Check if playerName is empty
      if (playerName === "") {
        let inputMessage = document.getElementsByClassName("input-message")[0];
        inputMessage.innerHTML = "This field cannot be blank!";
        inputMessage.id = "warning";
      } else {
        // Continue if playerName is not empty
        ready(menu);
      }
    } else {
      ready(menu);
    }
  });

  menu.appendChild(title);
  menu.appendChild(instructionList);
  if (game.level === 1) {
    menu.appendChild(nameInput);
    menu.appendChild(inputMessage);
  }
  menu.appendChild(readyButton);

  return menu;
}

// Update new Score to records
function updateRecord(newScore) {
  let data = localStorage.getItem("records");
  let newScoreAdded = false; // Track if newScore has been added to records
  let records = [];

  if (data) {
    records = data.toString().split("\n");
    records = records.map((x) => x.split(","));

    // Add new Score to records
    for (let i = 0; i < records.length; i++) {
      if (parseInt(records[i][0]) < parseInt(newScore[0])) {
        records.splice(i, 0, newScore);
        newScoreAdded = true;
        break;
      }
    }
  }

  if (!newScoreAdded && records.length < 10) {
    records.push(newScore);
  }

  records = records.splice(0, 10);

  let newString = records.map((x) => x.join(","));
  newString = newString.join("\n");

  localStorage.setItem("records", newString);
}

class Game {
  constructor(width, height, duration) {
    this.width = width;
    this.height = height;
    this.duration = duration;
  }

  init(level) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.display = "none";

    document.getElementById("game-area").appendChild(this.canvas);

    this.level = level;
  }

  loadImage(source) {
    this.image = new Image();
    this.image.src = source;
  }
}

class Character {
  constructor(x, y, speed, level, direction, hp, spritesheet, status) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.level = level;
    this.direction = direction;
    this.hp = hp;
    this.spritesheet = spritesheet;
    this.status = status || "active";

    // Spritesheet
    this.frameIndex = 0;
    this.timePerFrame = 90;
    this.lastUpdate = Date.now();

    this.numberOfFrames = spritesheet.move.numberOfFrames;
    this.width = spritesheet.move.width;
    this.height = spritesheet.move.height;
  }

  loadImage(source) {
    this.image = new Image();

    let obj = this;
    this.image.onload = function () {
      obj.imageLoaded = true;
    };

    this.image.src = source;
  }

  move(direction, type = "enemy", action = "move") {
    this.direction = direction;

    if (this.speed > 0 && this.hp > 0) {
      let imageSource = `images/${type}-${
        this.level
      }-${action}-${this.direction.toLowerCase()}.png`;

      this.image.src = imageSource;

      if (direction === "Up") {
        this.y -= this.speed;
      }
      if (direction === "Down") {
        this.y += this.speed;
      }
      if (direction === "Left") {
        this.x -= this.speed;
      }
      if (direction === "Right") {
        this.x += this.speed;
      }
    }
  }

  sleep() {
    this.speedCache = this.speed;
    this.speed = 0;
    this.numberOfFrames = this.spritesheet.sleep.numberOfFrames;
    this.width = this.spritesheet.sleep.width;
    this.height = this.spritesheet.sleep.height;
    this.image.src = this.spritesheet.sleep.source;
  }

  awake() {
    this.speed = this.speedCache;
    var obj = this;
    this.status = "immune";
    setTimeout(function () {
      obj.status = "active";
    }, 1000);
  }

  dead() {
    this.numberOfFrames = this.spritesheet.dead.numberOfFrames;
    this.width = this.spritesheet.dead.width;
    this.height = this.spritesheet.dead.height;
    this.image.src = this.spritesheet.dead.source;

    var obj = this;
    setTimeout(function () {
      obj.status = "inactive";
    }, 500);
  }
}

class Charmander extends Character {
  constructor(x, y, speed, level, direction, hp, spritesheet) {
    super(x, y, speed, level, direction, hp, spritesheet);
    // Spritesheet
    if (stun) {
      this.numberOfFrames = this.spritesheet.stun.numberOfFrames;
      this.width = this.spritesheet.stun.width;
      this.height = this.spritesheet.stun.height;
    } else if (fly) {
      this.numberOfFrames = this.spritesheet.fly.numberOfFrames;
      this.width = this.spritesheet.fly.width;
      this.height = this.spritesheet.fly.height;
    } else {
      this.numberOfFrames = this.spritesheet.move.numberOfFrames;
      this.width = this.spritesheet.move.width;
      this.height = this.spritesheet.move.height;
    }
  }

  move(direction) {
    if (stun) {
      this.numberOfFrames = this.spritesheet.stun.numberOfFrames;
      this.width = this.spritesheet.stun.width;
      this.height = this.spritesheet.stun.height;
      this.image.src = this.spritesheet.stun.source;
    } else if (fly) {
      this.numberOfFrames = this.spritesheet.fly.numberOfFrames;
      this.width = this.spritesheet.fly.width;
      this.height = this.spritesheet.fly.height;
      this.image.src = this.spritesheet.fly.source;
      super.move(direction, "char", "fly");
    } else {
      this.numberOfFrames = this.spritesheet.move.numberOfFrames;
      this.width = this.spritesheet.move.width;
      this.height = this.spritesheet.move.height;
      this.image.src = this.spritesheet.move.source;
      super.move(direction, "char");
    }
  }

  stun() {
    stun = true;
    setTimeout(function () {
      stun = false;
    }, 2000);
  }

  fly() {
    if (!flyOnCooldown) {
      fly = true;
      flyOnCooldown = true;
      setTimeout(function () {
        fly = false;
        flyCooldown = cacheFlyCooldown;
        fixPosition = true;
      }, 2000);
    }
  }
}
class Block {
  constructor(x, y, spritesheet) {
    this.x = x;
    this.y = y;
    this.spritesheet = spritesheet;
    this.width = spritesheet.width;
    this.height = spritesheet.height;
  }

  loadImage() {
    this.image = new Image();

    let obj = this;
    this.image.onload = function () {
      obj.imageLoaded = true;
    };

    this.image.src = this.spritesheet.source;
  }
}
class Shoot {
  constructor(x, y, speed, direction, spritesheet) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = direction;
    this.spritesheet = spritesheet;
  }

  loadImage() {
    this.image = new Image();

    let obj = this;
    this.image.onload = function () {
      obj.imageLoaded = true;
    };

    let direction = this.direction.toLowerCase();
    this.image.src = this.spritesheet[direction].source;
    this.width = this.spritesheet[direction].width;
    this.height = this.spritesheet[direction].height;
  }

  fire() {
    if (!stun) {
      if (this.type === "special") {
        if (!specialOnCooldown) {
          shoots.push(this);
          specialOnCooldown = true;
          setTimeout(function () {
            specialOnCooldown = false;
          }, specialCooldown);
        }
      } else {
        if (!onCoolDown && !stun) {
          shoots.push(this);
          onCoolDown = true;
          setTimeout(function () {
            onCoolDown = false;
          }, shootCooldown);
        }
      }
    }
  }
}
function initGame(level) {
  // Initialize Game
  game = new Game(GAME_WIDTH, GAME_HEIGHT, GAME_DURATION);
  game.init(level);

  // Initialize Charmander
  if (level < evolveLevels[1]) {
    charLevel = 1;
  } else if (level < evolveLevels[2]) {
    charLevel = 2;
    shootCooldown = 500;
  } else {
    charLevel = 3;
    shootCooldown = 300;
    specialCooldown = 2000;
  }

  charmander = new Charmander(
    game.canvas.width / 2, // x

    game.canvas.height / 2, // y
    charDesign[charLevel].speed, // speed
    charLevel, // level
    "Left", // direction
    1, // hp
    charDesign[charLevel].spritesheet // spritesheet
  );

  // Initialize Blocks
  // Check overlapping with Charmander & other blocks
  let checkBlock = function (x, y, objWidth, objHeight) {
    if (
      charmander.x <= x + objWidth &&
      x <= charmander.x + charmander.width / charmander.numberOfFrames &&
      charmander.y <= y + objHeight &&
      y <= charmander.y + charmander.height
    ) {
      return true;
    }
    if (blocks.length > 0) {
      for (let i = 0; i < blocks.length; i++) {
        let existingBlock = blocks[i];
        if (
          existingBlock.x <= x + objWidth &&
          x <= existingBlock.x + existingBlock.width &&
          existingBlock.y <= y + objHeight &&
          y <= existingBlock.y + existingBlock.height
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // Create blocks
  for (let i = 0; i < LEVEL_DESIGN.block[game.level - 1]; i++) {
    let bX = getRandomInt(0, game.canvas.width - 60);
    let bY = getRandomInt(0, game.canvas.height - 60);

    let bXY = generateXY(
      [bX, bY],
      blockSpritesheet.width,
      blockSpritesheet.height,
      checkBlock
    );
    bX = bXY[0];
    bY = bXY[1];

    let block = new Block(
      bX, // x
      bY, // y
      blockSpritesheet // spritesheet
    );

    blocks.push(block);
  }

  // Initialize Enemies
  // Check overlapping with Charmander, blocks and other enemies
  let checkEnemy = function (x, y, objwidth, objHeight) {
    if (checkBlock(x, y, objwidth, objHeight)) {
      return true;
    }
    if (enemies.length > 0) {
      for (let i = 0; i < enemies.length; i++) {
        let existingEnemies = enemies[i];
        if (
          existingEnemies.x <= x + objwidth &&
          x <= existingEnemies.x + existingEnemies.width &&
          existingEnemies.y <= y + objHeight &&
          y <= existingEnemies.y + existingEnemies.height
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // Create enemies
  // Common
  for (var i = 0; i < LEVEL_DESIGN.enemyCommon[game.level - 1]; i++) {
    let eX = getRandomInt(0, game.canvas.width - 60);
    let eY = getRandomInt(0, game.canvas.height - 60);
    let eXY = generateXY(
      [eX, eY],
      enemyDesign.common.spritesheet.move.width,
      enemyDesign.common.spritesheet.move.height,
      checkEnemy
    );

    eX = eXY[0];
    eY = eXY[1];

    let enemy = new Character(
      eX, // x
      eY, // y
      enemyDesign.common.speed, // speed
      1, // level
      "Down", // direction
      enemyDesign.common.hp, // hp
      enemyDesign.common.spritesheet // spritesheet
    );
    enemies.push(enemy);
  }

  // Move
  for (var i = 0; i < LEVEL_DESIGN.enemyMove[game.level - 1]; i++) {
    let eX = getRandomInt(0, game.canvas.width - 60);
    let eY = getRandomInt(0, game.canvas.height - 60);
    let eXY = generateXY(
      [eX, eY],
      enemyDesign.move.spritesheet.move.width,
      enemyDesign.move.spritesheet.move.height,
      checkEnemy
    );

    eX = eXY[0];
    eY = eXY[1];

    let enemy = new Character(
      eX, // x
      eY, // y
      enemyDesign.move.speed, // speed
      2, // level
      "Down", // direction
      enemyDesign.move.hp, // hp
      enemyDesign.move.spritesheet // spritesheet
    );

    // Determine initial moving direction
    enemy.randomIndex = getRandomInt(0, 3);
    enemy.direction = ["Up", "Down", "Left", "Right"][enemy.randomIndex];
    enemy.moveTimer = MOVE_TIMER;

    enemies.push(enemy);
  }
  // Heavy
  for (var i = 0; i < LEVEL_DESIGN.enemyHeavy[game.level - 1]; i++) {
    let eX = getRandomInt(0, game.canvas.width - 60);
    let eY = getRandomInt(0, game.canvas.height - 60);
    let eXY = generateXY(
      [eX, eY],
      enemyDesign.heavy.spritesheet.move.width,
      enemyDesign.heavy.spritesheet.move.height,
      checkEnemy
    );

    eX = eXY[0];
    eY = eXY[1];

    let enemy = new Character(
      eX, // x
      eY, // y
      enemyDesign.heavy.speed, // speed
      3, // level
      "Down", // direction
      enemyDesign.heavy.hp, // hp
      enemyDesign.heavy.spritesheet // spritesheet
    );

    // Determine initial moving direction
    enemy.randomIndex = getRandomInt(0, 3);
    enemy.direction = ["Up", "Down", "Left", "Right"][enemy.randomIndex];
    enemy.moveTimer = MOVE_TIMER;
    enemy.cooldown = SHADOW_COOLDOWN;

    enemies.push(enemy);
  }
}

function loadImages(preload) {
  if (preload) {
    for (let i = 0; i < allImages.length; i++) {
      let preImg = new Image();
      preImg.src = "images/" + allImages[i];
    }
  } else {
    game.loadImage("images/background.png");

    if (stun) {
      charmander.loadImage(
        charDesign[charmander.level].spritesheet.stun.source
      );
    } else if (fly) {
      charmander.loadImage(charDesign[charmander.level].spritesheet.fly.source);
    } else {
      charmander.loadImage(
        charDesign[charmander.level].spritesheet.move.source
      );
    }

    for (var i = 0; i < enemies.length; i++) {
      let enemy = enemies[i];
      enemy.loadImage(enemy.spritesheet.move.source);
      // Change Heavy enemies to sleep
      if (enemy.level === 3) {
        enemy.sleep();
      }
    }

    for (var i = 0; i < blocks.length; i++) {
      blocks[i].loadImage();
    }
  }
}

function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here.
  document.addEventListener(
    "keydown",
    function (e) {
      keysPressed[e.key] = true;

      if (
        [
          "ArrowUp",
          "ArrowDown",
          "Arrowleft",
          "ArrowRight",
          "Spacebar",
          " ",
        ].includes(e.key)
      ) {
        e.preventDefault(); // Disable screen scrolling with keys
      }
    },
    false
  );

  document.addEventListener(
    "keyup",
    function (e) {
      keysPressed[e.key] = false;
    },
    false
  );
}

// Update object states and locations
let update = function () {
  // Cache objects' previous locations & time
  let cache = {
    elapsedTime: elapsedTime,
    charmander: {
      x: charmander.x,
      y: charmander.y,
    },
    enemies: {
      x: [],
      y: [],
    },
    shoots: {
      x: [],
      y: [],
    },
  };

  // Save enemies previous location
  cache.enemies.x = enemies.map((e) => e.x);
  cache.enemies.y = enemies.map((e) => e.y);

  // Update the game time
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);

  // Move enemies
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    if (enemy.status !== "inactive") {
      // Randomly change direction every [MOVE_TIMER] seconds
      if (elapsedTime > cache.elapsedTime) {
        enemy.moveTimer -= 1;
        if (enemy.moveTimer === 0) {
          enemy.randomIndex = getRandomInt(0, 3);
          enemy.direction = ["Up", "Down", "Left", "Right"][enemy.randomIndex];
          enemy.moveTimer = MOVE_TIMER;
        }
      }

      // Bounce enemy on hitting wall & blocks
      for (let j = 0; j < blocks.length; j++) {
        let block = blocks[j];

        if (
          enemy.x <= 0 ||
          enemy.x + enemy.width / enemy.numberOfFrames >= game.canvas.width ||
          enemy.y <= 0 ||
          enemy.y - enemy.height >= game.canvas.height || // TODO: Adjust to work with bottom screen
          (enemy.x <= block.x + block.width &&
            block.x <= enemy.x + enemy.width / enemy.numberOfFrames &&
            enemy.y <= block.y + block.height &&
            block.y <= enemy.y + enemy.height)
        ) {
          // Reload previous position
          enemy.x = cache.enemies.x[i];
          enemy.y = cache.enemies.y[i];

          // Reverse direction
          if (enemy.direction === "Up") {
            enemy.direction = "Down";
          } else if (enemy.direction === "Down") {
            enemy.direction = "Up";
          } else if (enemy.direction === "Right") {
            enemy.direction = "Left";
          } else {
            enemy.direction = "Right";
          }
        }
      }

      // Move
      enemy.move(enemy.direction);
    }
  }

  // Move Charmander
  if (keysPressed["ArrowUp"]) {
    charmander.move("Up");
  }
  if (keysPressed["ArrowDown"]) {
    charmander.move("Down");
  }
  if (keysPressed["ArrowLeft"]) {
    charmander.move("Left");
  }
  if (keysPressed["ArrowRight"]) {
    charmander.move("Right");
  }

  // Shoot
  if (keysPressed["Spacebar"] || keysPressed[" "]) {
    let shoot = new Shoot(
      charmander.x + charmander.width / charmander.numberOfFrames / 2 - 8,
      charmander.y + charmander.height / charmander.numberOfFrames / 2 - 8,
      charmander.speed * 2,
      charmander.direction,
      shootSpritesheet.normal
    );
    shoot.loadImage();
    shoot.fire();
  }

  // Special
  if (keysPressed["e"] && charmander.level >= 2) {
    let shoot = new Shoot(
      charmander.x + charmander.width / charmander.numberOfFrames / 2 - 8,
      charmander.y + charmander.height / charmander.numberOfFrames / 2 - 8,
      charmander.speed * 2,
      charmander.direction,
      shootSpritesheet.special
    );
    shoot.type = "special";
    shoot.loadImage();
    shoot.fire();
  }

  if (keysPressed["f"] && charmander.level === 3) {
    charmander.fly();
  }

  // Fly Cooldown
  if (elapsedTime > cache.elapsedTime && flyOnCooldown) {
    flyCooldown -= 1;
    if (flyCooldown === 0) {
      flyOnCooldown = false;
    }
  }

  // Enemy Special
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    if (enemy.status !== "inactive" && enemy.level === 3 && enemy.speed > 0) {
      // Randomly use special every [SHADOW_COOLDOWN] seconds
      if (elapsedTime > cache.elapsedTime) {
        enemy.cooldown -= 1;
        if (enemy.cooldown === 0) {
          let shoot = new Shoot(
            enemy.x + enemy.width / enemy.numberOfFrames / 2 - 8,
            enemy.y + enemy.height / enemy.numberOfFrames / 2 - 8,
            enemy.speed * 2,
            enemy.direction,
            shootSpritesheet.shadow
          );
          shoot.type = "shadow";
          shoot.loadImage();
          shoot.fire();
          enemy.cooldown = SHADOW_COOLDOWN;
        }
      }
    }
  }

  // Cache shoots' location
  for (let i = 0; i < shoots.length; i++) {
    let shoot = shoots[i];
    cache.shoots.x.push(shoot.x);
    cache.shoots.y.push(shoot.y);
  }

  // Stop Charmander when hitting wall
  if (
    charmander.x + charmander.width / charmander.numberOfFrames >=
    game.canvas.width
  ) {
    charmander.x =
      game.canvas.width - charmander.width / charmander.numberOfFrames;
  }
  if (charmander.x < 0) {
    charmander.x = 0;
  }
  if (charmander.y + charmander.height >= game.canvas.height) {
    charmander.y = game.canvas.height - charmander.height;
  }
  if (charmander.y < 0) {
    charmander.y = 0;
  }

  // Stop Charmander when hitting blocks
  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i];
    if (
      charmander.x <= block.x + block.width &&
      block.x <= charmander.x + charmander.width / charmander.numberOfFrames &&
      charmander.y <= block.y + block.height &&
      block.y <= charmander.y + charmander.height
    ) {
      if (fixPosition) {
        if (charmander.x <= block.x + block.width / 2) {
          charmander.x = block.x - charmander.width / charmander.numberOfFrames;
        } else {
          charmander.x = block.x + block.width;
        }

        if (charmander.y <= block.y + block.height / 2) {
          charmander.y = block.y - charmander.height;
        } else {
          charmander.y = block.y + block.height;
        }
        fixPosition = false;
      } else if (!fly) {
        charmander.x = cache.charmander.x;
        charmander.y = cache.charmander.y;
      }
    }
  }

  // Stop shoots when hitting wall
  for (let i = 0; i < shoots.length; i++) {
    let shoot = shoots[i];

    if (
      shoot.x <= 0 ||
      shoot.x + shoot.width >= game.canvas.width ||
      shoot.y <= 0 ||
      shoot.y + shoot.height >= game.canvas.height
    ) {
      if (!["special", "shadow"].includes(shoot.type)) {
        shoots.splice(i, 1);
      }
    }
  }

  // Stop shoots when hitting blocks
  for (let i = 0; i < shoots.length; i++) {
    let shoot = shoots[i];

    for (let j = 0; j < blocks.length; j++) {
      let block = blocks[j];
      if (
        shoot.x <= block.x + block.width &&
        block.x <= shoot.x + shoot.width &&
        shoot.y <= block.y + block.height &&
        block.y <= shoot.y + shoot.height
      ) {
        // Exclude special and shadow
        if (!["special", "shadow"].includes(shoot.type)) {
          shoots.splice(i, 1);
        }
      }
    }
  }

  // Hit enemy on shot
  for (let i = 0; i < shoots.length; i++) {
    // Move shots
    let shoot = shoots[i];
    if (shoot.direction === "Up") {
      shoot.y = shoot.y - shoot.speed;
    }
    if (shoot.direction === "Down") {
      shoot.y = shoot.y + shoot.speed;
    }
    if (shoot.direction === "Left") {
      shoot.x = shoot.x - shoot.speed;
    }
    if (shoot.direction === "Right") {
      shoot.x = shoot.x + shoot.speed;
    }
    // Enemy special
    if (shoot.type === "shadow" && !fly) {
      if (
        shoot.x <=
          charmander.x + charmander.width / charmander.numberOfFrames &&
        charmander.x <= shoot.x + shoot.width &&
        shoot.y <= charmander.y + charmander.height &&
        charmander.y <= shoot.y + shoot.height
      ) {
        charmander.stun();
        shoots.splice(i, 1);
      }
    } else {
      for (let j = 0; j < enemies.length; j++) {
        let enemy = enemies[j];
        if (
          shoot.x <= enemy.x + enemy.width / enemy.numberOfFrames &&
          enemy.x <= shoot.x + shoot.width &&
          shoot.y <= enemy.y + enemy.height &&
          enemy.y <= shoot.y + shoot.height &&
          enemy.hp > 0
        ) {
          enemy.hp -= 1;

          if (enemy.hp === 0) {
            enemy.dead();
          } else {
            enemy.awake();
          }
          if (shoot.type !== "special") {
            shoots.splice(i, 1);
          }
        }
      }
    }
  }

  // Stun Charmander on collision
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    if (
      charmander.x <= enemy.x + enemy.width / enemy.numberOfFrames &&
      enemy.x <= charmander.x + charmander.width / charmander.numberOfFrames &&
      charmander.y <= enemy.y + enemy.height &&
      enemy.y <= charmander.y + charmander.height &&
      enemy.hp > 0 &&
      !fly
    ) {
      enemy.hp -= 1;

      if (enemy.hp === 0) {
        enemy.dead();
      }
      charmander.stun();
    }
  }

  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].status === "inactive") {
      enemies.splice(i, 1);
    }
  }

  // Update Charmander image frame
  if (Date.now() - charmander.lastUpdate >= charmander.timePerFrame) {
    charmander.frameIndex++;
    if (charmander.frameIndex >= charmander.numberOfFrames) {
      charmander.frameIndex = 0;
    }
    charmander.lastUpdate = Date.now();
  }
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    if (Date.now() - enemy.lastUpdate >= enemy.timePerFrame) {
      enemy.frameIndex++;
      if (enemy.frameIndex >= enemy.numberOfFrames) {
        enemy.frameIndex = 0;
      }
      enemy.lastUpdate = Date.now();
    }
  }
};

// Render game objects
function render() {
  // Background
  game.ctx.drawImage(game.image, 0, 0);

  if (debug) {
    game.ctx.beginPath();
    game.ctx.rect(0, 0, game.canvas.width, game.canvas.height);
    game.ctx.stroke();
  }

  // Timer
  game.ctx.font = "300px Pokemon";
  game.ctx.textAlign = "center";
  game.ctx.globalAlpha = 0.1;
  game.ctx.fillText(
    `${game.duration - elapsedTime}`,
    game.canvas.width / 2,
    (game.canvas.width * 2) / 3
  );
  game.ctx.globalAlpha = 1;

  let blocksImageReady = blocks
    .map((x) => x.imageLoaded)
    .every((x) => x === true);
  let enemiesImageReady = enemies
    .map((x) => x.imageLoaded)
    .every((x) => x === true);
  let charmanderReady = charmander.imageLoaded;

  if (blocksImageReady && enemiesImageReady && charmanderReady) {
    // Blocks
    for (let i = 0; i < blocks.length; i++) {
      let block = blocks[i];
      game.ctx.drawImage(block.image, block.x, block.y);

      // DEBUG MODE
      if (debug) {
        game.ctx.beginPath();
        game.ctx.rect(block.x, block.y, block.width, block.height);
        game.ctx.stroke();
      }
    }
    // Enemies
    for (let i = 0; i < enemies.length; i++) {
      let enemy = enemies[i];
      game.ctx.drawImage(
        enemy.image,
        (enemy.frameIndex * enemy.width) / enemy.numberOfFrames,
        0,
        enemy.width / enemy.numberOfFrames,
        enemy.height,
        enemy.x,
        enemy.y,
        enemy.width / enemy.numberOfFrames,
        enemy.height
      );
      if (debug) {
        game.ctx.beginPath();
        game.ctx.rect(
          enemy.x,
          enemy.y,
          enemy.width / enemy.numberOfFrames,
          enemy.height
        );
        game.ctx.stroke();
      }
    }

    // Shoots
    for (let i = 0; i < shoots.length; i++) {
      let shoot = shoots[i];
      game.ctx.drawImage(shoot.image, shoot.x, shoot.y);
      // DEBUG MODE
      if (debug) {
        game.ctx.beginPath();
        game.ctx.rect(shoot.x, shoot.y, shoot.width, shoot.height);
        game.ctx.stroke();
      }
    }

    // Charmander
    game.ctx.drawImage(
      charmander.image,
      (charmander.frameIndex * charmander.width) / charmander.numberOfFrames,
      0,
      charmander.width / charmander.numberOfFrames,
      charmander.height,
      charmander.x,
      charmander.y,
      charmander.width / charmander.numberOfFrames,
      charmander.height
    );

    // DEBUG MODE
    if (debug) {
      game.ctx.beginPath();
      game.ctx.rect(
        charmander.x,
        charmander.y,
        charmander.width / charmander.numberOfFrames,
        charmander.height
      );
      game.ctx.stroke();
    }
  }

  game.ctx.font = "20px Roboto, sans-serif";
  game.ctx.fillStyle = "white";
  game.ctx.textAlign = "left";
  game.ctx.fillText(`Level: ${game.level}`, 15, 35);

  game.ctx.textAlign = "right";
  game.ctx.fillText(`Score: ${score}`, game.width - 15, 35);
}

// Run main functions repeatedly
function main() {
  if (game.level === evolveLevels[evolveIndex]) {
    menuPlayed = false;
    let cacheEvolveIndex = evolveIndex;

    if (game.level > 1 && !videoPlaying) {
      videoPlayed = false;

      game.canvas.style.display = "none"; // Hide game canvas

      let video = document.createElement("video");
      video.width = 960;
      video.height = 540;
      video.autoplay = true;
      video.muted = true;
      video.src = gameMenu[evolveIndex].videoSource;
      document.getElementById("game-area").appendChild(video);

      video.addEventListener("ended", function () {
        videoPlayed = true;

        video.remove();
      });

      videoPlaying = true;
      video.play();
    }

    if (videoPlayed) {
      videoPlaying = false;
      let menu = document.createElement("div");

      game.canvas.style.display = "none";

      // Show menu of current level
      menu = displayMenu(evolveIndex, menu);

      document.getElementById("game-area").appendChild(menu);

      evolveIndex += 1;
    }
  }

  if (menuPlayed) {
    game.canvas.style.display = "unset"; // Show canvas

    update();
    render();

    // End level
    if (enemies.filter((e) => e.hp > 0).length === 0) {
      score += game.level * 2 + game.duration - elapsedTime;

      if (game.level < LEVEL_DESIGN.enemyCommon.length) {
        enemies = [];
        blocks = [];
        initGame(game.level + 1);
        loadImages();
        document.getElementsByTagName("canvas")[0].remove(); // Remove previous canvas
        startTime = Date.now(); // Restart timer
      } else {
        document.getElementsByTagName("canvas")[0].remove(); // Remove previous canvas
        win = true;
        updateRecord([score.toString(), playerName, game.level]); // Update score to records
        endGame(); // Game over: win
        return;
      }
    }

    if (game.duration - elapsedTime <= 0) {
      document.getElementsByTagName("canvas")[0].remove(); // Remove previous canva
      updateRecord([score.toString(), playerName, game.level]); // Update score to records
      endGame(); // Game over: lose
      return;
    }
  }
  requestAnimationFrame(main);
}

function endGame() {
  let menu = document.createElement("div");
  menu.id = "menu";
  menu.style.width = GAME_WIDTH + "px";
  menu.style.height = GAME_HEIGHT + "px";

  let winStatus = document.createElement("p");
  winStatus.id = "win-status";
  if (win) {
    winStatus.innerHTML = "You won!";
  } else {
    winStatus.innerHTML = "You lost :(";
  }

  let finalScore = document.createElement("p");
  finalScore.id = "score";
  finalScore.innerHTML = `Your score : ${score}`;

  let buttons = document.createElement("div");
  buttons.id = "buttons";

  let leaderboard = document.createElement("button");
  leaderboard.classList = "game-button smaller-button";
  leaderboard.innerHTML = "Leaderboard";
  leaderboard.addEventListener("click", function () {
    document.getElementById("menu").remove();
    showRecord();
  });

  let tryAgain = document.createElement("button");
  tryAgain.classList = "game-button smaller-button";
  tryAgain.innerHTML = "Try Again?";
  tryAgain.addEventListener("click", function () {
    document.location.reload();
  });

  buttons.appendChild(leaderboard);
  buttons.appendChild(tryAgain);
  menu.appendChild(winStatus);
  menu.appendChild(finalScore);
  menu.appendChild(buttons);
  document.getElementById("game-area").appendChild(menu);
}

function showRecord() {
  let menu = document.createElement("div");
  menu.id = "menu";
  menu.style.width = GAME_WIDTH + "px";
  menu.style.height = GAME_HEIGHT + "px";

  // Menu title
  let title = document.createElement("p");
  title.classList = "menu-title";
  title.innerHTML = "Leaderboard";

  // Table
  let table = document.createElement("table");

  // Table Header
  let headerRow = document.createElement("tr");
  let tableHeaders = ["No.", "Player Name", "Level", "Score"];
  let tableHeaderTags = [
    "content-index",
    "content-player",
    "content-level",
    "content-score",
  ];

  tableHeaders.map(function (h) {
    let headerCol = document.createElement("th");
    headerCol.innerHTML = h;
    headerRow.appendChild(headerCol);
  });

  table.appendChild(headerRow);

  // Table Content
  let data = localStorage.getItem("records"); // Load data from localStorage
  let records = [];

  // Process data
  if (data) {
    records = data.toString().split("\n");
    records = records.map((x) => x.split(","));
  }

  for (let i = 0; i < 10; i++) {
    // Content Row
    let recordRow = document.createElement("tr");

    // Index Column
    let recordIndex = document.createElement("td");
    recordIndex.id = tableHeaderTags[0];
    recordIndex.innerHTML = i + 1 + ".";
    recordRow.appendChild(recordIndex);

    if (i < records.length) {
      let record = records[i].slice(1).concat(records[i][0]);

      // Content Columns
      for (let j = 1; j < 4; j++) {
        let recordContent = document.createElement("td");
        recordContent.id = tableHeaderTags[j];
        recordContent.innerHTML = record[j - 1];
        recordRow.appendChild(recordContent);
      }
    }
    table.appendChild(recordRow);
  }

  // Try Again Button
  let tryAgain = document.createElement("button");
  tryAgain.classList = "game-button smaller-button";
  tryAgain.innerHTML = "Try Again?";
  tryAgain.addEventListener("click", function () {
    document.location.reload();
  });

  menu.appendChild(title);
  menu.appendChild(table);
  menu.appendChild(tryAgain);
  document.getElementById("game-area").appendChild(menu);
}

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

// Let's play this game!
loadImages(true);
initGame(1);
loadImages();
setupKeyboardListeners();
main();
