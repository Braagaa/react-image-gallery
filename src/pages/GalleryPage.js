import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import Nav from '../components/Nav';
import Gallery from '../components/Gallery';
import Loading from '../components/Loading/';
import ErrorPage from './ErrorPage';

import {isLessThan1, isGreatherThenMax, isNotNumber} from '../modules/validation';

const changeProps = R.applySpec({
    tags: R.prop('gallery'), 
    //This will default to page 1 if no page# is given
    page: R.propOr('1', 'page') 
});

class GalleryPage extends Component {
    componentDidUpdate(prevProps) {
        const {gallery, page} = this.props.match.params;
        const {pages: maxPage} = this.props.gallery;

        //current url does not match previous url, fetch new gallery with
        //desired page number
        if (this.props.match.url !== prevProps.match.url) {
            return this.props.setPhotos(changeProps(this.props.match.params));
        }

        //if page is not a number, redirect the gallery to default page 1
        if (isNotNumber(page)) {
            return this.props.history.replace(`/gallery/${gallery}/1`);
        }

        /**
         * If page is greater than the max page of the gallery available,
         * redirect the gallery to the last available page.
         *
         * NOTE: maxPage !== 0 is needed beause if a gallery consists of 
         * no results then the page displayed on URL would be 0. This would
         * persist on the new successful search with results. This was not
         * wanted.
         */
        if (isGreatherThenMax(page, maxPage) && maxPage !== 0) {
            return this.props.history.replace(`/gallery/${gallery}/${maxPage}`);
        }
    }

    componentDidMount() {
        const {gallery, page} = this.props.match.params;

        /**
         * If page is less than 1, redirect gallery to default page 1.
         *
         * NOTE: This is needed here and not in componentDidUpdate because
         *       there would be a recursive overflow calls when a gallery
         *       consists of no results. This would break the program.
         */
        if (isLessThan1(page)) {
            return this.props.history.replace(`/gallery/${gallery}/1`);
        }

        return this.props.setPhotos(changeProps(this.props.match.params));
    }

    render() {
        return this.props.isError ? (
            <ErrorPage 
                galleries={this.props.featuredGalleries} 
                header="Connection Error"
                message={`Your search result ${this.props.match.params.gallery} cannot be retrieved at this time. Please try again later.`}
            />
        ) : this.props.isLoading ? (
            <div>
                <Nav galleries={this.props.featuredGalleries}/>
                <Gallery 
                    gallery={this.props.gallery} 
                    setPage={this.props.setCurrentGallery} 
                    setNextPage={this.props.setNextPage}
                    history={this.props.history}
                />
            </div>
        ) : <Loading/>;
    };
}

GalleryPage.propTypes = {
    featuredGalleries: PropTypes.array,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    gallery: PropTypes.object,
    setCurrentGallery: PropTypes.func,
    setPhotos: PropTypes.func,
    setNextPage: PropTypes.func
};

export default GalleryPage;
