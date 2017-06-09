import React, {Component} from 'react';
import GoogleMap from './google_map'
import SideBar from './sidebar'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.showContact = this.showContact.bind(this)

        this.hideContact = this.hideContact.bind(this)

        this.state = {
            neighbors: [
                {
                    name: 'Wang Dudu',
                    location: '1404 Commonwealth'
                }
            ],
            showcontact: true,
        };
    }

    showContact() {
        this.setState({
            showcontact: true
        })
    }

    hideContact() {
        this.setState({
            showcontact: false
        })
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <SideBar neighbors = {this.state.neighbors} showcontact = {this.state.showcontact} 
                showContact = {this.showContact} hideContact = {this.hideContact}/>
                <GoogleMap lat={42.346779} lng={-71.093696} neighbors = {this.state.neighbors} showcontact = {this.state.showcontact}/>
            </div>
        );
    }
}