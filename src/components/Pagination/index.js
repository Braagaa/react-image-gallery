import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import {isNotNumber, isLessThan0, isGreatherThenMax} from '../../modules/validation';

class Pagination extends Component {
    //updates pendingPage state for onChange
    setPageHandle = e => R.pipe(
        R.path(['currentTarget', 'value']),
        R.assoc('pendingPage', R.__, this.props.gallery),
        this.props.setPage
    )(e);

    //the redirects to entered input page number
    submitHandle = e => {
        const {
            pendingPage: value, pages: maxPage, tags
        } = this.props.gallery;
        const history = this.props.history;
       
        e.preventDefault();

        //if input is not a number do not redirect to anywhere
        if (isNotNumber(value)) {
            return;
        }

        //if input is less than 0, redirect to first page of gallery
        if (isLessThan0(value)) {
            return history.push(`/gallery/${tags}/1`);
        }

        //if input is greater than the max page of gallery, redirect to
        //last page or max page possible.
        if (isGreatherThenMax(value, maxPage)) {
            return history.push(`/gallery/${tags}/${maxPage}`);
        }

        //redirect to desired page number
        history.push(`/gallery/${tags}/${value}`);
    };

    /**
     * Used for paginations when using the arrows. Depending on which arrow
     * (left or right) will increase or decrease a page number by 1. This
     * is dependent on a different predicate for each arrow.
     *
     * For the left arrow, only decrease the page number by 1 if the page
     * is greater than 1.
     *
     * For the right arrow, only increase the page number by 1 if the page
     * number is less than the max page of the gallery.
     */
    page = (pred, incOrDec) => e => {
        const {page} = this.props.gallery;

        if (pred(page)) {
            this.props.setNextPage(incOrDec(page));
        }
    }

    previousPageHandle = this.page(R.gt(R.__, 1), R.dec);

    /**
     * Same predicates are used as the one from @page to determine the 
     * color of the arrows. Blue arrow means the arrow is available to
     * decrease or increase a page by one. Greyed out arrow means it 
     * cannot be used.
     *
     * For the left arrow, it is only blue if the page is greater than 1.
     *
     * For the right arrow, it is only blue if the page is less than the 
     * max page of the gallery.
     */
    arrowColor = pred => num => 
        pred(num) ? '/img/blue_left.svg' : '/img/left.svg';

    previousArrowColor = this.arrowColor(R.gt(R.__, 1));

    render() {
        /**
         * Curried functions for the right arrow are found within the 
         * render function because the right arrow has different logic
         * from left arrow. The right arrow needs the max pages number of
         * the gallery and this value changes for each gallery. This is 
         * updated here in the render function.
         *
         * The left arrow only needs to check if current page is greater
         * than 1 and is therefore not dynamic as the right arrow.
         */
        const rightArrowPred = R.lt(R.__, this.props.gallery.pages);
        const nextPageHandle = this.page(rightArrowPred, R.inc);
        const nextArrowColor = this.arrowColor(rightArrowPred);
        return (
            <ul className="pagination">
                <li key={0} className="pagination__page">Page:</li>
                <li key={1} className="pagination__input">
                    <span>
                        <form onSubmit={this.submitHandle}>
                            <input 
                                value={this.props.gallery.pendingPage} 
                                onChange={this.setPageHandle}
                            />
                        </form>
                        <span>of</span>
                        {this.props.gallery.pages}
                    </span>    
                </li>
                <li key={2} 
                    onClick={this.previousPageHandle} 
                    className="pagination__back"
                >
                    <img src={this.previousArrowColor(this.props.gallery.page)} alt="previous"/>
                </li>
                <li key={3} 
                    onClick={nextPageHandle} 
                    className="pagination__forward"
                >
                    <img src={nextArrowColor(this.props.gallery.page)} alt="forward"/>
                </li>
            </ul>
        );
    }
}

Pagination.propTypes = {
    gallery: PropTypes.object,
    history: PropTypes.object,
    setPage: PropTypes.func,
    setNextPage: PropTypes.func
};

export default Pagination;
