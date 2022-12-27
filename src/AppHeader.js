//import {enableNetwork, disableNetwork, collection, onSnapshot, getDocsFromServer} from 'firebase/firestore';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import syncIcon from './images/sync-icon.svg';

export default function AppHeader({label, firestore, isSyncing, onSyncButtonClick}) {
  let navigate = useNavigate();
  //var [isSyncing, setIsSyncing] = React.useState(false)
  
  return (
    <div style={styles.container}>
      <div
        style={styles.header}
      >
        <span
          style={{
            marginRight: '20px'
          }}
          onClick={evt=> navigate(-1)}>
          {"<"}
        </span>
        <span>
          {label}
        </span>
      </div>
      <img src={syncIcon} alt="Sync Icon"
        style={{
            animation: isSyncing ? 'animName 1.75s ease infinite' : '', 
            ...styles.syncButton
        }}
        onClick={onSyncButtonClick}
      />
      
      {/* <img alt="Loading" src={loaderImage} /> */}
    </div>
  );
}

var styles = {
  container: {
    width: '100%',
    backgroundColor: '#fff',
    minHeight: '53px',
    display: 'flex',
    borderBottom: '1px solid #eee'
  },
  header: {
    color: '#000',
    paddingLeft: '30px',
    fontSize: '24px',
    fontWeight: 900,
    alignSelf: 'center',
  },
  syncButton: {
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: '20px',
    cursor: 'pointer',
    width: 40
  }
}