import React, { Component } from 'react';
import brandLogo from './vCheck.png';
// Logo made using https://www.canva.com/

class Header extends Component {
    render() {
        return (
            <div className="container-fluid text-center py-2 bg-secondary text-white">
                <a href="/">
                <img src={brandLogo} alt="VC Logo" className="mb-2" style={{ width: 110 }}></img>
                </a>
                {/* Logo is displayed in Header as it will be displayed at all times */}
                <h2 className="verdana"><u>The Friendly Student Community</u></h2>
            </div>
        );
    }
}

export default Header