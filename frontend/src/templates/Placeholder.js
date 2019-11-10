import React from 'react'

import {Heading} from '../atoms/'

export function Placeholder({title, children}) {
    return (
        <div>
            <Heading>{title}</Heading>
            {typeof children === 'undefined' ? (
                <p>This page is empty for now...</p>
            ) : (
                children
            )}
        </div>
    )
}
