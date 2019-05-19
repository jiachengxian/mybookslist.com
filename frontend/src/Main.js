import React, { Component } from "react";
import "./Main.css";
import Book from "./Book"
import Author from "./Author"
class Main extends Component {
    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 header">
                        <h2>My Reading List</h2>
                    </div>
                </div>
                
                <div className="row my-4 content-row">
                    <div className="col dummy"></div>      
                    <div className="col-md-8 content">
                        <Author name="Diana Peterfreund"></Author>
                    </div>
                    <div className="col dummy"></div>      
                </div>
            </div>
        )
    }
}

export default Main;