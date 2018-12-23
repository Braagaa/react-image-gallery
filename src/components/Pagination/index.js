import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import {isNotNumber, isLessThan0, isGreatherThenMax} from '../../modules/validation';

class Pagination extends Component {
    setPageHandle = e => R.pipe(
        R.path(['currentTarget', 'value']),
        R.assoc('pendingPage', R.__, this.props.gallery),
        this.props.setPage
    )(e);

    submitHandle = e => {
        const {
            pendingPage: value, pages: maxPage, tags
        } = this.props.gallery;
        const history = this.props.history;
       
        e.preventDefault();

        if (isNotNumber(value)) {
            return;
        }

        if (isLessThan0(value)) {
            return history.push(`/gallery/${tags}/1`);
        }

        if (isGreatherThenMax(value, maxPage)) {
            return history.push(`/gallery/${tags}/${maxPage}`);
        }

        history.push(`/gallery/${tags}/${value}`);
    };

    page = (pred, incOrDec) => e => {
        const {page} = this.props.gallery;

        if (pred(page)) {
            this.props.setNextPage(incOrDec(page));
        }
    }

    previousPageHandle = this.page(R.gt(R.__, 1), R.dec);

    arrowColor = pred => num => 
        pred(num) ? '/img/blue_left.svg' : '/img/left.svg';

    previousArrowColor = this.arrowColor(R.gt(R.__, 1));

    render() {
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
