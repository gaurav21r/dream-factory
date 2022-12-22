import "../styles.css";
import React from 'react';
import theme from '../ThemeContext'
import AppHeader from "../AppHeader";
import SearchBar from '../SearchBar';
import Editor from './Editor';
import {useParams} from 'react-router-dom';
import _debounce from 'lodash/debounce';

import {setDoc, doc, getDoc} from 'firebase/firestore';

export default function ItemView({firestore}) {
  const {itemId} = useParams();
  var [item, setItem] = React.useState({})
  //Controls the input to Lexical
  var emptyEditorState = `{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`
  //var headingAndNumbersState = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is React vs View","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"React is more popular.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"React is based on better programming principles!","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":2}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`
  var [customEditorState, setCustomEditorState] = React.useState(
    emptyEditorState
  );
  
  // Debounce changes from editor to save to Firestore
  var saveEditorStateDebounced = React.useCallback(_debounce( (content, item) => {
    console.log('Save Called!')
    setDoc(doc(firestore, "lists", item.id), {
      content: content
    }, {
      merge: true
    });
  }, 2000), [])
  //TODO React is calling this function many times and hence
  // checking, if item.id is already there then there 
  // then ItemState is already populated from DB.
  React.useEffect(() => {
    
    // Load content from firebase and set it as editor state
    if (!item.id){
      getDoc(doc(firestore, "lists", itemId))
      .then(docSnap =>{
        if (docSnap.exists()) {
          setItem({
            ...docSnap.data(),
            id: itemId
          });
          if (docSnap.data().content){
            setCustomEditorState(docSnap.data().content)
          }
        } else {
          // doc.data() will be undefined in this case
        }
      })
      .catch(e=> console.log('error', e))
    }
    
  }, [])

  return(

    <div style={styles.container}>
      <AppHeader label={item.label} firestore={firestore} />
      <Editor
        initialEditorState ={
          customEditorState
        }
        cutomEditorState = {
          customEditorState
        }
        onEditorStateChange = {
          editorState => {
            setItem({
              ...item,
              content: JSON.stringify(editorState)
            })
            saveEditorStateDebounced(JSON.stringify(editorState), item);
          }
        }
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
  }

}