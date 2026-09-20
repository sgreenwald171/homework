import $ from "./pcsTools.js";

const potus = $('#potus');
potus.css('color', 'orange');
potus.click(() => console.log('potus was clicked'));
potus.on('mouseenter', () => potus.hide());
potus.on('mouseleave', () => {
  potus.show();
  potus.sparkle(5);
 });

//potus.css('fontFamily', 'cursive');
console.log(potus.css('fontFamily'));

potus.css('position', 'absolute');
potus.css('bottom', 0);


$('h1').css('fontSize', '3em');
