import React from 'react';
import {withRouter} from 'react-router-dom';

function FooterBase() {
    return (
        <footer className="footer">
            <div className="footer-copyright text-center py-3">
				© 2019 Copyright: Sportify
            </div>
        </footer>
    );
}

export const Footer = withRouter(FooterBase);