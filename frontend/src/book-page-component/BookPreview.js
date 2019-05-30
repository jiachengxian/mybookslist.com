import React, { Component } from "react";
import axios from 'axios';
import "./BookPreview.css";

class BookPreview extends Component{
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
                    {/*<a href="author.html">{this.state.book_data.Author}</a>*/}
                    {this.state.book_data.Author.map((author,i) => {
                        if(i+1 === this.state.book_data.Author.length){
                            return(
                                <div className="author_container">
                                <a href="">{author}</a>
                                </div>  
                            );
                        }else{
                            return(
                                <div className="author_container">
                                    <a href="">{author}</a>
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
        axios.get(`http://localhost:8000/get_book_json/${this.props.name}`)
        .then(response=>{
            //console.log(response.data);
            this.setState({book_data:response.data});
        })
        .catch(console.error);
    }

    render() {
        var AuthorsDiv = this.authorsDiv;
        return(
            <div>
                <div className="row" id="basic-info-row">
                    <div className="col" id="pic">
                            <img src={this.state.book_data.Image_Link}/>
                    </div>
                            
                    <div className="col" id="text">
                            <a href="/book"id="title">{this.state.book_data.Title}</a>
                            {/*<a href="author.html">{this.state.book_data.Author}</a>*/}
                            <AuthorsDiv></AuthorsDiv>
                            {this.state.book_data.Series!="" &&
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