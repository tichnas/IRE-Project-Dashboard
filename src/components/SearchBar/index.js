import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import Html from "../Html";
import stripHtml from "../../utils/stripHtml";

import data from "../../data.json";
import getName from "../../utils/getName";

const getResults = (text) => {
  if (text.length < 2) return [];
  console.log("text", text);

  const results = [];

  // console.log(data.length);
  for (let i = 0; i < Object.keys(data).length; i++) {
    for (let name of data[i].person_name.data) {
      const formattedName = getName(name);

      if (formattedName.toLowerCase().includes(text.toLowerCase()))
        results.push({ name: formattedName, id: i });
    }
  }
  console.log(results.length);

  return results;
};

const SearchBar = ({ initial, small, onSubmit }) => {
  const [text, setText] = useState(initial || "");
  const [results, setResults] = useState([]);
  const selected = useRef(-1);

  const regex = new RegExp(
    text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
    "gi"
  );

  // const results = text
  //   ? Object.keys(data).filter((k) =>
  //       k.toLowerCase().includes(text.toLowerCase())
  //     )
  //   : [];

  const submit = (e, search) => {
    if (search) setText(search.name);

    e.preventDefault();
    e.target.closest(".search-bar").firstChild.blur();

    console.log("submit", search.id);
    onSubmit(search.id);
  };

  const handleOnChange = (e) => {
    const input = e.target.value;
    setText(input);
    setResults(getResults(input));
  };

  const enhance = (str) => (
    <Html>
      {str.replace(regex, '<span class="search-bar__found">$&</span>')}
    </Html>
  );

  return (
    <form
      onKeyDown={(e) => {
        const suggestionList = e.target.closest(".search-bar").childNodes[2];
        const noOfSuggestions = suggestionList.childNodes.length;

        if (e.keyCode === 38) {
          if (selected.current === -1) {
            suggestionList.childNodes[noOfSuggestions - 1].classList.add(
              "selected"
            );
            selected.current = noOfSuggestions - 1;
          } else {
            if (selected.current < noOfSuggestions)
              suggestionList.childNodes[selected.current].classList.remove(
                "selected"
              );
            if (selected.current >= 0) {
              selected.current -= 1;
              if (selected.current >= 0)
                suggestionList.childNodes[selected.current].classList.add(
                  "selected"
                );
            }
          }
        } else if (e.keyCode === 40) {
          if (selected.current >= 0 && selected.current < noOfSuggestions)
            suggestionList.childNodes[selected.current].classList.remove(
              "selected"
            );
          if (selected.current < noOfSuggestions) {
            selected.current += 1;
            if (selected.current < noOfSuggestions) {
              suggestionList.childNodes[selected.current].classList.add(
                "selected"
              );
            } else {
              selected.current = -1;
            }
          }
        } else if (e.keyCode === 13 && selected.current !== -1) {
          const search = stripHtml(
            suggestionList.childNodes[selected.current].innerHTML
          );
          submit(e, search);
        }
      }}
      className={"search-bar" + (!text && small ? " search-bar--small" : "")}
      onSubmit={submit}>
      <input
        type="text"
        className="input search-bar__input"
        placeholder="Search"
        value={text}
        onChange={handleOnChange}
      />
      <i className="fas fa-search search-bar__icon" onClick={submit}></i>
      <ul className="search-bar__suggestions">
        {results.map((result, i) => (
          <li
            key={i}
            onClick={(e) => {
              submit(e, result);
            }}>
            {enhance(result.name)}
          </li>
        ))}
      </ul>
    </form>
  );
};

SearchBar.propTypes = {
  initial: PropTypes.string,
  small: PropTypes.bool,
};

export default SearchBar;
