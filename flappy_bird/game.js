import { NeuralNetwork } from "../neural_network/neural_network.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.translate(0, canvas.height);
ctx.scale(1, -1);

const pixels_per_meter = 50;
const gravity = 18;
const fallMultiplier = 1.5;
const pipeSpeed = 5;

const birds = []

function spawnBirds(best_nn) {
    for (let i = 0; i < 1000; i++) {
        const bird = {
            x: 100,
            y: canvas.height / 2,
            width: 50,
            height: 50,
            velocity: 0,
            neural_network: best_nn.clone().mutate(1, .2),
            color: "orange",
            jump() {
                this.velocity = 8;
            }
        }
        birds.push(bird);
    }
    birds.push({
        x: 100,
        y: canvas.height / 2,
        width: 50,
        height: 50,
        velocity: 0,
        neural_network: best_nn.clone(),
        color: "red",
        jump() {
            this.velocity = 8;
        }
    })
}
function spawnRandomBirds() {
    for (let i = 0; i < 10000; i++) {
        const bird = {
            x: 100,
            y: 0,
            width: 50,
            height: 50,
            velocity: 0,
            neural_network: new NeuralNetwork(),
            color: "black",
            jump() {
                this.velocity = 8;
            }
        }
        birds.push(bird);
    }
}
spawnBirds(new NeuralNetwork());
spawnRandomBirds();

const gap = 175;
const minPipeHeight = 50;

function resetPipes() {
    // Keep the gap safely inside the screen bounds
    const maxBotHeight = canvas.height - gap - minPipeHeight;
    const botHeight = Math.random() * (maxBotHeight - minPipeHeight) + minPipeHeight;

    bot_pipe.x = canvas.width;
    bot_pipe.y = 0;
    bot_pipe.height = botHeight;

    top_pipe.x = canvas.width;
    top_pipe.y = botHeight + gap;
    top_pipe.height = canvas.height - top_pipe.y;
}

const pipes = []

const top_pipe = { x: 0, y: 0, width: 50, height: 0 };
const bot_pipe = { x: 0, y: 0, width: 50, height: 0 };
resetPipes();
pipes.push(top_pipe, bot_pipe);

let lastTimestamp = 0;

function checkRectCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (const bird of birds) {
        ctx.fillStyle = bird.color;
        ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    }
    ctx.fillStyle = "black";
    for (const pipe of pipes) {
        ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
    }
}

let pipes_survived = 0;
let best_pipes_survived = 0;
let best_nn = new NeuralNetwork();

function update(deltaTime) {
    // Iterate backwards when using splice() so no birds get skipped
    for (let i = birds.length - 1; i >= 0; i--) {
        const bird = birds[i];

        if (checkRectCollision(bird, top_pipe) || checkRectCollision(bird, bot_pipe)) {
            birds.splice(i, 1);
            if (birds.length === 1 && pipes_survived > best_pipes_survived) {
                best_nn = birds[0].neural_network;
                best_pipes_survived = pipes_survived;
            }
            if (birds.length === 0) {
                resetPipes();
                spawnBirds(best_nn);
                spawnRandomBirds();
                pipes_survived = 0;
            }
            continue;
        }

        bird.y += bird.velocity * pixels_per_meter * deltaTime;
        bird.velocity -= bird.velocity < 0 ? gravity * deltaTime * fallMultiplier : gravity * deltaTime;

        if (bird.y <= 0) {
            bird.y = 1;
            bird.velocity = 0;
        }
        if (bird.y >= canvas.height - bird.height) {
            bird.y = canvas.height - bird.height - 1;
            bird.velocity = 0;
        }
    }

    pipes[0].x -= pipeSpeed * pixels_per_meter * deltaTime;
    pipes[1].x -= pipeSpeed * pixels_per_meter * deltaTime;

    if (pipes[0].x <= -pipes[0].width) {
        pipes_survived += 1;
        resetPipes();
    }
}

function gameLoop(currentTimestamp) {
    if (!lastTimestamp) lastTimestamp = currentTimestamp; // Prevents frame-1 teleport
    const deltaTime = (currentTimestamp - lastTimestamp) / 1000;
    lastTimestamp = currentTimestamp;

    update(deltaTime);
    draw();

    for (const bird of birds) {
        if (bird.neural_network.forward([bird.velocity / 12, bird.y / canvas.height, top_pipe.x / canvas.width, top_pipe.y / canvas.height])) {
            bird.jump();
        }
    }

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
