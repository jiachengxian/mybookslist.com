import React, { Component } from "react";
import axios from 'axios';
import GLOBALS from "../globals";
import "./BookPreview.css";
import "./BookResultRow.css";
class BookResultRow extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            book_data: {}
        };
        this.authorsDiv = this.authorsDiv.bind(this);
    }



    authorsDiv(){
        if(this.state.book_data != null && this.state.book_data.Author != null){
            return(
                <div className="author_block">by:&nbsp;
                    {this.state.book_data.Author.map((author,i) => {
                        if(i+1 === this.state.book_data.Author.length){
                            return(
                                <div className="author_container">
                                <a href={`author/${author}`}>{author}</a>
                                </div>  
                            );
                        }else{
                            return(
                                <div className="author_container">
                                    <a href={`author/${author}`}>{author}</a>
                                ,&nbsp;</div>    
                            ); 
                        }
                    })}
                </div>
            );
        }else{
            return(null)
        }
    }

    componentDidMount(){
        axios.get(`${GLOBALS.BASE_URL}/${GLOBALS.GET_BOOK_DATA_PATH}/${this.props.name}`)
        .then(response=>{
            //console.log(response.data);
            this.setState({book_data:response.data});
        })
        .catch(console.error);
    }

    render() {
        var AuthorsDiv = this.authorsDiv;
        return(
            <div className="container">
                <div className="row" id="basic-info-row">
                    <div className="col-md-4">
                            <img className="thumbnail" alt={this.state.book_data.Title} src={this.state.book_data.Image_Link}/>
                    </div>
                            
                    <div className="col-md-8">
                            <a href={`/book/${this.state.book_data.Title}`} id="title">{this.state.book_data.Title}</a>
                            <AuthorsDiv></AuthorsDiv>
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