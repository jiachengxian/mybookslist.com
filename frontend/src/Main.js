import React from "react";
import "./Main.css";
import { Link, Route, Switch } from 'react-router-dom';
import Home from "./home-page-component/Home";
import Book from "./book-page-component/Book";
import BookMainPage from "./book-page-component/BookMainPage";
import Author from "./author-page-component/Author";
import AuthorMainPage from "./author-page-component/AuthorMainPage";
const Main = () => {
    return(
        <div className="container-fluid">
            <nav className="navbar header row"> 
                    <h2>My Reading List</h2>
                    <ul>
                        <li className="header-link"><Link to="/">Home</Link></li>
                        <li className="header-link"><Link to="/book_landing_page">Books</Link></li>
                        <li className="header-link"><Link to="/author_landing_page">Authors</Link></li>
                    </ul>
                
            </nav>
            <div className="row my-4 content-row">
                <div className="col dummy"></div>      
                <div className="col-md-8 content">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/book_landing_page" render={ () => <BookMainPage></BookMainPage>}/>
                        <Route path="/author_landing_page" render={ () => <AuthorMainPage></AuthorMainPage>}/>
                        <Route path={"/book/:name"} render={({match}) => <Book name={`${match.params.name}`}></Book>}/>
                        <Route path={"/author/:name"} render={({match}) => <Author name={`${match.params.name}`}></Author>}/>
                    </Switch>
                </div>
                <div className="col dummy"></div>      
            </div>
        </div>
    )
}


export default Main;