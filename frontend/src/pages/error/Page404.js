import React from 'react';

import {NavLink as Link} from "react-router-dom";
import {Placeholder} from '../../basicComponents/Placeholder';

export function Page404() {
    return (
        <div>
            <Placeholder title="Error 404">
                <p>
                    Page not found, please return to <Link to="/">Home</Link>.
                </p>
            </Placeholder>
        </div>
    );
}
