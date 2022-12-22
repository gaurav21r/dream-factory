import "../styles.css";
import AppHeader from "../AppHeader";
import data from '../data/data';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

export default function SearchView() {
  let [searchState, setSearchState] = useState({
    projectID: '',
    projectValue: '',
    itemID: '',
    itemValue: '',
    searchText : '',
    searchValue : '',
    isProjectAutoCompleteOpen: false
  })

  return (
    <div 
      style= {{
        display: "flex",
        flexDirection: "column",
        height: "100%"
        
      }}
    >
      <section
        style={{
          display: "flex",
          width: "100%",
          marginTop: "auto"
        }}
      >
        <Autocomplete
          label="Project"
          disablePortal
          id="combo-box-demo"
          freeSolo
          options={data.lists}
          open={searchState.isProjectAutoCompleteOpen}
          //autoComplete={true}
          sx={{ 
            flex: 1,
            margin: '10px',
            backgroundColor: 'white',
            borderRadius: '12px'
          }}
          onChange= {(evt, value) => {
            console.log('Selected', evt.target.value, value)
            setSearchState({
              ...searchState,
              isProjectAutoCompleteOpen: false,
              projectID: evt.target.value
            })
          }}
          inputValue= {searchState.projectValue + ''}
          onInputChange = {evt => {
            if (evt && evt.target && evt.target.value){
              console.log('onInputChange', evt.target.value);
              setSearchState({
                ...searchState,
                
                projectValue: evt.target.value,
              })  
            }
          }}
          renderInput={(params) => 
            <TextField {...params} label="Project" />
          }
        />
        <Autocomplete
          label="Item"
          disablePortal
          id="combo-box-demo"
          options={data.listItems}
          //open = {true}
          autoComplete={true}
          freeSolo
          sx={{ 
            flex: 1,
            margin: '10px',
            backgroundColor: 'white',
            borderRadius: '12px' 
          }}
          renderInput={(params) => <TextField {...params} label="Item" />}
        />
      </section>

      <section>
        <textarea 
          style={{
            margin: '10px',
            width: 'calc(100% - 20px)',
            height: 'auto',
            minHeight: '60px',
            padding: '20px',
            fontSize: '12pt'
          }}
          value = {searchState.searchValue}
          onChange = {evt => {
            

            if (evt.target.value.split('#').length > 1){
              var searchText = evt.target.value.split('#')[0];
              var projectValue = evt.target.value.split('#')[1];
              setSearchState({
                ...searchState,
                searchText: searchText,
                projectValue: projectValue,
                searchValue: evt.target.value,
                isProjectAutoCompleteOpen: true
              })
              console.log('searchState', searchState)
            }
            else {

              setSearchState({
                ...searchState,
                searchValue: evt.target.value,
                isProjectAutoCompleteOpen: false
              })
            }
          }}
        />
        <div>
          {JSON.stringify(searchState)}
        </div>
      </section>
    </div>
  )
}
