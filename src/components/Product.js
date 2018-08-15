import React, { Component } from 'react'

export default function Product(props) {
        return (
            <div className="product">
                    <span className="name">{props.product.name}</span>
                    <span>{props.product.price}</span>
                    <button onClick={() => props.add(props.product.sku)}>Add to Basket</button>
            </div>
        )
}
