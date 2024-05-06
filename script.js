let pinkKirby;
let yellowKirby;
let mintKirby;
let chocolateKirby;
let kirbyColours = [];
let flyingSprites = [];

function preload() {
  // load kirby images, push to kirbyColours array
  pinkKirby = loadImage("sprites/whipped-cream.png");
  kirbyColours.push(pinkKirby);
  yellowKirby = loadImage("sprites/yellow-kirby.png");
  kirbyColours.push(yellowKirby);
  mintKirby = loadImage("sprites/mint-kirby.png");
  kirbyColours.push(mintKirby);
  chocolateKirby = loadImage("sprites/chocolate-kirby.png");
  kirbyColours.push(chocolateKirby);
  // load font for name in corner
  garamond = loadFont("Garamond.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
  background(255);
  // square dimensions for small, medium, and large image
  sizes = [259*(width/2000), 259*(width/1500), 259*(width/1000)];
  // custom object to save customized user input
  customization = {
    colour: kirbyColours[0],
    size: sizes[0],
  };
}

function draw() {
  clear();
  // draws summoned kirbys
  for (let kirby of flyingSprites) {
    image(kirby.colour, kirby.x, kirby.y, kirby.size, kirby.size);
    kirby.fly(10);
  }
  // checks if least recent object in array is off screen
  let oldestImage = flyingSprites[0]
  if (flyingSprites.length > 0) {
    if (oldestImage.x > width+oldestImage[0] || oldestImage.y > height+oldestImage[0]) {
      flyingSprites.splice(0, 1);
    }
  }
  // show name continuously in bottom corner
  fill(0);
  textFont(garamond, 18);
  text("sunflwrs (Amy Z)", 15, height-15);
}

// changes colour of to be summoned kirby plush
function selectColour() {
  let colours = document.getElementById("colours");
  let colourIndex = colours.selectedIndex;
  customization.colour = kirbyColours[colourIndex];
  console.log(colourIndex)
}

// uses user customization to add new kirby to animation
function summonKirby() {
  let newKirby = {
    // random x + margins so the image starts off screen
    x: random(-1*customization.size-customization.size, width-customization.size),
    y: -1*customization.size,
    colour: customization.colour,
    size: customization.size,
    // custom method to make image move diagonallly
    fly(speed) {
      this.x += speed;
      this.y += speed;
    }
  }
  flyingSprites.push(newKirby);
}

// changes size of to be summoned kirby plush
function selectSize() {
  // checks which radio button for size is checked
  let sizeButtons = document.getElementsByName("sizes");
  for (let i = 0; i < sizeButtons.length; i++) {
    if (sizeButtons[i].checked) {
      console.log(sizeButtons[i].id);
      customization.size = sizes[i];
    }
  }
}