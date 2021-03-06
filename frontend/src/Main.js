import React, { Component } from "react";
import "./Main.css";
import { NavLink, Route, Switch } from 'react-router-dom';
import Home from "./home-page-component/Home";
import Book from "./book-page-component/Book";
import BookMainPage from "./book-page-component/BookMainPage";
import Author from "./author-page-component/Author";
import AuthorMainPage from "./author-page-component/AuthorMainPage";
import Results from "./search-page-component/Results"
class Main extends Component {
    render() {
        return(
            <div className="container-fluid">
                <nav className="navbar header row"> 
                    <h2>My Reading List</h2>
                    <ul className="nav-list">
                        <li className="header-link"><NavLink className="app-link" to="/">Home</NavLink></li>
                        <li className="header-link"><NavLink className="app-link" to="/book_landing_page">Books</NavLink></li>
                        <li className="header-link"><NavLink className="app-link" to="/author_landing_page">Authors</NavLink></li>
                    </ul>
                </nav>
                <div className="row my-4 content-row">
                    <div className="col dummy"></div>      
                    <div className="col-md-8 content">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/book_landing_page" render={ () => <BookMainPage></BookMainPage>}/>
                            <Route path="/author_landing_page" render={ () => <AuthorMainPage></AuthorMainPage>}/>
                            <Route path={"/book/:name"} render={({match}) => <Book name={match.params.name}></Book>}/>
                            <Route path={"/author/:name"} render={({match}) => <Author name={match.params.name}></Author>}/>
                            <Route path={"/search/:query"} render={({match}) => <Results query={match.params.query}></Results>}/>
                        </Switch>
                    </div>
                    <div className="col dummy"></div>      
                </div>
            </div>
        )
    }
}


export default Main;