import React from 'react'
import {Item} from './Item'

export class Itemlist extends React.Component{
    render(){
        return(
            <ul className="item-list">
                {this.props.activities? this.props.activities.map((item)=>
                    <Item
                        key={item.item_id}
                        item={item}
                    />) : null }
            </ul>

        )
    }
}
