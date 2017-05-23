import React, {Component} from 'react';

export default class extends Component {
    render() {
        return (
            <div style={{        
                bottom:'0px',
                height:'100%',
                left:'0px',
                position: 'absolute',
                right: '1050px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
                <button type="button">Add Contact</button>
                <ul id="neighors-list">
                    <li id="Wang Dudu">Wang Dudu<button>Edit</button></li>
                </ul>
            </div>
        );
    }
}