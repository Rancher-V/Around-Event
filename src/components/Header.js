import React from 'react'
import logo from '../assets/images/logo.svg';

export class Header extends React.Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <nav className="top-nav">
                    <a>Home</a>
                    <a>Contact</a>
                    <a>About</a>
                </nav>
            </header>
        )
    }
}