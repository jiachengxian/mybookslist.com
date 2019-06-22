import React, { Component } from "react";
import BookResultList from "./BookResultList"
class BookResultPage extends Component{
    constructor(props){
        super(props);
        this.state = {
          books :[],
          pages :[],
          pageLength : 25,
          page : 0
        };
        this.pageBinder = this.pageBinder.bind(this);
    }

    pageBinder(pageNumber){
      if(this.props.book_list.length === 0){
        return;
      }
      var start = pageNumber * this.state.pageLength;
      var end = start + this.state.pageLength;
      if(end > this.props.book_list.length){
        end = this.props.book_list.length;
      }
      for(var i= start;i<end;i++){
        this.state.books.push(this.props.book_list[i]);
      }
    }

    render() {
        this.pageBinder(0);
        return(
          <BookResultList book_list={this.state.books}></BookResultList>
        );
    }
}
export default BookResultPage;