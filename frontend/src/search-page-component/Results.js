import React, { Component } from "react";
import axios from 'axios';
import BookPreviewList from "../book-page-component/BookPreviewList"
import GLOBALS from "../globals";
import "./Results.css"
import BookResultList from "../book-page-component/BookResultList";
import SearchBar from "../search-bar-component/SearchBar";
import BookResultPage from "../book-page-component/BookResultPage";
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
      axios.get(`${GLOBALS.BASE_URL}/${GLOBALS.SEARCH_FOR_BOOKS_PATH}/${this.props.query}`)
      .then(response=>{
          this.setState({searchResults:response.data});
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
        return(
            <div className="home-header">
                <div className="row">
                  <h1>Search Results</h1>
                </div>
                <div className="row">
                    <SearchBar></SearchBar>
                </div>

                <hr></hr>
                <BookResultPage book_list={this.state.searchResults}></BookResultPage>
            </div>
        )
    }
}
export default Results;