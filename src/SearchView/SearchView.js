import "../styles.css";
import React from 'react';
import theme from '../ThemeContext'
import AppHeader from "../AppHeader";
import {TextField, Button} from "@mui/material";
import SearchBar from '../SearchBar';
import NotifySection from './NotifySection';
import SearchResults from './SearchResults';
import CreatableSelect from 'react-select/creatable';

import { v4 as uuidv4 } from 'uuid';

import {onSnapshot, query, collection, addDoc, setDoc, doc} from 'firebase/firestore';


export default function SearchView({firestore, fuseInstance}) {
  var [projects, setProjects] = React.useState([]);
  var [searchTextboxIntermediateValue, setSearchTextboxIntermediateValue] = React.useState('');
  var [projectsAutocompleteIntermediaryValue, setProjectsAutocompleteIntermediaryValue] = React.useState('');
  var [viewButtonLinkIntermediaryValue, setViewButtonLinkIntermediaryValue] = React.useState('');
  var [notifySectionMessageValue, setNotifySectionMessageValue] = React.useState(
    'ADDED AS ITEM TO'
  );
  var [isNotifySectionVisibleValue, setIsNotifySectionVisibleValue] = React.useState(false);
  var [searchResults, setSearchResults] = React.useState([]);
  var  searchTextboxRef = React.useRef(null);
  React.useEffect(()=> {
    console.log('In Use useEffect')    
    onSnapshot(
      query(collection(firestore, 'projects')),(snapshot) => {
        setProjects(snapshot.docs.map(d=> {
          if (d.data().isInbox){
            setProjectsAutocompleteIntermediaryValue({
              ...d.data(),
              id: d.id
            })
            console.log('I value', projectsAutocompleteIntermediaryValue);
          }
          return {
            ...d.data(),
            id: d.id
          }
        }))
        
      }
    )
  }, []);

  function onSearchTextBoxChange(evt){
    setSearchTextboxIntermediateValue(evt.target.value)
    setSearchResults(fuseInstance.search(evt.target.value))
  }

  return (
    <div style={styles.container}>
      <AppHeader label="Search / Add" firestore={firestore} />
      <section name="SearchResultsSection" style={styles.SearchResultsSection}>
        <SearchResults fuseSearchResults={searchResults} />
      </section>
      <section name="SearchBoxSection"
        style={{
          ...theme.card
        }}
      >
        <section name="SearchTextboxSection" style={styles.SearchTextboxSection}>
          <TextField name="SearchTextbox"
            placeholder="Search or Add Item"
            autoFocus
            style={styles.searchTextbox}
            multiline={true}
            type="text"
            value={searchTextboxIntermediateValue}
            onChange={onSearchTextBoxChange}
            ref={searchTextboxRef}            
          />
          <Button name="clearButton"
            variant="contained"
            style={styles.clearButton}
            onClick= {evt =>{
              setSearchTextboxIntermediateValue('')
              searchTextboxRef.current.focus();
            }} > 
            CLEAR 
          </Button>
        </section>
        
        <section name="AutocompletesSection" style={styles.AutocompletesSection}>
          <Button name="addButton"
            variant="contained"
            style={styles.addButoon}
            onClick={evt=> {
              evt.preventDefault();
              console.log('projectsAutocompleteIntermediaryValue', projectsAutocompleteIntermediaryValue)
              var newID = uuidv4()
              setDoc(doc(firestore, "lists", newID), {
                label: searchTextboxIntermediateValue,
                projectId: projectsAutocompleteIntermediaryValue['id']
              })
              .catch(c => console.log('error', c))
              setViewButtonLinkIntermediaryValue(`/item/${newID}`)
              setIsNotifySectionVisibleValue(true);
              setNotifySectionMessageValue(`ADDED AS ITEM TO ${projectsAutocompleteIntermediaryValue.label}`);
              setSearchTextboxIntermediateValue('')
              searchTextboxRef.current.focus();  
            }}
          > 
            ADD TO
          </Button>
          
          /* <CreatableSelect
            options={projects} 
            blurInputOnSelect
            openMenuOnFocus
            onChange = {(newOption) => setProjectsAutocompleteIntermediaryValue(newOption)}
            value={projectsAutocompleteIntermediaryValue}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                width: '200px',

              }),
            }}
          />
          
        </section>
      </section>
      <NotifySection 
        isNotifySectionVisibleValue={isNotifySectionVisibleValue}
        notifySectionMessageValue={notifySectionMessageValue}
        viewButtonLinkIntermediaryValue={viewButtonLinkIntermediaryValue}
      />
      <SearchBar />
    </div>
  )
  
}
var styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  SearchResultsSection : {
    ...theme.card,
    flex: 3
  },

  AutocompletesSection: {
    display: 'flex',
    padding: 8,

  },
  ProjectAutocomplete: {
    flex: 1,
    backgroundColor: 'white',
    marginRight: 1
  },
  ItemAutocomplete: {
    flex: 2,
  },
  SearchTextboxSection: {
    display: 'flex',
    flexDirection: 'row',
    margin: 4,
    padding: 4,
    flexWrap: 'wrap',
    width: '100%',
    flex: 1
  },
  searchTextbox: {
    flex: 1,
    marginRight: 8
  },
  clearButton: {
    height: 40,
    width: 64,
    margin: 4
  },
  addButoon: {
    fontWeight: 900,
    height: 40,
    width: 80,
    marginRight: 4
  },
  ViewButton: {
    height: '100%',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    fontWeight: 900,
    width: 64,
    lineHeight: '14px'
  },
  ViewButtonLink: {
    textDecoration: 'none',
    marginLeft: 'auto',
    marginRight: '8px',
  }

}