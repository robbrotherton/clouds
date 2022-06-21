let cs = [];
const r = 30;
const rings = 4;
const speed = .6; // could be a property of individual cloud
let time = 0;
let light = 60;
let day = true;
let fade = false;

function setup() {
  createCanvas(700, 700);
  cs = new CloudSystem(10);
}

function draw() {
  
  // light blue
  colorMode('hsl');
  background(210, 70, light);
  
  if (!fade) time++;
  if (time > 400) {
    fade = !fade;
    time = 0;
  }
  
  if  (day & fade)  light -= .1; 
  if  (!day & fade) light += .1; 
  
  if (light >= 60 | light <=20) {
    day = !day;
    fade = false;
  }
  
  cs.update();
  cs.show();
  
  // text(time, 10, 10);
  // text(light, 10, 20);
  
}

class CloudSystem {
  
  constructor(max_clouds) {
    this.clouds = [];        
    for (let i = 0; i < max_clouds; i++) {
      this.clouds.push(new Cloud(random(0, width), 
                                 random(0, height), 
                                 random(5, 35), 
                                 r));
    }
  }
  
  update() {
    for (let i = 0; i < this.clouds.length; i++) {
      this.clouds[i].move();
      
      if (this.clouds[i].off_screen()) {
        this.clouds.splice(i, 1);
        this.clouds.push(new Cloud(random(width + 100, 2*width + 100), 
                                   random(0, height), 
                                   random(5, 35), 
                                   r));
      }
    }
    
  }
  
  show() {
    for (let i = 0; i < this.clouds.length; i++) {
      this.clouds[i].show();
    }
    
    // for (Cloud j : this.clouds) {
    //   j.show();
    // }
  }

}

class Cloud {
  constructor(x, y, n_circles, r) {
    
    // let init_x = random(width * 1.5);
    // let init_y = random(height);
    this.x = [];
    this.y = [];
    this.circles = [];
    // this.off_screen = false;

    for (let i = 0; i < n_circles; i++) {
      this.x[i] = random(x - 50, x + 50);
      this.y[i] = random(y - 20, y + 20);

      if (this.y[i] > y) this.y[i] = y;

      // this.circles[i] = new Circle(this.x[i], this.y[i]);
    }
  }
  
  off_screen() {
    return max(this.x) < -r;
  }

  show() {
    for (let i = 0; i < this.x.length; i++) {
      let c = new Circle(this.x[i], this.y[i], r);
      c.show();
    }
  }

  move() {
    for (let i = 0; i < this.x.length; i++) {
      this.x[i] -= 1 * speed;
      // if (i == this.x.length - 1 & this.x[i] < -20) this.off_screen = true;
      // if (this.x[i] < -20) this.x[i] = width + 20;
    }
  }
}

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = [];
    this.r[0] = r;
    
    let decrease_r = r / rings;
    
    for (let i = 1; i < rings; i++) {
      this.r[i] = this.r[i - 1] - decrease_r;
    }
  }

  show() {
    // noStroke();
    for (let i = 0; i < rings; i++) {
      circle(this.x, this.y, this.r[i]);
    }
  }

  //   move() {
  //     this.x -= 1;
  //   }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
