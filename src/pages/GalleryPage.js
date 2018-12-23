import React, {Component} from 'react';
import * as R from 'ramda';

import Nav from '../components/Nav';
import Gallery from '../components/Gallery';
import Loading from '../components/Loading/';
import ErrorPage from './ErrorPage';

import {isLessThan1, isGreatherThenMax, isNotNumber} from '../modules/validation';

const changeProps = R.applySpec({
    tags: R.prop('gallery'), 
    page: R.propOr('1', 'page') //This will default to page 1 if no page# is given
});

class GalleryPage extends Component {
    componentDidUpdate(prevProps) {
        const {gallery, page} = this.props.match.params;
        const {pages: maxPage} = this.props.gallery;

        if (this.props.match.url !== prevProps.match.url) {
            return this.props.setPhotos(changeProps(this.props.match.params));
        }

        if (isNotNumber(page)) {
            return this.props.history.replace(`/gallery/${gallery}/1`);
        }

        if (isGreatherThenMax(page, maxPage) && maxPage !== 0) {
            return this.props.history.replace(`/gallery/${gallery}/${maxPage}`);
        }
    }

    componentDidMount() {
        const {gallery, page} = this.props.match.params;
        
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

export default GalleryPage;
