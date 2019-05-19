import React, { Component } from "react";
import axios from 'axios';
import "./Book.css";

class Author extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            details: false,
            author_data: {}
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
                    {this.state.author_data.Birth_Date!=null &&
                    <div id="birthdate">Birth Date: {this.state.author_data.Birth_Date}</div>}
                    {this.state.author_data.Death_Date!=null &&
                    <div id="deathdate">Death Date: {this.state.author_data.Death_Date}</div>}
                    {this.state.author_data.Genres!=null &&
                    <div id="release">Genres: {this.state.author_data.Genres}</div>}
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
        axios.get('http://localhost:8000/get_book_json/The Yale Shakespeare Complete Works')
        .then(response=>{
            //console.log(response.data);
            this.setState({author_data:response.data});
        })
        .catch(console.error);
    }

    render() {
        var DetailDiv = this.detailsDiv;
        var AuthorsDiv = this.authorsDiv;
        return(
            <div>
                <div className="row" id="basic-info-row">
                    <div className="col">
                        <div id="pic">
                            <img src={this.state.author_data.Image_Link}/>
                        </div>
                    </div>
                            
                    <div className="col">
                        <div id="text">
                            <h1 id="name">{this.state.author_data.Name}</h1>
                            <DetailDiv></DetailDiv>                            
                        </div> 
                    </div>
                </div>

                <hr></hr>

                <div className="row my-3 description-row">           
                    <div id="description">{this.state.author_data.Description}</div>
                </div>
            </div>
        );
    }
}
export default Author;