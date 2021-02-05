let w = window.innerWidth;
let h = window.innerHeight;
let margin = 80;
let xscale = 10;
let yscale = 10;
let yOff = 0.0;
let cols;
let rows;
let entropy = 20;

function setup() {
  var canvas = createCanvas(windowWidth+margin,windowHeight+margin);
  canvas.parent('p5Sketch')
  cols = (w - margin * 2) / xscale;
  rows = (h - margin * 2) / yscale;
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
  }


function draw() {
  let xOff = 0.0;
  background(255);
  strokeWeight(1.5);
  noFill();
  
  for(let y=0; y<h; y+=yscale){
    stroke(250-(y*2/yscale),80,50+(2*y/yscale));
    beginShape();
  
    for(let x=0; x<w; x+= xscale){
      let noiseScale = map(noise(x*xOff-(mouseX/h),yOff+(mouseY/w)), 0, 1, 0+entropy, 0+2*entropy)
      curveVertex(x,y+noiseScale);
      xOff += 0.00001;
    }
    
    yOff += 0.0001;
    endShape();
  }
}