import "../styles.css";
import React from 'react';
import theme from '../ThemeContext'
import AppHeader from "../AppHeader";
import SearchBar from '../SearchBar';
import {useParams, Link} from 'react-router-dom';
import Modal from '@mui/material/Modal';
import CreatableSelect from 'react-select/creatable';

import {addDoc, setDoc, deleteDoc, doc, getDoc, onSnapshot, query, collection, where} from 'firebase/firestore';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

export default function ProjectView({firestore}) {
  const {projectId} = useParams();
  var [project, setProject] = React.useState({
    label:''
  })
  // Sate syncronised with the DB
  var [items, setItems] = React.useState([]);
  var [projects, setProjects] = React.useState([]);
  var [moveProjectToSelectValue, setMoveProjectToSelectValue] = React.useState([]);

  let [newListItemTextboxValue, setNewListItemTextboxValue] = React.useState('');
  let [isItemRenameModalOpen, setIsItemRenameModalOpen] = React.useState(false);
  let [swipedItemID, setSwipedItemID] = React.useState();
  React.useEffect(()=> {
    onSnapshot(
      query(collection(firestore, 'projects')), snapshot =>{
        setProjects(snapshot.docs.map (d => {
          return {
            ...d.data(),
            id: d.id
          }
        }))
      }
    )
      
    getDoc(doc(firestore, "projects", projectId))
    .then(docSnap =>{
      if (docSnap.exists()) {
        setProject({
          ...docSnap.data(),
          id: projectId
        })
      } else {
        // doc.data() will be undefined in this case
      }
    })
    .catch(e=> console.log('error', e))
    
    onSnapshot(
      query(collection(firestore, 'lists'), where('projectId', '==', projectId)),
      (snapshot) => {
        setItems(snapshot.docs.map(d=> {
          return {
            ...d.data(),
            id: d.id
          }
        }))
      }
    )
  }, [firestore]);
  function onNewItemAddition (item){
    
    addDoc(collection(firestore, "lists"), {
      ...item,
      projectId: project.id
    })
    .then(c => console.log('success', c))
    .catch(c => console.log('error', c))
  }

  function onItemDeletion (evt, item) {
    deleteDoc(doc(firestore, "lists", item.id));
  }
  function onItemRename (newLabel, item) {
    setDoc(doc(firestore, "lists", item.id), {
      label: newLabel,
    }, {
      merge: true
    });
  }
  function onItemMoveModalButtonClick () {
    setDoc(doc(firestore, "lists", swipedItemID), {
      projectId: moveProjectToSelectValue.id,
    }, {
      merge: true
    });
    setIsItemRenameModalOpen(false)
    //setItems(items.filter(i => i.id != swipedItemID))
  }
  const leadingActions = ({id}) => {
    return (
      <LeadingActions>
        <SwipeAction 
          onClick={() => {
            setIsItemRenameModalOpen(true);
            setSwipedItemID(id)
          }}
          style={{
            width: '130px'
          }}
        >
          <button style={{
            width: '100%'
          }}> MOVE </button>
        </SwipeAction>
      </LeadingActions>
    )
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <AppHeader label={project.label} firestore={firestore} />
      <section name="itemsListSection" style={{
        ...theme.card,
        width: '100%'
      }}>
        <SwipeableList
          style={{
            backgroundColor: 'orange',
            ...theme.ul,
            width: '100%'
          }}
          Tag="ul"
          name="itemsList"
          fullSwipe={true}
          type={ListType.IOS}
        >
            {items.map((item, i)=> {
              return(
                <SwipeableListItem 
                  key={item.id} 
                  leadingActions={leadingActions({id: item.id})}
                >
                  <li 
                    style={{
                      ...theme.li,
                      backgroundColor: 'white'
                    }}
                  >
                    <span style= {styles.serialNumberIcon}>
                      {i + 1}
                    </span>
                    <input 
                      name="itemLabelTextbox"
                      type="text"
                      onChange={evt => {
                        var renamedItems = items.slice();
                        renamedItems[i].label = evt.target.value;
                        setItems(renamedItems);
                      }}
                      onKeyPress = {evt => {                     
                        if (evt.key == 'Enter'){
                          onItemRename(evt.target.value, item)
                        }}
                      }
                      // Doesn't work as of now
                      onBlur = {evt => {
                        if (evt.target.value != item.label){
                          onItemRename(evt.target.value, item)
                        }
                      }}
                      value={item.label}
                      style={styles.input} 
                    />
                    <span 
                      style= {styles.deleteIcon}
                      onClick={evt => onItemDeletion(evt, item)}
                    >
                      -
                    </span>
                    <Link 
                      style= {styles.nextIcon}
                      to={`/item/${item.id}`}
                    >
                      >
                    </Link>
                  </li>
                </SwipeableListItem>
              )
            })
          }
        </SwipeableList>
      </section>
      <section style={{
        height: 200,
        width: '50%'
      }}>
      </section>
      <Modal
        name="itemRenameModal"
        open={isItemRenameModalOpen}
        onClose={() => setIsItemRenameModalOpen(false)}
      >
        <section
          style={{
              position: 'absolute',
              top: '35%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '60%',
              backgroundColor: 'white',
              boxShadow: 24,
              padding: 24,
              
          }}
        >
          <p> Move from <em>{project.label}</em> to </p>
          <CreatableSelect
            name="moveProjectToSelect"
            autoFocus={true}
            options={projects} 
            blurInputOnSelect
            openMenuOnFocus
            onChange = {(newOption) => setMoveProjectToSelectValue(newOption)}
            value={moveProjectToSelectValue}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                width: '200px',
                height: '40px',
              }),
            }}
          />
          <button 
            onClick={onItemMoveModalButtonClick}
            style={{
              padding: 10,
              marginTop: 20,
              width: '50%',
              marginLeft: 'auto',
//              marginRight: 'auto',
              display: 'block'
            }}
          > 
            Move 
          </button>
        </section>
      </Modal>
      <section name="newItem" style= {theme.card}>  
        <input
          name="newListItemTextBox"
          type="text" 
          placeholder="Add an Item"
          autoFocus
          value={newListItemTextboxValue}
          onKeyPress={evt => {
            if (evt.key === 'Enter'){
              onNewItemAddition({
                label: evt.target.value
              });
              setNewListItemTextboxValue('')
            }
          }}
          onChange= {evt => {
            setNewListItemTextboxValue(evt.target.value)
          }}
          style={styles.input} />
      </section>
      
      <SearchBar />
    </div>
  );
}

var styles = {
  input: {
    border: 'none',
    marginLeft: '5px',
    outline: 'none',
    fontSize: '16pt'
  },
  deleteIcon: {
    marginLeft: 'auto',
    marginRight:'20px',
    textAlign: 'centre',
    fontWeight: 900,
    fontSize: '16pt',
    backgroundColor: '#ee4422',
    width: '20px',
    textAlign: 'center'
  },
  nextIcon: {
    marginLeft: 'auto',
    marginRight:'20px',
    textAlign: 'centre',
    fontWeight: 900,
    fontSize: '16pt',
    backgroundColor: 'lightblue',
    width: '20px',
    textAlign: 'center'
  },
  serialNumberIcon: {
    width: '20px',
    height: '20px',
    alignSelf: 'center'
  }
}
