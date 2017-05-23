import React, {Component} from 'react';
import GoogleMap from './google_map'
import SideBar from './sidebar'

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <SideBar />
                <GoogleMap lat={42.346779} lng={-71.093696}/>
            </div>
        );
    }
}