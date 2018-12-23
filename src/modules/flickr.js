const {key} = require('../data/config');
const axios = require('axios');
const R = require('ramda');

const flickrURL = 'https://api.flickr.com/services/rest/';

const get = R.invoker(2, 'get')(flickrURL, R.__, axios);

const flickrParams = {
    method: 'flickr.photos.search',
    api_key: key,
    privacy_filter: 1,
    per_page: 24,
    format: 'json',
    nojsoncallback: 1
}

const toPhotoURL = ({farm, server, id, secret}) => 
    `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;

const toPhotoURLObj = R.pipe(toPhotoURL, R.objOf('URL'));

const getDataTag = R.pipe(R.path(['config', 'params']), R.pick(['tags']));
const getPhotoProps = R.pipe(
    R.path(['data', 'photos']), 
    R.omit(['perpage'])
);
const addExtraPhotoProps = R.applySpec({pendingPage: R.prop('page')});


const setURLProp = R.converge(R.mergeRight, [R.identity, toPhotoURLObj]);

const capitalize = R.pipe(R.adjust(0, R.toUpper), R.join(''));

const getFlickrPhotos = R.pipe(R.mergeRight(flickrParams), R.objOf('params'), get);

const cleanFlickrData = R.pipe(
    R.converge(R.mergeRight, [getDataTag, getPhotoProps]),
    R.converge(R.mergeRight, [R.identity, addExtraPhotoProps]),
    R.evolve({tags: capitalize, photo: R.map(setURLProp)})
);

const nextPage = R.pipe(R.mergeRight(flickrParams), R.objOf('params'), get);

module.exports = {getFlickrPhotos, cleanFlickrData, toPhotoURL, nextPage};
