import React, { Component } from "react";
import axios from 'axios';
import "./BookPreview.css";
import BookPreview from "./BookPreview.js";
import BookResultRow from "./BookResultRow";

class BookResultList extends Component{
    constructor(props){
        super(props);
        
        this.ListDiv = this.ListDiv.bind(this);
    }
    
    ListDiv(){
       const list = [];
       this.props.book_list.forEach(element => {
          list.push(
            <div className="row">
              <BookResultRow name={element.Title}></BookResultRow>
            </div>);
       });
       return(<div className="col">{list}</div>);
    }

    render() {
        var ListDiv = this.ListDiv;
        return(
            <ListDiv></ListDiv>
        );
    }
}
export default BookResultList;