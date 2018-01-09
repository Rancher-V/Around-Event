import React from 'react'

export class TabItem extends React.Component {
    state = {
        tabName: '',
        iconName: ''
    }

    componentDidMount() {
        this.setState({
            tabName: this.props.tabName,
            iconName: this.props.iconName
        })
    }

    tabItemClick = () => {
        this.props.onSelectedTab(this.state.tabName)
    }

    render() {
        return (
            <a className={`main-nav-btn ${this.props.isHighlighted}`} onClick={this.tabItemClick}>
                <i className={this.state.iconName}></i> {this.state.tabName}
            </a>
        )
    }
}