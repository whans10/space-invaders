const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
    x: canvas.width/2 - 20,
    y: canvas.height - 60,
    width: 40,
    height: 20,
    speed: 6
};

let bullets = [];
let enemies = [];

let keys = {};

// keyboard input
document.addEventListener("keydown", (e)=>{
    keys[e.key] = true;

    if(e.key === " "){
        shoot();
    }
});

document.addEventListener("keyup", (e)=>{
    keys[e.key] = false;
});

function shoot(){
    bullets.push({
        x: player.x + player.width/2 - 2,
        y: player.y,
        width: 4,
        height: 10,
        speed: 7
    });
}

// create enemies
function spawnEnemies(){
    for(let i=0;i<6;i++){
        enemies.push({
            x: 80 * i + 50,
            y: 50,
            width: 30,
            height: 20,
            speed: 1
        });
    }
}

spawnEnemies();

// update logic
function update(){

    if(keys["ArrowLeft"] && player.x > 0){
        player.x -= player.speed;
    }

    if(keys["ArrowRight"] && player.x < canvas.width - player.width){
        player.x += player.speed;
    }

    bullets.forEach((bullet, index)=>{
        bullet.y -= bullet.speed;

        if(bullet.y < 0){
            bullets.splice(index,1);
        }
    });

    enemies.forEach(enemy=>{
        enemy.y += enemy.speed;
    });

    // collision detection
    bullets.forEach((bullet, bIndex)=>{
        enemies.forEach((enemy, eIndex)=>{

            if(
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ){
                bullets.splice(bIndex,1);
                enemies.splice(eIndex,1);
            }

        });
    });

}

// draw everything
function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // player
    ctx.fillStyle = "cyan";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // bullets
    ctx.fillStyle = "yellow";
    bullets.forEach(bullet=>{
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // enemies
    ctx.fillStyle = "red";
    enemies.forEach(enemy=>{
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });

}

// game loop
function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
