import React from 'react';
import fuse from '../data/search';
import {Link} from 'react-router-dom';
export default function SearchResults({fuseSearchResults}) {
  return(
    <ul> {
      fuseSearchResults.map(result => {

        // Fuse gives big bunch of indices but it doesn't
        // give one with the best score so approximating here
        // https://github.com/krisk/Fuse/issues/409
        var matchedIndices = result.matches[0].indices.sort( (a, b) => b[1] - b[0] - (a[1] - a[0]))[0]
        var searchValue = result.matches[0].value;
        //debugger;
        return(
          <Link
            style={styles.searchResultLink}
            to= {`/item/${result.item.id}`}
          >
            <li style={styles.searchResult}> 
              <h3 style={styles.h3}> {result.item.label} </h3>
              <span style={styles.emphasis}>
                {searchValue.substr(matchedIndices[0], matchedIndices[1]+1)}
              </span>
              {searchValue.substr(matchedIndices[1]+1, searchValue.length)}
            </li>
          </Link>
        )

      })
    }</ul>    
  )
  
}

var styles = {
  searchResultLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  searchResult : {
    fontFamily: 'sans-serif',
    whiteSpace: 'nowrap',
    fontWeight: 400,
    fontSize: 13,
    margin: 5,
//    lineHeight: 14,
    height: 'auto',
    padding: 5,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block'
  },
  emphasis: {
    backgroundColor: 'yellow',
    color: 'red',

  }
}