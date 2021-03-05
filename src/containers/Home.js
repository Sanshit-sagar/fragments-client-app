import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify"; 
import "./Home.css";
import { BsPencilSquare } from "react-icons/bs"; 
import { LinkContainer } from "react-router-bootstrap"; 
import { Link } from "react-router-dom"; 
import { Chip } from "@material-ui/core"; 
import AddBoxIcon from '@material-ui/icons/AddBox';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const notesLoaded = await loadNotes();
        setNotes(notesLoaded);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);
  
  function loadNotes() {
    return API.get("notes", "/notes");
  }

  function renderNotesList() {
    return (
      <div className="HomePage" style={{ height: "100vh" }}>
      
      
        <LinkContainer to="/notes/new">
          <ListGroup.Item action variant="info" className="py-3 text-truncate">
            <div style={{ display:'flex', flexDirection:'row', justifyContent: 'center'}}>
                <AddBoxIcon style={{height: "35px", width: "45px" }} /> 
                <h5 style={{ marginLeft: "20px", marginTop: "5px"}} > Create New Snippet </h5>
            </div> 
          </ListGroup.Item>
        </LinkContainer>

        <br /> 

      
        {notes.map(({ noteId, content, moniker, primaryTags, secondaryTags, createdAt }) => (
          <LinkContainer key={noteId} to={`/notes/${noteId}`} >
            
            <ListGroup.Item action variant="outline-info" horizontal>
             
                  
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span className="font-weight-bold" style = {{ marginRight: "45px" }}>
                  {moniker.substring(1)} 
                </span>
                
                <a> {content.trim().split("\n")[0].substring(0,21) + "..."} </a>

                <br />

              <div className="tagsAndTimestamp" style={{ display: "flex", marginLeft:"auto" }}> 
               
                <Chip label = {primaryTags} style = {{ marginRight: "10px" }} /> 
                <br />
                <Chip label = {secondaryTags} style = {{ marginRight: "10px" }} /> 
                <br />
                <span className="text-muted">
                  {new Date(createdAt).toLocaleString()} 
                </span>
              </div>

              <br /> 
            </div> 

            </ListGroup.Item>
            
          </LinkContainer>
        ))}
      </div>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>/ frag / ments / </h1>
        <p className="text-muted">Bring Your Code Snippets To Life</p>
      
        <div className="pt-3"> 
          <Link to="/login" className="btn btn-light btn-lg mr-3"> 
            Login 
          </Link>
          <Link to="/signup" className="btn btn-dark btn-lg"> 
            Signup
          </Link>
        </div>      
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <ListGroup>{!isLoading && renderNotesList()}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}