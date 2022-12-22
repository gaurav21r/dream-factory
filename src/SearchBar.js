import {Link} from 'react-router-dom';
import React from 'react';
export default function SearchBar({label, firestore}) {
  return (
    <div style={styles.container}>
      <Link to={`/projects`}>
        <div 
          style={{
            ...styles.button,
            ...styles.project
          }}>
          <img 
            style={{
              ...styles.image
            }}
            src="/images/project-icon.svg" 
          />
        </div>
      </Link>

      <div style={{
          ...styles.button,
          ...styles.add
      }}>
        <img 
          style={{
            ...styles.image
          }}
          src="/images/add-icon.svg"
        />
      </div>
      <Link to={`/search`}>
        <div style={{
            ...styles.button,
            ...styles.search
        }}>
          <img   style={{
              ...styles.image
            }}
            src="/images/search-icon.svg"
          />
        </div>
      </Link>

    </div>
  );
}

var styles =  {
  container : {
    width: '100%',
    backgroundColor: '#fff',
    minHeight: '53px',
    display: 'flex',
    backgroundColor: '#D9D9D9',
    marginTop: 'auto'
  },
  button: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    marginRight: '10px',
    display: 'flex',
    backgroundColor: 'white',
    marginTop: '8px',
    marginBottom: '8px'
  },
  project: {
    marginLeft: '10px'
  },
  add: {
    marginLeft: 'auto'

  },
  search: {
  },
  image: {
    width: '26px',
    margin: 'auto'
  }
}