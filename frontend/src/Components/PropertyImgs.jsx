import React, { Component } from 'react';

export default class PropertyImgs extends Component {
    render() {
        <div key={pos}>
            id = {this.props.id}
            <img src={this.props.img} className={classes.img}></img>
            {/* <IconButton className={classes.delete} onClick={this.props.delete}>
                <DeleteIcon />
            </IconButton> */}
        </div>
    }
}