import React, {Component} from 'react';
import GoogleMap from './google_map'
import SideBar from './sidebar'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            neighbors: [
                {
                    name: 'Wang Dudu',
                    location: '1404 Commonwealth'
                }
            ]
        };
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <SideBar neighbors = {this.state.neighbors}/>
                <GoogleMap lat={42.346779} lng={-71.093696} neighbors = {this.state.neighbors}/>
            </div>
        );
    }
}