import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import * as R from 'ramda';

import Nav from '../components/Nav';
import Gallery from '../components/Gallery';

import {isLessThan1, isGreatherThenMax} from '../modules/validation';

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

        if (isGreatherThenMax(page, maxPage)) {
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
        return this.props.isLoading ? (
            <div>
                <Nav galleries={this.props.featuredGalleries}/>
                <Gallery 
                    gallery={this.props.gallery} 
                    setPage={this.props.setCurrentGallery} 
                    setNextPage={this.props.setNextPage}
                    history={this.props.history}
                />
            </div>
        ) : <p>I Hope this Works......</p>;
    };
}

export default GalleryPage;
