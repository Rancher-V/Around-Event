import React from 'react'
import $ from 'jquery'
import {API_ROOT} from '../constants'

export class Item extends React.Component {
    state = {
        isFavorite: false
    }

    componentDidMount() {
        this.setState({
            isFavorite: this.props.item.favorite
        })
    }

    setFavorite = () => {
        //console.log(this.state.isFavorite)
        const req = {
            'user_id': '1111',
            'favorite': [this.props.item.item_id]
        }

        return $.ajax({
            url: `${API_ROOT}/history`,
            method: this.state.isFavorite ? 'DELETE' : 'POST',
            crossDomain: true,
            //headers -> authorization
            //contentType: 'application/x-www-form-urlencoded',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(req)
        }).then((response) => {
            this.setState((prevState) => ({isFavorite: !prevState.isFavorite}))
            console.log(response);
        }, (error) => {
            this.setState({error: error.responseText});
        }).then(() => {
            this.setState({loadingActivities: false});
        }).catch((error) => {
            console.log(error)
        });
    }


    render() {
        const {image_url, categories, name, url, address, city, state, item_id} = this.props.item;
        return (
            <li className="item" id={item_id}>
                <img alt="item" src={image_url}/>
                <div>
                    <a href={url} className="item-name">{name}</a>
                    <p className="item-category">{categories.join(', ')}</p>
                </div>
                <p className="item-address">{address}<br/>{city}<br/> {state}</p>
                <div className="fav-link">
                    <i className={this.state.isFavorite ? "fa fa-heart" : "fa fa-heart-o"}
                       onClick={this.setFavorite}></i>
                </div>
            </li>
        )
    }
}