import React, { Component } from "react";
import "./Main.css";
import { Link, Route, Switch } from 'react-router-dom';
import Home from "./home-page-component/Home";
import Book from "./book-page-component/Book";
import Author from "./author-page-component/Author";
class Main extends Component {
    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 header">
                        <h2>My Reading List</h2>
                        <ul>
                            <li className="header-link"><Link to="/">Home</Link></li>
                            <li className="header-link"><Link to="/book">Books</Link></li>
                            <li className="header-link"><Link to="/author">Authors</Link></li>
                        </ul>
                    </div>
                </div>

                
                <div className="row my-4 content-row">
                    <div className="col dummy"></div>      
                    <div className="col-md-8 content">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/book" render={ () => <Book name="Harry Potter and the Goblet of Fire"></Book>}/>
                            <Route path="/author" render={ () => <Author name="Diana Peterfreund"></Author>}/>
                        </Switch>
                    </div>
                    <div className="col dummy"></div>      
                </div>
            </div>
        )
    }
}

export default Main;