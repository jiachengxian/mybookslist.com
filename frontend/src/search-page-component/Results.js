import React, { Component } from "react";
// import "./Home.css";
import Book from "../book-page-component/Book"
import axios from 'axios';
import BookPreview from "../book-page-component/BookPreview";
import BookPreviewList from "../book-page-component/BookPreviewList"
import "./Results.css"
// import logo from './placeholder.gif'

class Results extends Component {
    constructor(props){
        super(props);
        
        this.state = {
          searchResults:[]
        };
        this.setSearch = this.setSearch.bind(this);
        this.changeQ = this.changeQ.bind(this);
 
    }

    componentDidMount(){
      axios.get(`http://localhost:8000/search/book/${this.props.query}`)
      .then(response=>{
          //console.log(response.data);
          this.setState({searchResults:response.data});
          console.log(this.state.searchResults);
      })
      .catch(console.error);
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
        
        var titles = ["The Last Hunt", "Through the Looking-Glass and What Alice Found There", "Harry Potter and the Prisoner of Azkaban", "Changes"];
        return(
            
            <div className="home-header">
                <div className="row">
                  <h1>Search Results</h1>
                </div>
                <div className="row">
                    <form className="form-inline search" o>
                        <input className="form-control m-2" onChange={this.setSearch}></input>
                        <button className="btn searchbutton" type="submit">go</button>
                    </form>
                </div>

                <hr></hr>
                <BookPreviewList book_list={this.state.searchResults}></BookPreviewList>
            </div>
        )
    }
}
export default Results;