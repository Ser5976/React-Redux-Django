import React from 'react';
import './App.css';
import MyRouter from "../Router/router";

let createReactClass = require('create-react-class');


const App = createReactClass({

    render() {
        return (
            <MyRouter/>
        )
    }
});

export default App;