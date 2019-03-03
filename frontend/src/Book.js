import React, { Component } from "react";
import axios from 'axios';
import "./Book.css";
import testImage from "./testImage.jpg";

class Book extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            details: false,
            book_data: {}
        };
        this.showDetails = this.showDetails.bind(this);
        this.detailsDiv = this.detailsDiv.bind(this);
    }

    showDetails(e) {
        this.setState({
            details: !this.state.details
        });
    }

    detailsDiv() {
        if(this.state.details){
            return( 
                <div>
                    <div id="isbn">ISBN: {this.state.book_data.ISBN[0]}</div>
                    <div id="publisher">Publisher: {this.state.book_data.Publisher}</div>
                    <div id="language">Language: </div>
                    <div id="release">Publish Date: {this.state.book_data.Publish_Date}</div>
                    <a id="less-details" className="details-button" onClick={this.showDetails} href="#">Less details...</a>
                </div>
                );
        } else{
            return(
                <div>
                    <a id="more-details" className="details-button" onClick={this.showDetails} href="#">More details...</a>
                </div>
            );
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8000/get_book_json/default')
        .then(response=>{
            console.log(response.data);
            this.setState({book_data:response.data});
        })
        .catch(console.error);
    }

    render() {
        var DetailDiv = this.detailsDiv;

        return(
            <div>
                <div className="row" id="basic-info-row">
                    <div className="col">
                        <div id="pic">
                            <img src={this.state.book_data.Image_Link}/>
                        </div>
                    </div>
                            
                    <div className="col">
                        <div id="text">
                            <h1 id="title">{this.state.book_data.Title}</h1>
                            <div id="author">by: <a href="author.html">{this.state.book_data.Author}</a></div>
                            <DetailDiv></DetailDiv>
                            
                        </div> 
                    </div>
                </div>

                <hr></hr>

                <div className="row my-3 description-row">           
                    <div id="description">{this.state.book_data.Description}</div>
                </div>
            </div>
        );
    }
}
export default Book;