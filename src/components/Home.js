import React from 'react'
import {LeftTabs} from './LeftTabs'
import {Itemlist} from './Itemlist'
import {Spin} from 'antd'
import {TopBanner} from './TopBanner'
import {API_ROOT, GEO_OPTION, POS_KEY} from '../constants'
import $ from 'jquery'

export class Home extends  React.Component{
    state={
        selectedTab: '',
        loading: false,
        loadingDescription: '',
        loadingActivities: false,
        loadingFavorite: false,
        loadingRecommend: false,
        loadingGeo: false,
        error: '',
        activities: [],
    }

    componentDidMount(){
        this.getGeoLocation();
        if(this.state.error === ''){
            const url = this.settingUrlwithLodingState();
            this.loadingEvents(url);
        }
    }

    componentDidUpdate(){
        console.log(this.state.selectedTab);

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

    onSuccessLoadGeoLocation=(position)=>{
        this.setState({loadingGeo:false, loading: false, loadingDescription: '', error:''});
        const {latitude: lat, longitude: lon} = position.coords;
        console.log(position.coords);
        localStorage.setItem(POS_KEY, JSON.stringify({lat: lat, lon: lon}));
        //this.loadingNearbyActivities();
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

    onSelectedTab=(tabName)=>{
        this.setState({
            selectedTab: tabName,
        });

        if(this.state.error === ''){
            const url = this.settingUrlwithLodingState(tabName);
            console.log(url)
            this.loadingEvents(url);
        }
    }

    loadingEvents=(url)=>{
        return $.ajax({
            url: url,
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
        const loadingArea=(
            <section className="main-section">
                <LeftTabs onSelectedTab={this.onSelectedTab}
                          selectedTab={this.state.selectedTab}
                />
                <Itemlist   activities={this.state.activities}
                />
            </section>
        )

        return(
            <div className="container">
                <TopBanner />
                <Spin spinning={this.state.loading} tip={this.state.loadingDescription} delay={500} >{loadingArea}</Spin>
            </div>
        )
    }
}