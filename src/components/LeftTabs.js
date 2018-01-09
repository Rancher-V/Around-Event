import React from 'react'
import {TabItem} from './TabItem'

export class LeftTabs extends React.Component {

    render() {
        const iconName = {
            'Nearby': 'fa fa-map-marker',
            'My Favorites': 'fa fa-heart',
            'Recommendation': 'fa fa-thumbs-up'
        }

        return (
            <aside id="item-nav">
                <div className="nav-icon">
                    <i className="fa fa-sitemap fa-2x"></i>
                </div>
                <nav className="main-nav">
                    {Object.entries(iconName).map(([key, value]) =>
                        <TabItem
                            key={key}
                            tabName={key}
                            iconName={value}
                            onSelectedTab={this.props.onSelectedTab}
                            isHighlighted={this.props.selectedTab === key ? 'active' : ''}
                        />
                    )}
                </nav>
            </aside>
        )

    }
}