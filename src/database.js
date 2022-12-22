import "./styles.css";

import Fuse from 'fuse.js'
import {firestore} from './firebase';
import traverse from './traverser'
import {onSnapshot, query, collection, addDoc, setDoc, doc} from 'firebase/firestore';
var traverser = traverse.traverse;


var items = [];

// Intialise Fuse on each load
const fuse = new Fuse(items, {
  // isCaseSensitive: false,
  includeScore: true,
  // shouldSort: true,
  includeMatches: true,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  ignoreLocation: true,
  ignoreFieldNorm: true,
  // fieldNormWeight: 1,
  keys: [
    "label",
    "content",
  ]
});

onSnapshot(
  query(collection(firestore, 'lists')),snapshot => {
    snapshot.docChanges().forEach((change) => {
      var docData = change.doc.data()
      var docID = change.doc.id
      
      // Strip just the text content from the Lexical Editor State
      if (docData.content){
        var content = '';
        for (const [key, value] of traverser(JSON.parse(docData.content))) {
          if (key == 'text')
            content = content + ' ' + value;
        }
      }

      // Initial load and new stuff added
      if (change.type === "added") {
        fuse.add({
          ...docData,
          content,
          id: docID
        })
      }

      // Remove old entry and re-add whole entry again
      else if (change.type === "modified") {
        fuse.remove(d=> d.id == docID)
        fuse.add({
          ...docData,
          content,
          id: docID
        })
        
      }
      else if (change.type === "removed") {
        fuse.remove(d=> d.id == docID)
      }
    })
  }
)

export default fuse;

