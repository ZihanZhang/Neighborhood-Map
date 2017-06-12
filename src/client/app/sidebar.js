import React, {Component} from 'react';

export default class extends Component {

    constructor(props) {
        super(props);

        this.addContactForm = this.addContactForm.bind(this)

        this.submitContactForm = this.submitContactForm.bind(this)

        this.addName = this.addName.bind(this)

        this.addLocation = this.addLocation.bind(this)

        this.state = {
            name: 'Name',
            location: 'Location',
            showform: false
        }

    }

    addName(event) {
        this.setState({
            name: event.target.value
        })
    }

    addLocation(event) {
        this.setState({
            location: event.target.value
        })
    }

    addContactForm() {
        // document.getElementById('formdiv').style = {display: 'block'}
        this.setState({
            showform: true
        })
    }

    submitContactForm(event) {
        this.props.addContact(this.state.name, this.state.location)

        this.setState({
            showform: false
        })

        event.preventDefault()
    }
    
    render() {

        /*var contactform = this.state.showform? <div id="formdiv" style={{"display": "none"}}>Hello
                    <button type="button" onClick={this.submitContactForm}>Submit</button>    
                </div> : null*/
        var namelist = this.props.neighbors.map((neighbor) => <li key={neighbor.name}>{neighbor.name}<button>Edit</button></li>)

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
                <div id="formdiv" hidden={!this.state.showform}>
                    <form onSubmit={this.submitContactForm}>
                        <input type="text" id="Name" value={this.state.name} onChange={this.addName}/>
                        <input type="text" id="Location" value={this.state.location} onChange={this.addLocation}/>
                        <input type="submit" value="Submit" />    
                    </form>
                </div> 
                {/*{contactform}*/}
                <ul id="neighors-list">
                    {namelist}
                </ul>
            </div>
        );
    }
}