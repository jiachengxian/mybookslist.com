import React, { Component } from "react";
import axios from 'axios';
import "./BookPreview.css";
import BookPreview from "./BookPreview.js";

class BookPreviewList extends Component{
    constructor(props){
        super(props);
        
        this.ListDiv = this.ListDiv.bind(this);
    }
    
    ListDiv(){
       const list = [];
       this.props.book_list.forEach(element => {
          list.push(
            <div className="col">
              <BookPreview name={element.Title}></BookPreview>
            </div>);
       });
       return(<div className="row">{list}</div>);
    }

    render() {
        var ListDiv = this.ListDiv;
        return(
            <ListDiv></ListDiv>
        );
    }
}
export default BookPreviewList;