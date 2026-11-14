import { NeuralNetwork } from "../neural_network/neural_network.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.translate(0, canvas.height);
ctx.scale(1, -1);

const pixels_per_meter = 25;

const friction = 1


let cars = [];
function spawnRandomCars() {
    for (let i = 0; i < 2000; i++) {
        const car = {
            x: canvas.width / 10,
            y: canvas.height / 1.5,
            angle: 0,
            angular_velocity: 0,
            width: 50,
            height: 25,
            edges: [],
            velocity: 0,
            max_velocity: 10,
            acceleration: 0,
            highest_checkpoint: -1,
            neural_network: new NeuralNetwork(5, 7, 4, "sigmoid"),
            color: "black",
            turnLeft() {
                this.angular_velocity = .8;
            },
            turnRight() {
                this.angular_velocity = -.8;
            },
            accelerate() {
                this.acceleration = 5;
            },
            brake() {
                this.acceleration = -5;
            }
        }
        cars.push(car);
    }
}

function spawnCars(best_nn) {
    for (let i = 0; i < 100; i++) {
        const car = {
            x: canvas.width / 10,
            y: canvas.height / 1.5,
            angle: 0,
            angular_velocity: 0,
            width: 50,
            height: 25,
            edges: [],
            velocity: 0,
            max_velocity: 10,
            acceleration: 0,
            highest_checkpoint: -1,
            neural_network: best_nn.clone().mutate(Math.random() * 5, .1),
            color: "orange",
            turnLeft() {
                this.angular_velocity = .8;
            },
            turnRight() {
                this.angular_velocity = -.8;
            },
            accelerate() {
                this.acceleration = 5;
            },
            brake() {
                this.acceleration = -5;
            }
        }
        cars.push(car);
    }
    const car = {
        x: canvas.width / 10,
        y: canvas.height / 1.5,
        angle: 0,
        angular_velocity: 0,
        width: 50,
        height: 25,
        edges: [],
        velocity: 0,
        max_velocity: 10,
        acceleration: 0,
        highest_checkpoint: -1,
        neural_network: best_nn.clone(),
        color: "red",
        turnLeft() {
            this.angular_velocity = .8;
        },
        turnRight() {
            this.angular_velocity = -.8;
        },
        accelerate() {
            this.acceleration = 5;
        },
        brake() {
            this.acceleration = -5;
        }
    }
    cars.push(car);
}

spawnRandomCars()

let wall_points = [
    {
        "x": 258,
        "y": 538
    },
    {
        "x": 382,
        "y": 531
    },
    {
        "x": 530,
        "y": 521
    },
    {
        "x": 620,
        "y": 503
    },
    {
        "x": 656,
        "y": 452
    },
    {
        "x": 662,
        "y": 414
    },
    {
        "x": 650,
        "y": 345
    },
    {
        "x": 650,
        "y": 345
    },
    {
        "x": 606,
        "y": 316
    },
    {
        "x": 537,
        "y": 312
    },
    {
        "x": 408,
        "y": 307
    },
    {
        "x": 284,
        "y": 298
    },
    {
        "x": 202,
        "y": 301
    },
    {
        "x": 181,
        "y": 267
    },
    {
        "x": 266,
        "y": 196
    },
    {
        "x": 394,
        "y": 182
    },
    {
        "x": 394,
        "y": 182
    },
    {
        "x": 532,
        "y": 175
    },
    {
        "x": 624,
        "y": 120
    },
    {
        "x": 624,
        "y": 120
    },
    {
        "x": 531,
        "y": 78
    },
    {
        "x": 484,
        "y": 73
    },
    {
        "x": 402,
        "y": 58
    },
    {
        "x": 313,
        "y": 57
    },
    {
        "x": 231,
        "y": 66
    },
    {
        "x": 157,
        "y": 86
    },
    {
        "x": 97,
        "y": 111
    },
    {
        "x": 80,
        "y": 209
    },
    {
        "x": 80,
        "y": 209
    },
    {
        "x": 104,
        "y": 251
    },
    {
        "x": 129,
        "y": 287
    },
    {
        "x": 128,
        "y": 318
    },
    {
        "x": 164,
        "y": 331
    },
    {
        "x": 191,
        "y": 351
    },
    {
        "x": 236,
        "y": 373
    },
    {
        "x": 274,
        "y": 373
    },
    {
        "x": 396,
        "y": 379
    },
    {
        "x": 449,
        "y": 384
    },
    {
        "x": 471,
        "y": 411
    },
    {
        "x": 384,
        "y": 424
    },
    {
        "x": 326,
        "y": 431
    },
    {
        "x": 244,
        "y": 424
    },
    {
        "x": 161,
        "y": 418
    },
    {
        "x": 94,
        "y": 414
    },
    {
        "x": 24,
        "y": 448
    },
    {
        "x": 23,
        "y": 515
    },
    {
        "x": 64,
        "y": 559
    },
    {
        "x": 129,
        "y": 545
    }
];

