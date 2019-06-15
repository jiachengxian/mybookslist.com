import Autosuggest from 'react-autosuggest';
import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import GLOBALS from '../globals';
import "./SearchBar.css";

const LIMIT_BOOKS_DISPLAYED = 10;
const MAX_CHARACTER_LIMIT = 50;

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.Title;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <NavLink className="suggestionContainer" to={`/book/${suggestion.Title}`}>
    <span className="suggestionTextContainer">
      {suggestion.Title}
    </span>
  </NavLink>
);

class SearchBar extends Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    axios.get(`${GLOBALS.BASE_URL}/${GLOBALS.SEARCH_FOR_BOOKS_PATH}/${inputValue}/${LIMIT_BOOKS_DISPLAYED}`)
      .then(response=>{
        var suggestions = inputLength === 0 ? [] : response.data;
        suggestions = suggestions.map(function(suggestion){
          if (suggestion.Title.length > MAX_CHARACTER_LIMIT){
            suggestion.Title = suggestion.Title.substring(0,MAX_CHARACTER_LIMIT) + '...';
          }
          return suggestion;
        })
          this.setState({
            suggestions: suggestions
        });
      })
      .catch(console.error);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a book name, author...',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <form className="form-inline search" action={`/search/${this.state.value}`}>
        <Autosuggest className="form-control m-2"
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={{
            suggestionsContainerOpen:{
              position:'absolute',
              zIndex:3,
              opacity:0.95,
            },
            suggestionsList:{
              'paddingLeft':'0px',
            },
            suggestion:{
              'backgroundColor':'#1F538E',
              'listStyleType': 'none',
            },
          }}
        />
        <button className="btn searchbutton" type="submit">go</button>
      </form>
    );
  }
}

export default SearchBar;