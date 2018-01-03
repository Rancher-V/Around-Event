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
        loading: false,
        loadingDescription: '',
        error: '',
    }

    componentDidMount(){
        this.getGeoLocation();
    }


    onSuccessLoadGeoLocation=(position)=>{
        this.setState({loadingGeo:false, loading: false, loadingDescription: '', error:''});
        const {latitude: lat, longitude: lon} = position.coords;
        console.log(position.coords);
        localStorage.setItem(POS_KEY, JSON.stringify({lat: lat, lon: lon}));
        this.loadingNearbyActivities();
    }

    onFailedLoadGeoLocation=()=>{
        this.setState({loadingGeoLocation: false, loading: false, loadingDescription: '', error: 'Failed to load geo location'});
    }


    getGeoLocation=()=>{
        console.log("loading geolocation now");
        if(navigator && navigator.geolocation){
            this.setState({loadingGeo:true, loading: true, loadingDescription: 'Loading Geo Location Now...', error: ''});
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
        this.setState({loadingActivities: true, loading: true, loadingDescription: 'Loading Interesting Events Around You Now...'});
        const {lat, lon} = location ? location : JSON.parse(localStorage.getItem("POS_KEY"));
        const range = radius? radius : 20;
        return $.ajax({
            url: `${API_ROOT}/search?user_id=1111&lat=${lat}&lon=${lon}&radius=${range}`,
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

    loadingFavoriteActivities=()=>{
        this.setState({loadingFavorite: true, loading: true, loadingDescription: 'Loading Your Favorite Now...'});
        return $.ajax({
            url: `${API_ROOT}/history?user_id=1111`,
            method: 'GET',
            //headers -> authorization
        }).then((response)=>{
            this.setState({activities: response, error:''});
            console.log(response);
        }, (error)=>{
            this.setState({error: error.responseText});
        }).then(()=>{
            this.setState({loadingFavorite: false, loading: false, loadingDescription: ''});
        }).catch((error)=>{
            console.log(error)
        });
    }

    loadingRecommendActivities=(location, radius)=>{
        this.setState({loadingRecommend: true, error:'', loading: true, loadingDescription: 'Loading Recommend Activities Now...'});
        const {lat, lon} = location ? location : JSON.parse(localStorage.getItem("POS_KEY"));
        const range = radius? radius : 20;
        return $.ajax({
            url: `${API_ROOT}/recommendation?user_id=1111&lat=${lat}&lon=${lon}&radius=${range}`,
            method: 'GET',
            //headers -> authorization
        }).then((response)=>{
            this.setState({activities: response, error:''});
            console.log(response);
        }, (error)=>{
            this.setState({error: error.responseText});
        }).then(()=>{
            this.setState({loadingRecommend: false, loading: false, loadingDescription: ''});
        }).catch((error)=>{
            console.log(error)
        });
    }

    render(){
        const container=(
            <section className="main-section">
                <Aside activities={this.state.activities}
                       loadingNearbyActivities={this.loadingNearbyActivities}
                       loadingFavoriteActivities={this.loadingFavoriteActivities}
                       loadingRecommendActivities={this.loadingRecommendActivities}
                />
                <Itemlist activities={this.state.activities}/>
            </section>
        )


        return(
            <div className="container">
                <header>
                    <p>
                        <span>Item</span>
                        <br /> Recommendation
                    </p>
                </header>

                <Spin spinning={this.state.loading} tip={this.state.loadingDescription} delay={500} >{container}</Spin>

            </div>
        )
    }



}