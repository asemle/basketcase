import React, { Component } from 'react'
import { connect } from 'react-redux';



class Checkout extends Component {
    render() {
        return (
            <div className="checked">
                <header>{this.props.checkedout ? "Successful checkout" : "Failed checkout"}</header>
                <div>
                    {this.props.checkedout ? "Thank you, your order is being processed." : "Sorry there was a problem with your order, please call customer services on XXXXXXXX"}
                </div>
                <footer></footer>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        checkedout: state.checkedout
    }
}

export default connect(mapStateToProps)(Checkout);