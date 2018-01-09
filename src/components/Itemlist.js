import React from 'react'
import {Item} from './Item'
import {API_ROOT} from '../constants'
import $ from 'jquery'


export class Itemlist extends React.Component{

    state={
        activities: [],
        loading: false,
        loadingDescription: '',
        loadingActivities: false,
    }
    componentDidMount(){
        if(this.props.loadingErr === '')
            this.loadingEvents();
    }

    componentDidUpdate(){
        console.log(this.props.selectedTab);
    }

    settingUrlwithLodingState=(selectedTab, location, radius)=>{
        selectedTab = selectedTab ? selectedTab : 'Nearby'
        const {lat, lon} = location ? location : JSON.parse(localStorage.getItem("POS_KEY"));
        const range = radius? radius : 20;
        //this.setState({loadingActivities: true, loading: true, loadingDescription: 'Loading Interesting Events Around You Now...'});      //callback

        switch (selectedTab) {
            case "Nearby":   return `${API_ROOT}/search?user_id=1111&lat=${lat}&lon=${lon}&radius=${range}`;
            case "My Favorites": return `${API_ROOT}/history?user_id=1111`;
            case "Recommendation":  return `${API_ROOT}/recommendation?user_id=1111&lat=${lat}&lon=${lon}&radius=${range}`;
            default:      return ``;
        }
    }

    loadingEvents=(location, radius)=>{
        return $.ajax({
            url: this.settingUrlwithLodingState(this.props.selectedTab, location, radius),
            method: 'GET',
            //headers -> authorization
        }).then((response)=>{
            this.setState({activities: response, error:''});
            console.log(this.state.activities);
        }, (error)=>{
            this.setState({error: error.responseText});
        }).then(()=>{
            this.setState({loadingActivities: false, loading: false, loadingDescription: ''});
        }).catch((error)=>{
            console.log(error)
        });
    }

    render(){
        // if(this.props.loadingErr === '')
        //     this.loadingEvents()
        return(
            <ul className="item-list">
                {this.state.activities? this.state.activities.map((item)=>
                    <Item
                        key={item.item_id}
                        item={item}
                    />) : null }
            </ul>
        )
    }
}
