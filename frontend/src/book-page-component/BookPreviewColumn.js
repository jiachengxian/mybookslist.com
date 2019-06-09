import React, { Component } from "react";
import axios from 'axios';
import BookPreview from "./BookPreview.js";

class BookPreviewColumn extends Component{
    constructor(props){
        super(props);
        
        this.ListDiv = this.ListDiv.bind(this);
    }
    
    ListDiv(){
       const list = [];
       this.props.book_list.forEach(element => {
          list.push(
            <div className="row my-3">
              <li>
                <BookPreview name={element.Title}></BookPreview>
                <hr></hr>
              </li>
            </div>);
       });
       return(<ul>{list}</ul>);
    }

    render() {
        var ListDiv = this.ListDiv;
        return(
            <ListDiv></ListDiv>
        );
    }
}
export default BookPreviewColumn;