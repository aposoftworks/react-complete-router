//Core
import React from './node/react';

export default function View ({id, ...props}) {
    return <h1>Custom id: {id}</h1>;
}