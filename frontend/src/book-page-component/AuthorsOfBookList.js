import React, { Component } from "react";

class AuthorsOfBookList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.book_data != null && this.props.book_data.Author != null){
            return(
                <div className="author_block">by:&nbsp;
                    {this.props.book_data.Author.map((author,i) => {
                        if(i+1 === this.props.book_data.Author.length){
                            return(
                                <div key={i} className="author_container">
                                <a href="">{author}</a>
                                </div>  
                            );
                        }else{
                            return(
                                <div key={i} className="author_container">
                                    <a href="">{author}</a>
                                ,&nbsp;</div>    
                            ); 
                        }
                    })}
                </div>
            );
        }else{
            return(null);
        }
    }
}
export default AuthorsOfBookList;