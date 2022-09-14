class Star {
  starsCtx;
  x;
  y;
  z;
  screenWindow;
  speed;
  extinction;
  starsWidth;
  starsHeight;
  constructor(
    starsCtx: any,
    starsWidth: number,
    starsHeight: number,
    screenWindow: number[],
    speed: number,
    extinction: number,
  ) {
    this.starsCtx = starsCtx;
    this.x = Math.random() * starsWidth;
    this.y = Math.random() * starsHeight;
    this.z = Math.random() * starsWidth;
    this.screenWindow = screenWindow;
    this.speed = speed;
    this.starsWidth = starsWidth;
    this.starsHeight = starsHeight;
    this.extinction = extinction;
  }

  move() {
    this.z -= this.speed;
    if (this.z <= 0) {
      this.z = this.starsWidth;
    }
  }

  show() {
    let xPos, yPos, rad, opacity;
    xPos = (this.x - this.screenWindow[0]) * (this.starsWidth / this.z);
    xPos += this.screenWindow[0];
    yPos = (this.y - this.screenWindow[1]) * (this.starsWidth / this.z);
    yPos += this.screenWindow[1];
    rad = this.starsWidth / this.z;
    opacity = rad > this.extinction ? 1.5 * (2 - rad / this.extinction) : 1;
    this.starsCtx.beginPath();
    this.starsCtx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
    this.starsCtx.arc(xPos, yPos, rad, 0, Math.PI * 2);
    this.starsCtx.fill();
  }
}
let animation: any;
// redraw the frame
function updateStars(
  starsCtx: any,
  starsWidth: number,
  starsHeight: number,
  starsElements: Star[],
) {
  starsCtx.fillStyle = "black";
  starsCtx.fillRect(0, 0, starsWidth, starsHeight);
  starsElements.forEach(function (s) {
    s.show();
    s.move();
  });
  animation = window.requestAnimationFrame(() =>
    updateStars(starsCtx, starsWidth, starsHeight, starsElements),
  );
}

// setup <canvas>, create all the starts
function setupStars(
  starsCanvas: any,
  starsCtx: any,
  starNumbers: number,
  speed: number,
  extinction: number,
) {
  const screenWindow = {
    w: window.innerWidth,
    h: window.innerHeight,
    c: [window.innerWidth * 0.5, window.innerHeight * 0.5],
  };
  window.cancelAnimationFrame(animation);

  const starsElements = [];
  starsCanvas.width = screenWindow.w;
  starsCanvas.height = screenWindow.h;
  for (let i = 0; i < starNumbers; i++) {
    starsElements[i] = new Star(
      starsCtx,
      screenWindow.w,
      screenWindow.h,
      screenWindow.c,
      speed,
      extinction,
    );
  }
  return { starsCanvas, starsElements };
}
export { setupStars, updateStars };
