import React from 'react';
import PropTypes from 'prop-types';
import logo from './board-game-icon.svg';

const Header = (props) => (
    <nav className="header navbar navbar-dark bg-dark">
        <div className="container">
            <div className="row m-auto">
                <img src={logo} className="App-logo" alt="logo" width="100" />
                <div className="h3 ml-3 my-auto text-light" href="/">{props.title}</div>
            </div>
        </div>
    </nav>
);

Header.defaultProps = {
    title: 'Title'
};

Header.propTypes = {
    title: PropTypes.string
};

export default Header;
