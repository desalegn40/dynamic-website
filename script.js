/* Page Navigation */
function showSection(id) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

/* Search */
document.getElementById("search").addEventListener("keyup", function () {
    let value = this.value.toLowerCase();
    document.querySelectorAll(".page").forEach(page => {
        page.style.display = page.textContent.toLowerCase().includes(value)
            ? "block"
            : "none";
    });
});

/* Guess Number Game */
function guessGame() {
    let number = Math.floor(Math.random() * 10) + 1;
    let guess = prompt("Guess a number between 1 and 10");

    if (guess == number) {
        document.getElementById("gameResult").innerText = "🎉 Correct!";
    } else {
        document.getElementById("gameResult").innerText =
            "❌ Wrong! Number was " + number;
    }
}

/* Login */
function loginUser() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let confirm = document.getElementById("confirmPassword").value;

    if (!user || !pass) {
        document.getElementById("loginResult").innerText = "Fill all fields!";
        return;
    }

    if (pass !== confirm) {
        document.getElementById("loginResult").innerText = "Passwords do not match!";
        return;
    }

    document.getElementById("loginResult").innerText = "✅ Login Successful!";
}

/* ======================
   SIMPLE SNAKE GAME
====================== */
const board = document.getElementById("snakeContainer");
const size = 15;
let snake = [{ x: 7, y: 7 }];
let food = {};
let direction = "RIGHT";
let gameInterval;

/* Start Snake */
function startSnake() {
    snake = [{ x: 7, y: 7 }];
    direction = "RIGHT";
    createFood();
    clearInterval(gameInterval);
    gameInterval = setInterval(moveSnake, 200);
}

/* Direction */
function setDirection(dir) {
    direction = dir;
}

/* Move Snake */
function moveSnake() {
    let head = { ...snake[0] };

    if (direction === "UP") head.y--;
    if (direction === "DOWN") head.y++;
    if (direction === "LEFT") head.x--;
    if (direction === "RIGHT") head.x++;

    /* Game Over */
    if (
        head.x < 0 || head.x >= size ||
        head.y < 0 || head.y >= size
    ) {
        alert("Game Over!");
        clearInterval(gameInterval);
        return;
    }

    snake.unshift(head);

    /* Eat food */
    if (head.x === food.x && head.y === food.y) {
        createFood();
    } else {
        snake.pop();
    }

    drawGame();
}

/* Draw */
function drawGame() {
    board.innerHTML = "";

    snake.forEach(part => {
        let div = document.createElement("div");
        div.className = "snake";
        div.style.gridColumnStart = part.x + 1;
        div.style.gridRowStart = part.y + 1;
        board.appendChild(div);
    });

    let foodDiv = document.createElement("div");
    foodDiv.className = "food";
    foodDiv.style.gridColumnStart = food.x + 1;
    foodDiv.style.gridRowStart = food.y + 1;
    board.appendChild(foodDiv);
}

/* Food */
function createFood() {
    food = {
        x: Math.floor(Math.random() * size),
        y: Math.floor(Math.random() * size)
    };
}
