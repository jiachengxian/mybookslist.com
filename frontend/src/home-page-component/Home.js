import React, { Component } from "react";
import "./Home.css";
import Book from "../book-page-component/Book"
import axios from 'axios';
import BookPreview from "../book-page-component/BookPreview";
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

        return(
            <div className="home-header">
                <div className="row">
                    <img src={logo} alt="Smiley face" height="200px"/>
                </div>

                <div className="row">
                    <form className="form-inline search">
                        <input className="form-control" onChange={this.setSearch}></input>
                        <button className="btn-1">go</button>
                    </form>
                </div>

                <hr></hr>
                <div className="row">
                    <div className="col">
                        <BookPreview name="The Last Hunt"></BookPreview>
                    </div>
                    <div className="col">
                        <BookPreview name="Through the Looking-Glass and What Alice Found There"></BookPreview>
                    </div>
                    <div className="col">
                        <BookPreview name="Harry Potter and the Prisoner of Azkaban"></BookPreview>
                    </div>
                    <div className="col">
                        <BookPreview name="Changes"></BookPreview>
                    </div>
                </div>
                <h1>{title}</h1>
            </div>
        )
    }
}
export default Home;