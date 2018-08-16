import React, { Component } from 'react'

import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { updateQuantity, removeItem, checkoutRequest } from '../ducks/reducer.js';
import BasketItem from './BasketItem';
import Promo from './Promo';
import CreditCard from './CreditCard';


class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            subtotal: "Sub Total Amount",
            promo: "Promotional amount",
            basketTotal: "Basket value amount",
            promoValue: 0,
            redirect: false
        })
        this.updatePromo = this.updatePromo.bind(this);
        this.updateTotals = this.updateTotals.bind(this);
        this.checkout = this.checkout.bind(this);
    }
    updatePromo(value) {
        if(!isNaN(parseInt(this.state.subtotal))) {
            console.log("WHTA")
        console.log(value)
        const subtotal = this.state.subtotal;
        const promoamt = subtotal * (value/100);
        const total = subtotal - promoamt;
        this.setState({
            promoValue: value,
            promo: promoamt.toFixed(2),
            basketTotal: total.toFixed(2),
        })
        }
    }
    updateTotals() {
        if (this.props.basket.length) {
            const subt = this.props.basket.reduce((acc, curr) => this.props.products.find(product => product.sku === curr.sku).price * curr.quantity + acc, 0);

            if (this.state.promoValue) {
                const subtotal = subt.toFixed(2);
                const promoamt = subtotal * (this.state.promoValue / 100);
                const total = subtotal - promoamt;
                this.setState({
                    promoValue: this.state.promoValue,
                    promo: promoamt.toFixed(2),
                    basketTotal: total.toFixed(2),
                })
            }
            this.setState({
                subtotal: subt.toFixed(2),
                basketTotal: subt.toFixed(2)
            })
        }
    }
    checkout(cardNumber) {
        if (!this.props.basket.length) {
            alert("there is nothing in your shopping cart")
        } else {
            this.props.checkoutRequest(cardNumber, this.props.basket);
            this.setState({
                redirect: true
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.basket !== this.props.basket) {
            this.updateTotals();
        }
    }
    componentDidMount() {
        this.updateTotals()
    }
    render() {
        const basketItems = this.props.basket.map((item, i) => {
            return <BasketItem update={this.props.updateQuantity} products={this.props.products} remove={this.props.removeItem} item={item} key={i}></BasketItem>
        })
        if (this.state.redirect) {
            return <Redirect to='/checkout' />
        }
        return (
            <div className="basket">
                <header>Basket / checkout view</header>
                <div className="buttonBox">
                    <Link to="/">
                        <button className="link continue">Continue Shopping</button>
                    </Link>
                    <Link to="/basket">
                        <button className="link">Basket<span>{parseInt(this.props.basket.reduce((acc, curr) => parseInt(acc) + parseInt(curr.quantity), 0),10)}</span>
                        </button>
                    </Link>
                </div>
                <div className="BasketBox">
                    {basketItems}
                </div>
                <Promo updatePromo={this.updatePromo}/>
                <div className="totals">
                    
                    <div>
                        <span className="label">SubTotal</span>
                        <span>{this.state.subtotal}</span>
                    </div>
                    
                    <div>
                        <span className="label">Promotional discount amount</span>
                        <span>{this.state.promo}</span>
                    </div>
                    
                    <div>
                        <span className="label">Basket Total</span>
                        <span>{this.state.basketTotal}</span>
                    </div>
                </div>
                <CreditCard checkout={this.checkout}/>
                <footer></footer>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
        basket: state.basket
    }
}

export default connect(mapStateToProps, { updateQuantity, removeItem, checkoutRequest })(Basket);
