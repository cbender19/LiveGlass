var Mouse = {
  x: 0,
  y: 0,
  clicked: false
};

const canvas = document.getElementById('canvas');
canvas.addEventListener('mousemove', (e) => {
    Mouse.x = e.clientX;
    Mouse.y = e.clientY;
});
canvas.addEventListener('mousedown', (e) => {
  Mouse.clicked = true;
});
canvas.addEventListener('mouseup', (e) => {
  Mouse.clicked = false;
});

//add event listener for keypress 'C' twice for color wheel 
//to change, add, remove background colors
//'M' to change modes 

window.addEventListener('resize', () => {
    builder();
});

function builder() {
    var background = document.getElementById('background');

    if(background.classList.contains('idle')){
        !function(){livePattern.init();}()
    }
    if(background.classList.contains('active')){
        !function(){livePatternActive.init();}()
    }
}

function swapState(){
  var background = document.getElementById('background');
  var foreground = document.getElementById('foreground');

  if(foreground.classList.contains('active')){
    foreground.classList.remove('active');
    foreground.classList.add('idle');
    background.classList.remove('idle');
    background.classList.add('active');

    builder();
    return;
  }
  if(foreground.classList.contains('idle')){
    foreground.classList.remove('idle');
    foreground.classList.add('active');
    background.classList.remove('active');
    background.classList.add('idle');

    builder();
    return;
  }
}

var livePatternActive = {
  canvas: null,
  context: null,
  cols: 0,
  rows: 0,
  colors: [30, 55, 80, 105, 130, 155, 255],
  triangleColors: [],
  destColors: [],
  
  init: function(){
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.cols = Math.floor(document.body.clientWidth / 24) +2;
    this.rows = Math.floor(document.body.clientHeight / 24) + 1;
    
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
    
    this.drawBackground();
    this.animate();
    console.log('active');
  },
  
  drawTriangle: function(x, y, color, inverted){
    inverted = inverted == undefined ? false : inverted;

    this.context.beginPath();
    this.context.moveTo(x, y);
    this.context.lineTo(inverted ? x - 22 : x + 22, y + 11);
    this.context.lineTo(x, y + 22);
    this.context.fillStyle = "rgb("+color+","+color+","+color+")";
    this.context.fill();
    this.context.closePath();
  },
  
  getColor: function(){    
    return this.colors[(Math.floor(Math.random() * 6))];
  },
  
  drawBackground: function(){
    var eq = null;
    var x = this.cols;
    var destY = 0;
    var color, y;
    
    while(x--){
      eq = x % 2;
      y = this.rows;

      while(y--){
        destY = Math.round((y-0.5) * 24);

        let mx = x * 24;
        let my = eq == 1 ? destY : y * 24;

        this.drawTriangle(mx + 2, my, this.getColor());
        this.drawTriangle(mx, my, this.getColor(), true);
      }
    }
  },
  
  animate: function(){
    var me = this;

    //add animations
    // console.log(Math.floor(Math.random() * this.cols), Math.floor(Math.random() * this.rows));

    //average columns
    var ac = Math.round((Math.round((Mouse.x / 1000) * this.cols) + Math.round((Mouse.x / 1000) * this.cols)) / 4); //fix math
    // var c = Math.floor((Mouse.x / 1000) * this.cols);

    //average rows
    var ar = Math.round((Math.round((Mouse.y / 1000) * this.rows) + Math.round((Mouse.y / 1000) * this.rows)) / 4); //fix math
    // var r = Math.floor((Mouse.y / 1000) * this.rows);
    
    console.log(ac);
    console.log(this.cols);

    me.drawTriangle(ac * 24, Math.round((1-0.5) *24), this.colors[6]);
    // var x = Mouse.x;
    // var y = Mouse.y;
    // var eq = x % 2;

    // if (eq == 1) {
    //   me.drawTriangle(x * 24, Math.round((y-0.5) * 24) , this.getColor(), true);
    // } else {
    //   me.drawTriangle(x * 24 + 2, y * 24, this.getColor());
    // }

    var background = document.getElementById('background');
    if(background.classList.contains('active')) {
      setTimeout(function(){    
        me.animate.call(me);
      }, 10);
    }
  },
};

var livePattern = {
  canvas: null,
  context: null,
  cols: 0,
  rows: 0,
  colors: [30, 55, 80, 105, 130, 155],
  triangleColors: [],
  destColors: [],
  
  init: function(){
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.cols = Math.floor(document.body.clientWidth / 24) + 2;
    this.rows = Math.floor(document.body.clientHeight / 24) + 1;
    
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;
    
    this.drawBackground();
    this.animate();
    console.log('idle');
  },
  
  drawTriangle: function(x, y, color, inverted){
    inverted = inverted == undefined ? false : inverted;

    this.context.beginPath();
    this.context.moveTo(x, y);
    this.context.lineTo(inverted ? x - 22 : x + 22, y + 11);
    this.context.lineTo(x, y + 22);
    this.context.fillStyle = "rgb("+color+","+color+","+color+")";
    this.context.fill();
    this.context.closePath();
  },
  
  getColor: function(){    
    return this.colors[(Math.floor(Math.random() * this.colors.length))];
  },
  
  drawBackground: function(){
    var eq = null;
    var x = this.cols;
    var destY = 0;
    var color, y;
    
    while(x--){
      eq = x % 2;
      y = this.rows;

      while(y--){
        destY = Math.round((y-0.5) * 24);

        this.drawTriangle(x * 24 + 2, eq == 1 ? destY : y * 24, this.getColor());
        this.drawTriangle(x * 24, eq == 1 ? destY  : y * 24, this.getColor(), true);
      }
    }
  },
  
  animate: function(){
    var me = this;

    var x = Math.floor(Math.random() * this.cols);
    var y = Math.floor(Math.random() * this.rows);
    var eq = x % 2;

    if (eq == 1) {
      me.drawTriangle(x * 24, Math.round((y-0.5) * 24) , this.getColor(), true);
    } else {
      me.drawTriangle(x * 24 + 2, y * 24, this.getColor());
    }

    var background = document.getElementById('background');
    if(background.classList.contains('idle')) {
      setTimeout(function(){    
        me.animate.call(me);
      }, 10);
    }
  },
};