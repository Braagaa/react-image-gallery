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

/**
 * Takes and object and merges it with the default flickrParams object.
 * Takes the merged object and uses it as a value for the key param in 
 * another object. The object is then sent as parameters with axios and
 * data is fetched.
 */
const getFlickrPhotos = R.pipe(
    R.mergeRight(flickrParams), 
    R.objOf('params'), 
    get
);

const throwFecthError = R.pipe(
    R.prop('data'),
    R.evolve({code: code => `Error Code ${code}:`}),
    R.props(['code', 'message']),
    R.join(' '),
    err => {
        err.name = 'Flickr Error';
        throw err;
    }
);

/**
 * Takes the raw data retrieved from Flickr api and abstracts and cleans
 * the data by adding, ommiting, or editing properties that will be better
 * suited for this program.
 */
const cleanFlickrData = R.pipe(
    /**
     * If data.stat does not equal 'ok', then create a custome Flickr Error
     * object and throw it. This should be caught at a Promise.catch and be
     * delt with there.
     */
    R.when(
        R.pathSatisfies(R.complement(R.equals('ok')), ['data','stat']),
        throwFecthError
    ),
    /**
     * Gets the tags prop as an object.
     * Gets the photo prop as an object.
     * Merges both objects as one.
     */
    R.converge(R.mergeRight, [getDataTag, getPhotoProps]),
    //adds extra properties needed to the merged object
    R.converge(R.mergeRight, [R.identity, addExtraPhotoProps]),
    /*
     * Edits properites from the object. Capitalizes the tags properties.
     * Gives each object in the photo prop a URL property that has a 
     * working URL to obtain a picture from Flickr.
     */
    R.evolve({tags: capitalize, photo: R.map(setURLProp)})
);

//getFlickrPhotos alias
const nextPage = getFlickrPhotos;

module.exports = {getFlickrPhotos, cleanFlickrData, toPhotoURL, nextPage};
