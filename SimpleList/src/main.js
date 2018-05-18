'use strict';
require('./lens.css');
const Utils = require('./Utils');
const handlebars = require('handlebars-template-loader/runtime');
const mainTemplate = require('./template/main.handlebars');
handlebars.registerPartial('sample', require('./template/sample.handlebars'));
const LENS = document.getElementById('lens');
let samples = new Map();
let showAll = Boolean(window.location.search.match(/[?&]\bshowAll=(true)\b/));

/**
 * Perform your DOM manipulation here.
 */
function draw() {
  let samplesToDraw = Array.from(samples.values());
  if (!showAll)
    samplesToDraw = samplesToDraw.filter((i) => i.status !== 'OK');
  const context = {
    samples: samplesToDraw,
  };
  LENS.innerHTML = mainTemplate(context);
} // draw

// Register lens.load listener
LENS.addEventListener('refocus.lens.load', () => {
  // Register hierarchyLoad listener
  LENS.addEventListener('refocus.lens.hierarchyLoad', (evt) => {
    if (evt.detail)
      samples = Utils.getSortedMap(Utils.getSampleMap(evt.detail));
    draw();
  }); // hierarchyLoad listener

  // Register realtime.change listener
  LENS.addEventListener('refocus.lens.realtime.change', (evt) => {
    if (evt.detail && Array.isArray(evt.detail) && evt.detail.length > 0) {
      evt.detail.forEach((chg) => {
        if (chg['sample.add']) {
          samples.set(chg['sample.add'].name.toLowerCase(), chg['sample.add']);
        } else if (chg['sample.remove']) {
          samples.delete(chg['sample.remove'].name.toLowerCase());
        } else if (chg['sample.update']) {
          samples.set(chg['sample.update'].new.name.toLowerCase(),
            chg['sample.update'].new);
        }
      });

      samples = Utils.getSortedMap(samples);
      draw();
    }
  }); // realtime.change listener
}); // lens.load listener
