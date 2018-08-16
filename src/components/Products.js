import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {getProducts, addToCart} from '../ducks/reducer.js';
import Product from './Product.js';


class Products extends Component {

    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        const products = this.props.products.map((product, i) => {
            return <Product product={product} key={i} add={this.props.addToCart}></Product>
        })
        return (
            <div>
                <header>Product List View</header>
                <div className="buttonBox">
                    <Link to="/basket">
                        <button className="link">Basket<span>{parseInt(this.props.basket.reduce((acc, curr) => parseInt(acc) + parseInt(curr.quantity), 0), 10)}</span>
                        </button>
                    </Link>
                </div>

                <div className="productsBox">
                    {products}
                </div>
                <div className="buttonBox">
                    <Link to="/basket">
                        <button className="link proceed">Proceed to Checkout</button>
                    </Link>
                </div>
                <footer></footer>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
        basket: state.basket,
    }
}

export default connect(mapStateToProps, {getProducts, addToCart})(Products);

