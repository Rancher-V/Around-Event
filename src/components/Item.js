import React from 'react'

export class Item extends React.Component{
    render(){
        const { image_url, categories, name, url, favorite, address, city, state, item_id} = this.props.item;
        return(
            <li className="item" id={item_id}>
                <img alt="item" src={image_url} />
                <div>
                    <a href={url} className="item-name">{name}</a>
                    <p className="item-category">{categories.join(', ')}</p>
                </div>
                <p className="item-address">{address}<br/>{city}<br/> {state}</p>
                <div className="fav-link">
                    <i className={favorite ? "fa fa-heart" : "fa fa-heart-o"}></i>
                </div>
            </li>
        )
    }
}