const checkpoints = [
    {
        "first_point": [
            156,
            544
        ],
        "second_point": [
            160,
            418
        ]
    },
    {
        "first_point": [
            217,
            543
        ],
        "second_point": [
            224,
            425
        ]
    },
    {
        "first_point": [
            284,
            538
        ],
        "second_point": [
            286,
            431
        ]
    },
    {
        "first_point": [
            361,
            532
        ],
        "second_point": [
            353,
            428
        ]
    },
    {
        "first_point": [
            421,
            528
        ],
        "second_point": [
            412,
            420
        ]
    },
    {
        "first_point": [
            483,
            524
        ],
        "second_point": [
            452,
            416
        ]
    },
    {
        "first_point": [
            556,
            518
        ],
        "second_point": [
            471,
            413
        ]
    },
    {
        "first_point": [
            636,
            480
        ],
        "second_point": [
            468,
            408
        ]
    },
    {
        "first_point": [
            660,
            437
        ],
        "second_point": [
            460,
            398
        ]
    },
    {
        "first_point": [
            652,
            364
        ],
        "second_point": [
            451,
            384
        ]
    },
    {
        "first_point": [
            514,
            312
        ],
        "second_point": [
            447,
            384
        ]
    },
    {
        "first_point": [
            460,
            310
        ],
        "second_point": [
            431,
            384
        ]
    },
    {
        "first_point": [
            412,
            308
        ],
        "second_point": [
            396,
            380
        ]
    },
    {
        "first_point": [
            352,
            304
        ],
        "second_point": [
            345,
            377
        ]
    },
    {
        "first_point": [
            316,
            297
        ],
        "second_point": [
            306,
            375
        ]
    },
    {
        "first_point": [
            172,
            334
        ],
        "second_point": [
            130,
            320
        ]
    },
    {
        "first_point": [
            189,
            261
        ],
        "second_point": [
            107,
            259
        ]
    },
    {
        "first_point": [
            222,
            236
        ],
        "second_point": [
            83,
            177
        ]
    },
    {
        "first_point": [
            83,
            177
        ],
        "second_point": [
            97,
            126
        ]
    },
    {
        "first_point": [
            94,
            124
        ],
        "second_point": [
            157,
            84
        ]
    },
    {
        "first_point": [
            157,
            84
        ],
        "second_point": [
            228,
            68
        ]
    },
    {
        "first_point": [
            320,
            190
        ],
        "second_point": [
            297,
            59
        ]
    },
    {
        "first_point": [
            299,
            60
        ],
        "second_point": [
            381,
            184
        ]
    },
    {
        "first_point": [
            424,
            180
        ],
        "second_point": [
            414,
            60
        ]
    },
    {
        "first_point": [
            465,
            70
        ],
        "second_point": [
            503,
            177
        ]
    }
];

let first_point = {
    "x": 130,
    "y": 545
};

let finish_line = {
    first: {x:532,y:174},
    last: {x:531,y:79}
}

function checkRectCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function isCollidingWall(car) {
    return (
        checkRectCollision({x: -50,y: 0,width: 50,height: canvas.height}, car) ||
        checkRectCollision({x: canvas.width, y: 0,width: 50,height: canvas.height}, car) ||
        checkRectCollision({x: 0,y: -50,width: canvas.width,height: 50}, car) ||
        checkRectCollision({x: 0,y: canvas.height,width: canvas.width,height: 50}, car)
    )
}

function rotatePoint(x, y, cx, cy, radians) {
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  // 1. Translate point back to origin (0, 0)
  const dx = x - cx;
  const dy = y - cy;

  // 2. Apply rotation matrix and translate back to pivot
  const nx = cos * dx - sin * dy + cx;
  const ny = sin * dx + cos * dy + cy;

  return [nx, ny];
}

function segments_intersect(p1, p2, p3, p4) {
    function ccw(A, B, C) {
        return (C[1] - A[1]) * (B[0] - A[0]) > (B[1] - A[1]) * (C[0] - A[0])
    }

    return ccw(p1, p3, p4) != ccw(p2, p3, p4) && ccw(p1, p2, p3) != ccw(
        p1, p2, p4
    )
}

function isIntersectingLine(car, start, end) {
    for (const [edge_start, edge_end] of car.edges) {
        if (segments_intersect(
            [start.x,start.y], [end.x,end.y], edge_start, edge_end
        )) {
            return true;
        }
    }
    return false;
}

let max_time = 5;
let round_time = 0;

function distanceToCheckpoint(car, checkpoint) {
    if (!checkpoint) return 0;
    const midpoint = [(checkpoint.first_point[0] + checkpoint.second_point[0]) / 2, (checkpoint.first_point[1] + checkpoint.second_point[1]) / 2]
    const distance = Math.sqrt((midpoint[0] - (car.x + car.width / 2))**2 + (midpoint[1] - (car.y + car.height / 2))**2)
    return distance;
}

function computeEdges(car) {
    const cx = car.x + car.width / 2, cy = car.y + car.height / 2;
    const bl = rotatePoint(car.x, car.y, cx, cy, car.angle);
    const br = rotatePoint(car.x + car.width, car.y, cx, cy, car.angle);
    const tr = rotatePoint(car.x + car.width, car.y + car.height, cx, cy, car.angle);
    const tl = rotatePoint(car.x, car.y + car.height, cx, cy, car.angle);
    return [[bl, br], [tl, tr], [bl, tl], [br, tr]];
}

