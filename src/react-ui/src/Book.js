import React, { Component } from "react";
import "./Book.css";
import testImage from "./testImage.jpg";

class Book extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            details: false
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
                    <div id="isbn">ISBN</div>
                    <div id="publisher">Publisher</div>
                    <div id="language">Language</div>
                    <div id="release">Release Date</div>
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
    render() {
        var DetailDiv = this.detailsDiv;

        return(
            <div>
                <div className="row" id="basic-info-row">
                    <div className="col">
                        <div id="pic">
                            <img src={testImage}/>
                        </div>
                    </div>
                            
                    <div className="col">
                        <div id="text">
                            <h1 id="title">Madness and Civilization</h1>
                            <div id="author">by: <a href="author.html">Michel Foucault</a></div>
                            <DetailDiv></DetailDiv>
                            
                        </div> 
                    </div>
                </div>

                <hr></hr>

                <div className="row my-3 description-row">           
                    <div id="description">
                        Madness and Civilization: A History of Insanity in the Age of Reason 
                        (French: Folie et Déraison: Histoire de la folie à l'âge classique) is 
                        a 1964 abridged edition of a 1961 book by the French philosopher Michel 
                        Foucault. An English translation of the complete 1961 edition, titled 
                        History of Madness, was published in June 2006.[1]Foucault's first major 
                        book, Madness and Civilization is an examination of the evolving meaning 
                        of madness in European culture, law, politics, philosophy and medicine 
                        from the Middle Ages to the end of the eighteenth century, and a critique 
                        of historical method and the idea of history. It marks a turning in 
                        Foucault's thought away from phenomenology toward structuralism: though he 
                        uses the language of phenomenology to describe an evolving experience of 
                        the mad as "the other", he attributes this evolution to the influence of 
                        specific powerful social structures.[2]
                    </div>
                </div>
            </div>
        );
    }


}



export default Book; 