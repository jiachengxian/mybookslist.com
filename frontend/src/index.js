import React from "react"
import {render} from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'
import Main from "./Main"
import "./index.css"

render(
    <BrowserRouter>
        <Route path="/" component={Main}/>
    </BrowserRouter>,
    document.getElementById("root")
);