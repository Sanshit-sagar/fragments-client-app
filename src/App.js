import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar"; 
import Nav from "react-bootstrap/Nav"; 

import "./App.css";
import config from "./config"; 
import Routes from "./Routes"; 

import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
import { Button } from "react-bootstrap"; 

import ErrorBoundary from "./components/ErrorBoundary"; 
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline"; 

// import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
// import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
// import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
// import FiberNewIcon from '@material-ui/icons/FiberNew';
import { makeStyles } from '@material-ui/core/styles';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  root: {

  },
  speedDial: {

  },
});


export default function App() { 
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  async function handleLogout() {
    await Auth.signOut();
  
    userHasAuthenticated(false);
  }

  useEffect(() => { 
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true); }
    catch(e) {
      if (e !== 'No current user') {
        onError(e); 
      }
    }
    setIsAuthenticating(false); 
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
    const [direction, setDirection] = React.useState('left');
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);

    // const handleDirectionChange = (event) => {
    //   setDirection(event.target.value);
    // };

    // const handleHiddenChange = (event) => {
    //   setHidden(event.target.checked);
    // };

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
           / >
             
          ))}
        </SpeedDial>
      </div>
    );
  }

  return (
    !isAuthenticating && (
      <ScopedCssBaseline> 
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" variant="light" expand="md" className="mb-3">
          <LinkContainer to="/dashboard">
            <Navbar.Brand>
              <div className="Logo"> 
                / frag / ments / 
              </div>
            </Navbar.Brand>
          </LinkContainer>
          {/* <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/notes/new">
                    <Nav.Link> 
                      <Button size="small" variant="outline-dark" > 
                        <FiberNewIcon style={{ color: "#4b00b6" }} />    
                      </Button>
                    </Nav.Link>
                  </LinkContainer>

                   <LinkContainer to="/">
                    <Nav.Link>
                      <Button variant="outline-dark"> 
                        <ListAltRoundedIcon size="48px" /> 
                      </Button> 
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/settings">
                    <Nav.Link> 
                      <Button variant="outline-dark"> 
                          <SettingsRoundedIcon />    
                      </Button>
                    </Nav.Link>
                  </LinkContainer>

                  <div className="Logout"> 
                    <Nav.Link onClick={handleLogout}>
                      <Button variant="outline-danger"> 
                        <PowerSettingsNewRoundedIcon />
                      </Button> 
                    </Nav.Link>
                  </div>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link>
                      <Button variant="light"> 
                        SignUp
                      </Button> 
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <Button variant="light"> 
                        Login
                      </Button> 
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse> */}
          <OpenIconSpeedDial /> 
        </Navbar>
        <ErrorBoundary>
          <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
            <Routes />
          </AppContext.Provider>
        </ErrorBoundary>
      </div>
      </ScopedCssBaseline> 
    )
  );
}
