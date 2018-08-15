import React, { Component } from 'react';
import axios from 'axios';

export default class Promo extends Component {
constructor() {
    super()
    this.state = {
        promoCode:''
    }
    this.updatePromo = this.updatePromo.bind(this);
}
updatePromo(code) {
    this.setState({
        promoCode:code
    })
}

sendPromo(code) {
    const promo = axios.post('/promocode', {"promoCode": code})
    .then(res => {
        console.log(res)
        this.props.updatePromo(res.data.amount)
    }, err => alert("invalid code"))

}
   
  render() {
    return (
      <div className="promo">
            <span className="label">Enter Promo Code</span>
            <input onChange={(e) => this.updatePromo(e.target.value)}/>
            <button onClick={() => this.sendPromo(this.state.promoCode)}>Apply</button>
      </div>
    )
  }
}
