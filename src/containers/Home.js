import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify"; 
import "./Home.css";
// import { BsPencilSquare } from "react-icons/bs"; 
import { LinkContainer } from "react-router-bootstrap"; 
import { Link } from "react-router-dom"; 
import { Chip } from "@material-ui/core"; 
import AddBoxIcon from '@material-ui/icons/AddBox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// import {
//   ReactiveBase,
//   CategorySearch,
//   SingleRange,
//   ResultCard,
//   ReactiveList,
// } from '@appbaseio/reactivesearch';


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

  // const filterOptions = createFilterOptions({
  //   matchFrom: 'start',
  //   stringify: option => option.title + "--" + option.primaryTags
  // });

  function renderNotesList() {
    return (
      <div className="HomePage" style={{ height: "100vh" }}>
      
      
        {/* <LinkContainer to="/notes/new">
          <ListGroup.Item action>
            <div style={{ display:'flex', flexDirection:'row', justifyContent: 'center'}}>
                <AddBoxIcon style={{height: "35px", width: "45px", color: '#4b00b6' }} /> 
                <h5 style={{ marginLeft: "20px", marginTop: "5px"}} > Create New Snippet </h5>
            </div> 
          </ListGroup.Item>
        </LinkContainer> */}

        <br /> 

        <div style = {{ width: "100%" }}>
          
          <Autocomplete
            id="combo-box-demo"
            options={notes}
            groupBy={(option) => (option.primaryTags)}
            getOptionLabel={(option) => option.moniker}
            style={{ width: '100%', marginBottom: '15px'}}
            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" size="large" />}
          />

          <OpenIconSpeedDial /> 
        
        </div> 


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

  const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
    { icon: <FavoriteIcon />, name: 'Like' },
  ];
  
  function OpenIconSpeedDial() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);
  
    const handleVisibility = () => {
      setHidden((prevHidden) => !prevHidden);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div className={classes.root}>
        <Button onClick={handleVisibility}>Toggle Speed Dial</Button>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleClose}
            />
          ))}
        </SpeedDial>
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