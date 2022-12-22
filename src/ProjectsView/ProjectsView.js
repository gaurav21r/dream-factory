import "../styles.css";
import React from 'react';
import theme from '../ThemeContext'
import AppHeader from "../AppHeader";
import SearchBar from '../SearchBar';
import {Link} from 'react-router-dom';
import {addDoc, setDoc, deleteDoc, doc, getDoc, onSnapshot, query, collection} from 'firebase/firestore';


export default function ProjectsView({firestore}) {
  
  // Sate syncronised with the DB
  var [projects, setProjects] = React.useState([]);

  let [newProjectTextboxValue, setNewProjectTextboxValue] = React.useState('');

  React.useEffect(()=> {    
    onSnapshot(
      query(collection(firestore, 'projects')),
      (snapshot) => {
        setProjects(snapshot.docs.map(d=> {
          return {
            ...d.data(),
            id: d.id
          }
        }))
      }
    )
  }, [firestore]);
  function onNewProjectAddition (projectLabel){
    
    addDoc(collection(firestore, "projects"), {
      label: projectLabel
    })
    .then(c => console.log('success', c))
    .catch(c => console.log('error', c))
  }

  function onProjectDeletion (projectId) {
    deleteDoc(doc(firestore, "projects", projectId));
  }
  function onProjectRename (newLabel, projectId) {
    setDoc(doc(firestore, "projects", projectId), {
      label: newLabel,
    }, {
      merge: true
    });
  }
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <AppHeader label="Projects" firestore={firestore} />
      <section name="projectsListSection" style={theme.card} >
        <ul name = "projectsList" style={theme.ul}> {
          projects.map((project, i)=> {
            return(
              <li 
                key={project.id}
                style={{
                  ...theme.li,
                  backgroundColor: 'white'
                }}
              >
                <span style= {styles.serialNumberIcon}>
                  {i + 1}
                </span>
                <input 
                  name="projectLabelTextbox"
                  type="text"
                  onChange={evt => {
                    var renamedProjects = projects.slice();
                    renamedProjects[i].label = evt.target.value;
                    setProjects(renamedProjects);
                  }}
                  onKeyPress = {evt => {                     
                    if (evt.key == 'Enter'){
                      onProjectRename(evt.target.value, project.id)
                    }}
                  }
                  // Doesn't work as of now
                  onBlur = {evt => {
                    if (evt.target.value != project.label){
                      onProjectRename(evt.target.value, project.id)
                    }
                  }}
                  value={project.label}
                  style={styles.input} 
                />
                <span 
                  style= {styles.deleteIcon}
                  onClick={evt => onProjectDeletion(project.id)}
                >
                  -
                </span>
                <Link 
                  style= {styles.nextIcon}
                  to={`/project/${project.id}`}
                >
                  >
                </Link>
              </li>
            )
          })
        }
        </ul>
      </section>

      <section name="newProject" style= {theme.card}>  
        <input
          name="newProjectTextBox"
          type="text" 
          placeholder="Add a Project"
          autoFocus
          value={newProjectTextboxValue}
          onKeyPress={evt => {
            if (evt.key === 'Enter'){
              onNewProjectAddition(evt.target.value);
              setNewProjectTextboxValue('')
            }
          }}
          onChange= {evt => {
            setNewProjectTextboxValue(evt.target.value)
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
