import React from 'react'

export class Aside extends React.Component{

    searchNearBy=()=>{
        console.log("searching near by");
        this.props.loadingNearbyActivities();
    }

    searchFavorite=()=>{
        console.log("searching Favorite");
        this.props.loadingFavoriteActivities();
    }

    getRecommend=()=>{
        console.log("getting recommend");
        this.props.loadingRecommendActivities();
    }


    render(){
        return(
            <aside id="item-nav" >
                <div className="nav-icon">
                    <i className="fa fa-sitemap fa-2x"></i>
                </div>
                <nav className="main-nav">
                    <a id="nearby-btn" className="main-nav-btn active" onClick={this.searchNearBy}>
                        <i className="fa fa-map-marker"></i> Nearby
                    </a>
                    <a id="fav-btn" className="main-nav-btn" onClick={this.searchFavorite}>
                        <i className="fa fa-heart"></i> My Favorites
                    </a>
                    <a id="recommend-btn" className="main-nav-btn" onClick={this.getRecommend}>
                        <i className="fa fa-thumbs-up"></i> Recommendation
                    </a>
                </nav>
            </aside>





        )

    }
}