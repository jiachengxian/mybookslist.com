import React, { Component } from "react";
import axios from 'axios';
import GLOBALS from "../globals";
import AuthorsOfBookList from "./AuthorsOfBookList";
import "./BookPreview.css";
import "./BookResultRow.css";
class BookResultRow extends Component{
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
            <div className="container">
                <div className="row" id="basic-info-row">
                    <div className="col-md-4">
                            <img className="thumbnail" alt={this.state.book_data.Title} src={this.state.book_data.Image_Link}/>
                    </div>
                            
                    <div className="col-md-8">
                            <a href={`/book/${this.state.book_data.Title}`} id="title">{this.state.book_data.Title}</a>
                            <AuthorsOfBookList book_data={this.state.book_data}></AuthorsOfBookList>
                            {this.state.book_data.Series!=="" &&
                            <div id="series">Series: 
                                <a id="series-link" href=""> {this.state.book_data.Series}</a>
                            </div>}
                    </div>

                    
                </div>
                <hr></hr>
            </div>
        );
    }
}
export default BookResultRow;