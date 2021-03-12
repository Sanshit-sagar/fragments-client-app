import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify"; 
import "./Home.css";

import { LinkContainer } from "react-router-bootstrap"; 
import { Link } from "react-router-dom"; 
import TextField from '@material-ui/core/TextField';

import Autocomplete from '@material-ui/lab/Autocomplete';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'; 

const useStyles = makeStyles((theme) => ({
  root: {

  },
}));

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <FavoriteIcon />, name: 'Like' },
];


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
      <div className="HomePage" style={{ height: "90vh" }}>
        {/* <LinkContainer to="/notes/new"> */}

        <div style = {{ width: "100%", 
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent: 'space-between' 
                      }}>
          <Autocomplete
            id="combo-box-demo"
            options={notes}
            groupBy={(option) => (option.primaryTags)}
            getOptionLabel={(option) => option.moniker}
            style={{ width: '100%', marginBottom: '15px'}}
            renderInput={
              (params) => 
                <TextField {...params} 
                  label="Search your cache" 
                  variant="outlined" 
                  size="medium" 
                />
              }
          />   
          <div>  
            <OpenIconSpeedDial/> 
          </div>   
        </div> 

        <div style={{ display:'flex', height: '60vh', flexDirection: 'column', flexWrap: 'wrap', marginTop: '10px'}}> 
          {notes.map(({ noteId, content, moniker, primaryTags, secondaryTags, createdAt }) => (
               
               <LinkContainer key={noteId} to={`/notes/${noteId}`}>
                  <div class="box" style={{ backgroundColor: 'black' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span className="font-weight-bold" style = {{ marginRight: "45px", marginTop: '10px', marginBottom: '15px' }}>
                        {moniker.substring(1)} 
                      </span>
                      <span> 
                        {content.trim().split("\n")[0].substring(0,40) + "..."}
                      </span>
                    </div> 
                  <div class="level-left"> 
                    <div className="tagsAndTimestamp" style={{ display: "flex", marginLeft:"auto", flexDirection: 'column'}}> 
                      <div class="tags has-addons" style={{ margin: '10px' }}>
                        <span class="tag is-link is-light"> { primaryTags } </span>
                        <span class="tag is-primary is-light"> { secondaryTags } </span> 
                      </div> 
                      <span className="text-muted">
                        {new Date(createdAt).toLocaleString()} 
                      </span>
                    </div>
                  </div> 
                </div>
              </LinkContainer>
          ))}
          </div>
      </div>
    );
  }

  const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <ShareIcon />, name: 'Share' },
    { icon: <FavoriteIcon />, name: 'Like' },
  ];
  
  function OpenIconSpeedDial() {
    const classes = useStyles();
    const [direction, setDirection] = React.useState('left');
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);

    const handleDirectionChange = (event) => {
      setDirection(event.target.value);
    };

    const handleHiddenChange = (event) => {
      setHidden(event.target.checked);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleOpen = () => {
      setOpen(true);
    };


    return (
      <div className="bob"> 
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={direction}
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
         
        <ListGroup>
          {
          !isLoading && 
            <Box> 
              {renderNotesList()}
            </Box>
           
        }</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}