const {key} = require('../data/config');
const axios = require('axios');
const R = require('ramda');

const flickrURL = 'https://api.flickr.com/services/rest/';

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

const toTagsParam = R.pipe(
    R.assoc('tags', R.__, flickrParams),
    R.objOf('params')
);

const toPhotoURLObj = R.pipe(toPhotoURL, R.objOf('URL'));

const getDataTag = R.pipe(R.path(['config', 'params']), R.pick(['tags']));
const getPhotoProps = R.pipe(
    R.path(['data', 'photos']), 
    R.omit(['perpage'])
);
const setURLProp = R.converge(R.mergeRight, [R.identity, toPhotoURLObj]);

const capitalize = R.pipe(R.adjust(0, R.toUpper), R.join(''));

const getFlickrPhotos = text => axios.get(flickrURL, toTagsParam(text));


const cleanFlickrData = R.pipe(
    R.converge(R.mergeRight, [getDataTag, getPhotoProps]),
    R.evolve({tags: capitalize, photo: R.map(setURLProp)})
);

module.exports = {getFlickrPhotos, cleanFlickrData, toPhotoURL};
