import React, {Component} from 'react';

export default class extends Component {

    addContactForm() {
        document.getElementById('formdiv').style = {display: 'block'}
    }
    
    render() {
        return (
            <div style={{        
                bottom:'0px',
                height:'100%',
                left:'0px',
                position: 'absolute',
                right: '1050px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
                <button type="button" onClick={this.props.showContact}>Show Contact</button>
                <button type="button" onClick={this.props.hideContact}>Hide Contact</button>
                <hr/>
                <button type="button" onClick={this.addContactForm}>Add Contact</button>
                <div id="formdiv" style={{"display": "none"}}>Hello
                    <button type="button" >Submit</button>    
                </div> 
                <ul id="neighors-list">
                    <li id="Wang Dudu">Wang Dudu<button>Edit</button></li>
                </ul>
            </div>
        );
    }
}