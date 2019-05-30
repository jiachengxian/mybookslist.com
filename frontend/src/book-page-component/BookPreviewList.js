import React, { Component } from "react";
import axios from 'axios';
import "./BookPreview.css";
import BookPreview from "./BookPreview.js";

class BookPreviewList extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            details: false
        };
        this.ListDiv = this.ListDiv.bind(this);
    }



    ListDiv(){
       const list = [];
       console.log(this.props.book_list);
       var len = this.props.book_list.length;
       for(var i =0; i< len;i++){
          console.log(this.props.book_list[i]);
          list.push(
            <div className="col">
              <BookPreview name={this.props.book_list[i]}></BookPreview>
            </div>);
       }

       return(<div className="row">{list}</div>);
    }

    // componentDidMount(){
    //     axios.get(`http://localhost:8000/get_book_json/${this.props.name}`)
    //     .then(response=>{
    //         //console.log(response.data);
    //         this.setState({book_data:response.data});
    //     })
    //     .catch(console.error);
    // }

    render() {
        //var DetailDiv = this.detailsDiv;
        var ListDiv = this.ListDiv;
        return(
            <ListDiv></ListDiv>
        );
    }
}
export default BookPreviewList;