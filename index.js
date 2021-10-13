'use strict';

(function() {
  window.requestAnimFrame = (() => window.requestAnimationFrame)();

  let canvas = document.getElementById('canvas');
  let c = canvas.getContext('2d');

  let numStars = 700;
  let radius = '0.' + Math.floor(Math.random() * 9) + 1;
  let focalLength = canvas.width * 2;
  let centerX, centerY;

  let stars = [], star;
  let i;

  let animate = true;

  initializeStars();

  function executeFrame() {
    if (animate) {
      requestAnimFrame(executeFrame);
    }
    moveStars();
    drawStars();
  }

  function initializeStars() {
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    stars = [];
    for (i = 0; i < numStars; i++) {
      star = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
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
        star.z = canvas.width;
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

    if (canvas.width !== window.innerWidth || canvas.width !== window.innerWidth) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStars();
    }

    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'rgba(255, 255, 255, ' + radius + ')';
    for (i = 0; i < numStars; i++) {
      star = stars[i];

      pixelX = (star.x - centerX) * (focalLength / star.z);
      pixelX += centerX;
      pixelY = (star.y - centerY) * (focalLength / star.z);
      pixelY += centerY;
      pixelRadius = 1 * (focalLength / star.z);

      // c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
      c.fillStyle = 'rgba(255, 255, 255, ' + star.o + ')';
      c.strokeStyle = 'rgba(255, 255, 255, ' + star.o + ')';
      roundRect(c, pixelX, pixelY, pixelRadius, pixelRadius, pixelRadius / 2, true, true);
      // c.fill();
    }
  }

  executeFrame();
})();
