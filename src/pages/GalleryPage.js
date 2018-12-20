import React, {Component} from 'react';

import Nav from '../components/Nav';
import Gallery from '../components/Gallery';

class GalleryPage extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.match.params.gallery !== prevProps.match.params.gallery) {
            this.props.setPhotos(this.props.match.params.gallery);
        }
    }

    componentDidMount() {
        this.props.setPhotos(this.props.match.params.gallery)
    }

    render() {
        return this.props.isLoading ? (
            <div>
                <Nav galleries={this.props.featuredGalleries}/>
                <Gallery 
                    gallery={this.props.gallery} 
                    setPage={this.props.setPage} 
                    setNextPage={this.props.setNextPage}
                />
            </div>
        ) : <p>I Hope this Works......</p>;
    };
}

export default GalleryPage;
