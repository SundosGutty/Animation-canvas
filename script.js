let playerState = 'idel'
const dropdown = document.getElementById('animations')
dropdown.addEventListener('change', function(e){
    playerState = e.target.value
})

const canvas = document.getElementById('canvas1'); //capture our canvas
const ctx = canvas.getContext('2d'); //we get the drawing context from our canvas -> in this case for 2d

 //we create hight 7 width variables with the same val as we difiened in our html
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image(); //using a constructor to create a new HTMLImageElement instance. 
playerImage.src = 'shadow_dog.png';
const spriteHeight = 523 //approx height of the element (our case a dog)
const spriteWidth = 575;
let gameFrame = 0;
const staggerFrames = 5
const spriteAnimations = []
const animationStates = [
    {
        name: 'idel',
        frames: 7
    },
    {
        name: 'jump',
        frames: 7
    },
    {
        name: 'fall',
        frames: 7
    },
    {
        name: 'run',
        frames: 9
    },
    {
        name: 'dizzy',
        frames: 11
    },
    {
        name: 'sit',
        frames: 5
    },
    {
        name: 'roll',
        frames: 7
    },
    {
        name: 'bite',
        frames: 7
    },
    {
        name: 'ko',
        frames: 12
    },
    {
        name: 'getHit',
        frames: 4
    },
]


function init(){
    animationStates.forEach((state, index)=>{
        let frames = {
            loc: []
        }
        //canculates position x and y of every frame 
        for(let j = 0; j < state.frames; j++){
            let positionX = j*spriteWidth
            let positionY = index* spriteHeight
            frames.loc.push({x: positionX, y: positionY})
        }
        spriteAnimations[state.name] = frames
    })
    animate()
}

function animate(){

    //erases the pixels in a rectangular area by setting them to transparent black it is required at the start of each frame in an animation. The dimensions of the cleared area should be set to equal the canvas element's width and height attributes.
    ctx.clearRect(0, 0,  CANVAS_WIDTH, CANVAS_HEIGHT); 
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;

    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y
    
    //draw the image onto the canvas, ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    // the sx, sy, sw sh are for cropping the part we want. The dx, dy, dw, dh are for mooving out animation around.
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight,0, 0,  spriteWidth, spriteHeight) 
    gameFrame++;
    requestAnimationFrame(animate) //
}

