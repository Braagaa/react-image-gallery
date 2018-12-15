const {randomNumber0to} = require('./random');
const R = require('ramda');

const animations = [
    'bounce',
    'flash',
    'pulse',
    'rubberBand',
    'shake',
    'swing',
    'tada',
    'wobble',
    'jello'
];

const animationString = '0.5s ease-in ';

const randomAnimation = R.pipe(
    R.length,
    R.dec,
    randomNumber0to,
    R.nth(R.__, animations),
    R.concat(animationString)
);

const applyRandomAnimation = e => 
    e.currentTarget.style.animation = randomAnimation(animations);


module.exports = {applyRandomAnimation};
