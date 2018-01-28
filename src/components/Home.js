import React from 'react'
import {LeftTabs} from './LeftTabs'
import {Itemlist} from './Itemlist'
import {Spin} from 'antd'
import {TopBanner} from './TopBanner'
import {GEO_OPTION, POS_KEY} from '../constants'

export class Home extends React.Component {
    state = {
        selectedTab: '',
        loading: false,
        loadingDescription: '',
        error: ''
    }

    componentDidMount() {
        this.getGeoLocation();
    }

    onSuccessLoadGeoLocation = (position) => {
        this.setState({loading: false, loadingDescription: '', error: ''});
        const {latitude: lat, longitude: lon} = position.coords;
        console.log(position.coords);
        localStorage.setItem(POS_KEY, JSON.stringify({lat: lat, lon: lon}));
    }

    onFailedLoadGeoLocation = () => {
        this.setState({
            loading: false,
            loadingDescription: '',
            error: 'Failed to load geo location'
        });
    }


    getGeoLocation = () => {
        console.log("loading geolocation now");
        if (navigator && navigator.geolocation) {
            this.setState({
                loading: true,
                loadingDescription: 'Loading Geo Location Now...',
                error: ''
            });
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTION
            );
        }
        else {
            this.setState({error: 'Your browser does not support geolocation!'})
        }
    }


    onSelectedTab = (tabName) => {
        this.setState({
            selectedTab: tabName,
        });
    }

    setLoadingStatus = (status, desc) => {
        //console.log(desc)
        this.setState({
            loading: status,
            loadingDescription: desc
        })
    }

    setLoadingError = (err) => {
        this.setState({
            error: err
        })
    }

    // getLoadings=()=>{
    //     if(this.state.loading){
    //         return <Spin spinning={this.state.loading} tip={this.state.loadingDescription} delay={500}></Spin>
    //     }
    //     else
    //     {
    //         return(
    //             <Itemlist selectedTab={this.state.selectedTab}
    //                       loadingErr={this.state.error}
    //                       setLoadingStatus={this.setLoadingStatus}
    //                       setLoadingError={this.setLoadingError}
    //             />
    //         )
    //     }
    // }

    render() {
        const loadingArea = (
            <section className="main-section">
                <LeftTabs onSelectedTab={this.onSelectedTab}
                          selectedTab={this.state.selectedTab}
                />
                {/*{this.getLoadings()}*/}

                <Itemlist selectedTab={this.state.selectedTab}
                          loadingErr={this.state.error}
                          setLoadingStatus={this.setLoadingStatus}
                          setLoadingError={this.setLoadingError}
                />
            </section>
        )

        return (
            <div className="container">
                <TopBanner/>
                {/*{loadingArea}*/}
                <Spin spinning={this.state.loading} tip={this.state.loadingDescription} delay={500}>{loadingArea}</Spin>
            </div>
        )
    }
}