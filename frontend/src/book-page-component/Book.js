import React, { Component } from "react";
import axios from 'axios';
import GLOBALS from "../globals";
import AuthorsOfBookList from "./AuthorsOfBookList";
import "./Book.css";

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
                    {this.state.book_data.ISBN!=null &&
                    <div id="isbn">ISBN: {this.state.book_data.ISBN}</div>}
                    {this.state.book_data.Publisher!=null &&
                    <div id="publisher">Publisher: {this.state.book_data.Publisher}</div>}
                    {this.state.book_data.Publish_Date!=null &&
                    <div id="release">Publish Date: {this.state.book_data.Publish_Date}</div>}
                    {this.state.book_data.Pages!=null &&
                    <div id="pages">Pages: {this.state.book_data.Pages}</div>}
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
        axios.get(`${GLOBALS.BASE_URL}/${GLOBALS.GET_BOOK_DATA_PATH}/${this.props.name}`)
        .then(response=>{
            //console.log(response.data);
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
                            <img alt={this.state.book_data.Title} src={this.state.book_data.Image_Link}/>
                        </div>
                    </div>
                            
                    <div className="col">
                        <div id="text">
                            <h1 id="title">{this.state.book_data.Title}</h1>
                            <AuthorsOfBookList book_data={this.state.book_data}></AuthorsOfBookList>
                            {this.state.book_data.Series!="" &&

                            <div id="series">Series: 
                                <a id="series-link" href=""> {this.state.book_data.Series}</a>
                            </div>}
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