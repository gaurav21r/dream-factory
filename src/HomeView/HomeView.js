import "../styles.css";
import theme from '../ThemeContext';
import AppHeader from "../AppHeader";
import {query, collection, onSnapshot} from 'firebase/firestore';
import SearchBar from '../SearchBar';
import { Link } from "react-router-dom";
import React from "react";


export default function HomeView({firestore}) {
  var [projects, setProjects] = React.useState([]);
  var [items, setItems] = React.useState([]);
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
    onSnapshot(
      query(collection(firestore, 'lists')),
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
  
  return (
    <div style={styles.container}>
      <AppHeader label="Super Notes" firestore={firestore} />

      <section style={theme.card}> 
        <h2 style={styles.h2}> 
          Recent Projects 
        </h2>
        <ul>
          {
            projects.map(project => {
              return(
              <li style={theme.li} key={project.id}>
                <span> {project.label} </span>
                <Link style={styles.arrow} to={`/project/${project.id}`}> {">"} </Link>
              </li>)
            })
          }
        </ul>
      </section>
      
      <section style={theme.card}> 
        <h2 style={theme.h2}> 
          Recent Items 
        </h2>
        <ul>
          {
            items.map(item => {
              return(
              <li style={theme.li} key={item.id}>
                <span> {item.label} </span>
                <Link style={styles.arrow} to={`/item/${item.id}`}> {">"} </Link>
              </li>)
            })
          }
        </ul>
      </section>
      
      <SearchBar />
    </div>
  );
}

var styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'stretch'
  },
  arrow: {
    marginLeft: 'auto',
    fontSize: '18px',
    fontWeight: 900,
    textDecoration: 'none',
    color: 'black'
  }
}

