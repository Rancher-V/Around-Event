import React from 'react'
import {Aside} from './Aside'
import {Itemlist} from './Itemlist'
import {GEO_OPTION, POS_KEY, API_ROOT} from '../constants'
import $ from 'jquery'
import {Spin} from 'antd'

export class Home extends  React.Component{
    state={
        activities: [],
        loadingActivities: false,
        loadingFavorite: false,
        loadingRecommend: false,
        loadingGeo: false,
        error: '',
    }

    componentDidMount(){
        this.getGeoLocation();
    }


    onSuccessLoadGeoLocation=(position)=>{
        this.setState({loadingGeo:false, error:''});
        const {latitude: lat, longitude: lon} = position.coords;
        console.log(position.coords);
        localStorage.setItem(POS_KEY, JSON.stringify({lat: lat, lon: lon}));
        this.loadingNearbyActivities();
    }

    onFailedLoadGeoLocation=()=>{
        this.setState({loadingGeoLocation: false, error: 'Failed to load geo location'});
    }


    getGeoLocation=()=>{
        console.log("loading geolocation now");
        if(navigator && navigator.geolocation){
            this.setState({loadingGeo:true, error: ''});
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTION
            );
        }
        else{
            this.setState({error: 'Your browser does not support geolocation!'})

        }

    }

    loadingNearbyActivities=(location, radius)=>{
        this.setState({loadingActivities: true});
        const {lat, lon} = location ? location : JSON.parse(localStorage.getItem("POS_KEY"));
        const range = radius? radius : 20;
        return $.ajax({
            url: `${API_ROOT}/search?user_id=1111&lat=${lat}&lon=${lon}`,
            method: 'GET',
            //headers -> authorization
        }).then((response)=>{
            this.setState({activities: response});
            console.log(this.state.activities);
        }, (error)=>{
            this.setState({error: error.responseText});
        }).then(()=>{
            this.setState({loadingActivities: false});
        }).catch((error)=>{
            console.log(error)
        });
    }

    loadingFavoriteActivities=()=>{
        this.setState({loadingFavorite: true});
        return $.ajax({
            url: `${API_ROOT}/history?user_id=1111`,
            method: 'GET',
            //headers -> authorization
        }).then((response)=>{
            this.setState({activities: response});
            console.log(response);
        }, (error)=>{
            this.setState({error: error.responseText});
        }).then(()=>{
            this.setState({loadingFavorite: false});
        }).catch((error)=>{
            console.log(error)
        });
    }

    loadingRecommendActivities=(location, radius)=>{
        this.setState({loadingRecommend: true});
        const {lat, lon} = location ? location : JSON.parse(localStorage.getItem("POS_KEY"));
        const range = radius? radius : 20;
        return $.ajax({
            url: `${API_ROOT}/recommendation?user_id=1111&lat=${lat}&lon=${lon}`,
            method: 'GET',
            //headers -> authorization
        }).then((response)=>{
            this.setState({activities: response});
            console.log(response);
        }, (error)=>{
            this.setState({error: error.responseText});
        }).then(()=>{
            this.setState({loadingRecommend: false});
        }).catch((error)=>{
            console.log(error)
        });
    }

    loadingOnScreen=()=>{
        if(this.state.error){
            return <div>{this.state.error}</div>
        }else if(this.state.loadingGeo){
            return <Spin tip="Loading Geo Location..."/>
        }else if(this.state.loadingActivities){
            return <Spin tip="Loading Activities"/>
        }else if(this.state.activities){
            return <Itemlist activities={this.state.activities}/>
        }
        return null;
    }

    render(){
        return(
            <div className="container">
                <header>
                    <p>
                        <span>Item</span>
                        <br /> Recommendation
                    </p>
                </header>
                <section className="main-section">
                    <Aside activities={this.state.activities}
                           loadingNearbyActivities={this.loadingNearbyActivities}
                           loadingFavoriteActivities={this.loadingFavoriteActivities}
                           loadingRecommendActivities={this.loadingRecommendActivities}
                    />
                    <Itemlist activities={this.state.activities}/>
                    {/*{this.loadingOnScreen()}*/}
                </section>
            </div>
        )
    }



}