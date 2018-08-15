import React from 'react'

export default function BasketItem(props) {
    return (
        <div className="basketItem">
            <span className="name">{props.products.find(el => el.sku === props.item.sku).name}</span>
            <select onChange={(e) => props.update(e.target.value, props.item.sku)} type="number" value={props.item.quantity}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <span>{(props.products.find(el => el.sku === props.item.sku).price * props.item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
            <button onClick={() => props.remove(props.item.sku)}>Remove</button>
        </div>
    )
}

