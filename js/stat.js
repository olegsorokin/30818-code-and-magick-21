"use strict";

const WELCOME_MESSAGE = `Ура вы победили! \nСписок результатов:`;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_COLOR = `rgb(255, 255, 255)`;
const GAP = 10;
const SHADOW_COLOR = `rgba(0, 0, 0, 0.7)`;
const TEXT_COLOR = `rgb(0, 0, 0)`;
const TEXT_FONT = `PT Mono`;
const TEXT_SIZE = 16;
const TEXT_GAP = 4;
const GIST_X = CLOUD_X + GAP;
const GIST_Y = CLOUD_Y + CLOUD_HEIGHT - GAP;
const BAR_HEIGHT = 150;
const BAR_WIDTH = 40;
const BAR_GAP = 50;

const getMaxValue = (arr) => {
  let maxValue = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxValue) {
      maxValue = arr[i];
    }
  }

  return maxValue;
};

const renderRectangle = (ctx, x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

const renderText = (ctx, text, x, y) => {
  const strings = String(text).split(`\n`);
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = `${TEXT_FONT} ${TEXT_SIZE}px`;
  ctx.textBaseline = `hanging`;

  strings.forEach((str, index) => {
    ctx.fillText(str, x, y + TEXT_SIZE * index);
  });
};

const renderCloud = (ctx, x, y) => {
  renderRectangle(ctx, x + GAP, y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, SHADOW_COLOR);
  renderRectangle(ctx, x, y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);
};

const renderBar = (ctx, x, y, width, height, name, value, color) => {
  renderText(ctx, value, x, y - TEXT_GAP * 2);
  renderRectangle(ctx, x, y - TEXT_GAP + TEXT_SIZE, width, height, color);
  renderText(ctx, name, x, y + TEXT_SIZE + height);
};

window.renderStatistics = (ctx, names, times) => {
  const maxTime = getMaxValue(times);
  renderCloud(ctx, CLOUD_X, CLOUD_Y);
  renderText(ctx, WELCOME_MESSAGE, CLOUD_X + GAP, CLOUD_Y + GAP);

  names.forEach((name, index) => {
    const barHeight = BAR_HEIGHT * (100 / maxTime * times[index]) / 100;
    const color = name === `Вы` ? `rgba(255, 0, 0, 1)` : `hsl(240, ${Math.random() * 100}%, 50%)`;

    renderBar(ctx, GIST_X + (BAR_WIDTH + BAR_GAP) * index, GIST_Y - GAP - TEXT_SIZE - barHeight, BAR_WIDTH, barHeight, name, Math.round(times[index]), color);
  });
};
