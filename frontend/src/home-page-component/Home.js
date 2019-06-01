import React, { Component } from "react";
import "./Home.css";
import Book from "../book-page-component/Book"
import axios from 'axios';
import BookPreview from "../book-page-component/BookPreview";
import BookPreviewList from "../book-page-component/BookPreviewList"
import logo from './placeholder.gif'

class Home extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            changed: 0,
            search: ""
        };
        this.setSearch = this.setSearch.bind(this);
        this.changeQ = this.changeQ.bind(this);
 
    }

    setSearch(e) {
        this.setState({
            search: e.target.value
        });
    }

    changeQ(e){
        alert(this.state.search);
    }

    render(props){
        var title = this.state.search;
        var titles = ["The Last Hunt", "Through the Looking-Glass and What Alice Found There", "Harry Potter and the Prisoner of Azkaban", "Changes"];
        return(
            <div className="home-header">
                <div className="row my-5">
                    <img src={logo} alt="Smiley face" height="200px"/>
                </div>

                <div className="row">
                    <form className="form-inline search" action={`/search/${this.state.search}`}>
                        <input className="form-control m-2" onChange={this.setSearch}></input>
                        <button className="btn searchbutton" type="submit">go</button>
                    </form>
                </div>

                <hr></hr>
                    <BookPreviewList book_list={titles}></BookPreviewList>
                <h1>{title}</h1>
            </div>
        )
    }
}
export default Home;