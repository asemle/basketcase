import React, { Component } from 'react'

export default class CreditCard extends Component {
    constructor() {
        super()
        this.state = {
            validated: false,
            cardNumber:''
        }
    }
    validate(value) {
        function check() {
            if(!value) return false;
            if (/[^0-9-\s]+/.test(value)) return false;
            var nCheck = 0, nDigit = 0, bEven = false;
            value = value.replace(/\D/g, "");
            for (var n = value.length - 1; n >= 0; n--) {
                var cDigit = value.charAt(n),
                    nDigit = parseInt(cDigit, 10);
                if (bEven) {
                    if ((nDigit *= 2) > 9) nDigit -= 9;
                }
                nCheck += nDigit;
                bEven = !bEven;
            }
            return (nCheck % 10) == 0;
        }
        if(check(value)) {
            this.setState({
                validated: true,
                cardNumber: value
            })
            console.log("validated")
        }
        else {
            console.log("invalidated")
        }
    }
    checkout() {
        if(this.state.validated) {
            this.props.checkout(this.state.cardNumber)
        }
        else {
            alert("invalid card number")
        }
    }
    render() {
        return (
            <div className="cc">
                <div>
                    <span className="label">Please enter your credit card number</span>
                    <input type="text" onChange={(e) => this.validate(e.target.value)}></input>
                </div>
                <div className="buttonBox">
                    <button onClick={() => this.checkout()}>Checkout</button>
                </div>

            </div>
        )
    }
}
