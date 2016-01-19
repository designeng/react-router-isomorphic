import React, { PropTypes } from 'react';

export default class One extends React.Component {

    constructor() {
        super();
        console.log("ONE component");
    }

    render() {
        return <div>ONE component</div>;
    }
}