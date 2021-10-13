'use strict';

(function() {
  let canvas = document.getElementById('canvas');
  let c = canvas.getContext('2d');

  let numStars = 700;
  let radius = '0.' + Math.floor(Math.random() * 9) + 1;
  let focalLength = canvas.width * 2;
  let centerX, centerY;
  let w;
  let h;

  let stars = [], star;
  let i;

  const graphicsLayer = document.getElementById('graphics');
  const setCanvasExtents = () => {
    w = graphicsLayer.clientWidth;
    h = graphicsLayer.clientHeight;
    canvas.width = w;
    canvas.height = h;
    focalLength = w * 2;
  };

  setCanvasExtents();

  window.onresize = () => {
    setCanvasExtents();
    c.clearRect(0, 0, w, h);
    initializeStars();
  };
  initializeStars();

  function executeFrame() {
    requestAnimationFrame(executeFrame);
    moveStars();
    drawStars();
  }

  function initializeStars() {
    centerX = w / 2;
    centerY = h / 2;

    stars = [];
    for (i = 0; i < numStars; i++) {
      star = {
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * w,
        o: '0.' + Math.floor(Math.random() * 99) + 1,
      };
      stars.push(star);
    }
  }

  function moveStars() {
    for (i = 0; i < numStars; i++) {
      star = stars[i];
      star.z--;

      if (star.z <= 0) {
        star.z = w;
      }
    }
  }

  function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
      stroke = true;
    }
    if (typeof radius === 'undefined') {
      radius = 5;
    }
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  }

  function drawStars() {
    let pixelX, pixelY, pixelRadius;

    if (w !== window.innerWidth || w !== window.innerWidth) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStars();
    }

    c.clearRect(0, 0, w, h);
    c.fillStyle = 'rgba(255, 255, 255, ' + radius + ')';
    for (i = 0; i < numStars; i++) {
      star = stars[i];

      pixelX = (star.x - centerX) * (focalLength / star.z);
      pixelX += centerX;
      pixelY = (star.y - centerY) * (focalLength / star.z);
      pixelY += centerY;
      pixelRadius = 1 * (focalLength / star.z);

      c.fillStyle = 'rgba(255, 255, 255, ' + star.o + ')';
      c.strokeStyle = 'rgba(255, 255, 255, ' + star.o + ')';
      roundRect(c, pixelX, pixelY, pixelRadius, pixelRadius, pixelRadius / 2, true, true);
    }
  }

  executeFrame();
})();
