import React, { Component } from "react";
import "./Home.css";
import BookPreviewList from "../book-page-component/BookPreviewList"
import SearchBar from "../search-bar-component/SearchBar";
import logo from './placeholder.gif'

class Home extends Component {
    constructor(props){
        super(props);
        
        this.state = {
        };
 
    }

    render(props){
        var titles = [{"Title":"Harry Potter and the Prisoner of Azkaban"},{"Title":"Harry Potter and the Chamber of Secrets"},{"Title":"Harry Potter and the Order of the Phoenix"},{"Title":"Harry Potter and the Goblet of Fire"},{"Title":"Harry Potter and the Sorcerer's Stone"},{"Title":"Harry Potter and the Half-Blood Prince"},{"Title":"Harry Potter and the Deathly Hallows"}];
        return(
            <div className="home-header">
                <div className="row my-5">
                    <img src={logo} alt="Smiley face" height="200px"/>
                </div>

                <div className="row">
                    <SearchBar></SearchBar>
                </div>

                <hr></hr>
                    <BookPreviewList book_list={titles}></BookPreviewList>
            </div>
        )
    }
}
export default Home;