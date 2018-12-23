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

//randomly selects a value from animations and concatinates it to 
//animationString
const randomAnimation = R.pipe(
    R.length,
    R.dec,
    randomNumber0to,
    R.nth(R.__, animations),
    R.concat(animationString)
);

/**
 * Takes an event object, get the currentTarget element's animation style
 * prop and randomly assigns it a random animation name provided by 
 * Animate.css.
 */
const applyRandomAnimation = e => 
    e.currentTarget.style.animation = randomAnimation(animations);


module.exports = {applyRandomAnimation};