function carScore(car) {
    const next = checkpoints[car.highest_checkpoint + 1];
    const remaining = next ? distanceToCheckpoint(car, next) : 0;
    return car.highest_checkpoint * 1000 - remaining;
}

let best_nn = null;
let best_score = -Infinity;

function update(deltaTime) {
    round_time += deltaTime;
    if (round_time > max_time) {
        round_time = 0;
        max_time = 5 + .25 * (best_score / 1000);
        cars = [];
        if (best_nn) spawnCars(best_nn);
        spawnRandomCars();
    }
    cars = cars.filter(car => !isCollidingWall(car));
    
    function updateCar(car) {
        car.x += Math.cos(car.angle) * car.velocity * deltaTime * pixels_per_meter;
        car.y += Math.sin(car.angle) * car.velocity * deltaTime * pixels_per_meter;
        car.velocity = Math.min(car.velocity + car.acceleration * deltaTime, car.max_velocity);
        car.velocity = Math.max(car.velocity - friction * deltaTime, 0);
        car.angle += car.angular_velocity * (car.velocity/2) * deltaTime;
    };

    for (let i = cars.length-1; i >=0; i--) {
        updateCar(cars[i]);

        cars[i].edges = computeEdges(cars[i]);

        let last_point = first_point;
        let dead = false;
        for (const point of wall_points) {
            if (isIntersectingLine(cars[i], last_point, point)) {
                dead = true;
                break;
            }
            last_point = point;
        };
        if (dead) {
            cars.splice(i, 1);
            continue;
        }

        const car = cars[i];
        const nextIdx = car.highest_checkpoint + 1;
        const next = checkpoints[nextIdx];
        if (next && isIntersectingLine(car,
                {x: next.first_point[0],  y: next.first_point[1]},
                {x: next.second_point[0], y: next.second_point[1]})) {
            car.highest_checkpoint = nextIdx;
        }

        const s = carScore(cars[i]);
        if (s > best_score) {
            best_score = s;
            best_nn = cars[i].neural_network;
        }
    }
}

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    cars.forEach(car => {
        ctx.translate(car.x + car.width/2, car.y + car.height/2);
        ctx.rotate(car.angle);
        ctx.translate(-car.x - car.width/2, -car.y - car.height/2);
        ctx.fillStyle = car.color;
        ctx.fillRect(car.x, car.y, car.width, car.height);
        ctx.fillStyle = "black";
        ctx.setTransform(1, 0, 0, -1, 0, canvas.height);
    });
    
    if (first_point !== null) {
        ctx.beginPath();
        ctx.moveTo(first_point.x,first_point.y);
        wall_points.forEach(point => {
            ctx.lineTo(point.x,point.y);
            ctx.fillRect(point.x, point.y, 1, 1)
        });
        ctx.stroke();
    }

    checkpoints.forEach(checkpoint => {
        ctx.beginPath();
        ctx.moveTo(checkpoint.first_point[0], checkpoint.first_point[1]);
        ctx.lineTo(checkpoint.second_point[0], checkpoint.second_point[1]);
        ctx.stroke();
    });

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(finish_line.first.x, finish_line.first.y);
    ctx.lineTo(finish_line.last.x,finish_line.last.y);
    ctx.stroke();
    ctx.strokeStyle = "black";
}

let lastTime = 0

const STEP = 1 / 60;
let accumulator = 0;

function controlCars() {
        for (const car of cars) {
        car.acceleration = 0;
        car.angular_velocity = 0;
        const output = car.neural_network.predict([car.x / canvas.width,car.y / canvas.height,car.velocity / car.max_velocity,Math.sin(car.angle), Math.cos(car.angle)]);
        if (output[0] > output[1] && output[0] > .5) {
            car.accelerate();
        }
        else if (output[1] > .5) {
            car.brake();
        }
        if (output[2] > output[3] && output[2] > .5) {
            car.turnLeft();
        }
        else if (output[3] > .5) {
            car.turnRight();
        }
    }
}

function mainLoop(timeStamp) {
    accumulator += Math.min((timeStamp - lastTime) / 1000, 0.1);
    lastTime = timeStamp;

    while (accumulator >= STEP) {
        controlCars();   // your predict/accelerate/turn loop, moved into a function
        update(STEP);
        accumulator -= STEP;
    }
    draw();
    requestAnimationFrame(mainLoop);
}
requestAnimationFrame(mainLoop);

let first_checkpoint = null;
// document.addEventListener("click", function(e) {   
//     if (first_checkpoint === null) {
//         first_checkpoint = [e.clientX, canvas.height-e.clientY];
//     }
//     else {
//         checkpoints.push({
//             first_point: first_checkpoint,
//             second_point: [e.clientX, canvas.height - e.clientY],
//         });
//         first_checkpoint = null;
//         console.log(checkpoints);
//     }
// })