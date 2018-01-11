import React from 'react'
import {Item} from './Item'
import {API_ROOT} from '../constants'
import $ from 'jquery'


export class Itemlist extends React.Component {

    state = {
        activities: []
    }

    componentDidMount() {
        if (this.props.loadingErr === '')
            this.loadingEvents();
    }

    componentDidUpdate() {
        //console.log(this.props.selectedTab);
        if (this.props.selectTabChanged && this.props.loadingErr === '') {
            this.loadingEvents();
            this.props.resetTabStatus();
        }
    }

    settingUrlwithLodingState = (selectedTab, location, radius) => {
        selectedTab = selectedTab ? selectedTab : 'Nearby'
        const {lat, lon} = location ? location : JSON.parse(localStorage.getItem("POS_KEY"));
        const range = radius ? radius : 20;
        switch (selectedTab) {
            case "Nearby": {
                this.props.setLoadingStatus(true, 'Loading Interesting Events Around You Now...');
                return `${API_ROOT}/search?user_id=1111&lat=${lat}&lon=${lon}&radius=${range}`;
            }
            case "My Favorites": {
                this.props.setLoadingStatus(true, 'Loading Your Favorite Now...');
                return `${API_ROOT}/history?user_id=1111`;
            }
            case "Recommendation": {
                this.props.setLoadingStatus(true, 'Loading Recommend Activities Now...');
                return `${API_ROOT}/recommendation?user_id=1111&lat=${lat}&lon=${lon}&radius=${range}`;
            }
            default:
                return ``;
        }
    }

    loadingEvents = (location, radius) => {
        return $.ajax({
            url: this.settingUrlwithLodingState(this.props.selectedTab, location, radius),
            method: 'GET'
            //headers -> authorization
        }).then((response) => {
            this.setState({activities: response});
            this.props.setLoadingError('');
            console.log(this.state.activities);
        }, (error) => {
            this.props.setLoadingError(error.responseText);
        }).then(() => {
            this.props.setLoadingStatus(false, '');
        }).catch((error) => {
            console.log(error)
        });
    }

    render() {
        return (
            <ul className="item-list">
                {this.state.activities ? this.state.activities.map((item) =>
                    <Item
                        key={item.item_id}
                        item={item}
                    />) : null}
            </ul>
        )
    }
}
