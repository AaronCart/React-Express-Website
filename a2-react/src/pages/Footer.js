import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-dark text-white fixed-bottom py-1">
                <ul className="navbar-nav mr-auto mx-5 px-5">
                    <li className="nav-item">
                        © Vibe Check 2021
                    </li>
                </ul>
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        Aaron Cartledge
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mx-5 px-5">
                        s3840848
                    </li>
                </ul>
                {/* My Name & Student Number will be displayed in the footer at all times */}
            </nav>

        );
    }
}

export default Footer