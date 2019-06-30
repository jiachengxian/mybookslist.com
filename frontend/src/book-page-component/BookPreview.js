import React, { Component } from "react";
import axios from 'axios';
import GLOBALS from "../globals";
import AuthorOfBookList from "../book-page-component/AuthorsOfBookList";
import "./BookPreview.css";

class BookPreview extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            book_data: {}
        };
    }

    componentDidMount(){
        axios.get(`${GLOBALS.BASE_URL}/${GLOBALS.GET_BOOK_DATA_PATH}/${this.props.name}`)
        .then(response=>{
            this.setState({book_data:response.data});
        })
        .catch(console.error);
    }

    render() {
        return(
            <div>
                <div className="row" id="basic-info-row">
                    <div className="col" id="pic">
                            <img className="thumbnail" alt={this.state.book_data.Title} src={this.state.book_data.Image_Link}/>
                    </div>
                            
                    <div className="col" id="text">
                            <a href={`/book/${this.state.book_data.Title}`} id="title">{this.state.book_data.Title}</a>
                            <AuthorOfBookList book_data = {this.state.book_data}></AuthorOfBookList>
                            {this.state.book_data.Series!=="" &&
                            <div id="series">Series: 
                                <a id="series-link" href=""> {this.state.book_data.Series}</a>
                            </div>}
                    </div>
                </div>
            </div>
        );
    }
}
export default BookPreview;