import React, { useRef, useState } from "react"; 
import { render } from 'react-dom'; 
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import config from "../config"; import "./NewNote.css";

import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { useHistory } from "react-router-dom"; 

import { s3Upload } from "../libs/awsLib"; 
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField'; 

import { Button } from "react-bootstrap"; 

import { 
    FormControl,
    Paper,
    Box,
    MenuItem,
    InputLabel, 
    Select
} from "@material-ui/core"; 

import SyntaxHighlighter from 'react-syntax-highlighter';
import {  
    dark, ocean, atelierCaveLight, atelierCaveDark, stackoverflowDark,
    atomOneLight,brownPaper,github,shadesOfPurple,rainbow, googlecode,
    monoBlue, nightOwl, grayscale,purebasic, monokaiSublime, 
    tomorrowNightBlue, tomorrowNightBright, tomorrowNightEighties,
} from "react-syntax-highlighter/dist/esm/styles/hljs";


import LoyaltyOutlinedIcon from '@material-ui/icons/LoyaltyOutlined';
import LoyaltyRoundedIcon from '@material-ui/icons/LoyaltyRounded'; 
import AttachFileIcon from '@material-ui/icons/AttachFile';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
  
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import LoyaltyTwoToneIcon from '@material-ui/icons/LoyaltyTwoTone';
import WrapTextOutlinedIcon from '@material-ui/icons/WrapTextOutlined';
import CodeIcon from '@material-ui/icons/Code';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: "#f8f9fa",
  },
}));

function NewNote() {

    const history = useHistory();

    const file = useRef(null);
    const [attachmentName, setAttachmentName] = useState(""); 

    const [moniker, setMoniker] = useState(""); 
    const [primaryTags, setPrimaryTags] = useState("");
    const [secondaryTags, setSecondaryTags] = useState("");

    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // starts off in edit mode, Notes.js starts off in view mode
    const [viewMode, setViewMode] = useState(false); 
    const [lineNumbers, setLineNumbers] = useState(true); 
    const [wrapLines, setWrapLines] = useState(true); 

    const [language, setLanguage] = useState("javascript")
    const [highlighterTheme, setHighlighterTheme] = useState(dark);
    const [editorTheme, setEditorTheme] = useState("terminal"); 
    
    const classes = useStyles();
    
    function validateForm() { 
        return content.length > 0;
    } 

    function attachmentExists() {
        return attachmentName.length > 0; 
    }
    
    function handleFileChange(event) { 
        file.current = event.target.files[0];
        setAttachmentName(file.current.name); 
    }

    function formatFilename(str) {
        return str.replace(/^\w+-/, "");
    }

    function handleMonikerChange(updatedMoniker) {
        if(updatedMoniker.substring(0,1) != "@") {
            updatedMoniker = "@" + updatedMoniker; 
        }
        setMoniker(updatedMoniker); 
    }

    function handlePrimaryTagsUpdate(updatedPrimaryTags) {
            if(updatedPrimaryTags.substring(0,1) != "#") {
                updatedPrimaryTags = "#" + updatedPrimaryTags; 
            }
            setPrimaryTags(updatedPrimaryTags); 
    }

    function handleSecondaryTagsUpdate(updatedSecondaryTags) {
            if(updatedSecondaryTags.substring(0,1) != "#") {
                updatedSecondaryTags = "#" + updatedSecondaryTags; 
            }
            setSecondaryTags(updatedSecondaryTags); 
    }

    
    async function handleSubmit(event) {
        event.preventDefault();
        
        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${
                    config.MAX_ATTACHMENT_SIZE / 1000000
                } MB.`
            );
            return;
        }
        
        setIsLoading(true);
        
        try {
            const attachment = file.current ? await s3Upload(file.current) 
                                            : null;
            await createNote({ 
                content, 
                moniker, 
                primaryTags, 
                secondaryTags, 
                attachment
            });
            
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function createNote(note) {
        return API.post("notes", "/notes", {
            body: note 
        });
    }

    function AttachmentCard() {
        return (
              <FormControl style={{ 
                  display: "flex", 
                  flexDirection:"row", 
                  width: "100%" 
                  }}
              >      

              <div style = {{ display: 'flex', flexDirection: 'row' }}> 
                 
                        <Button 
                            className="fileAttach1"
                            variant={attachmentExists() ? "info" : "dark"} 
                            block 
                            size="sm" 
                            style={{ width:"100%", height: "8vh", margin: '0px', paddingLeft: '45%', paddingRight: '40%'}}> 
                        
                            <div style = {{ display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
                            
                                
                                <AttachFileIcon style={{ height: '4.5vh', width: '4.5vh' }}/> 

                                <input 
                                    type = "file"
                                    onChange = { handleFileChange } 
                                    style = {{ width: "10%", height: "100%", marginLeft: '20%', opacity:0 }}
                                /> 
                                
                            </div> 
                                
                        </Button>
                    
                </div>
              </FormControl>
        ); 
    }

    function EditorAndViewerOptionButtons() {
        return (
            <div className="optionButtons" style = {{ 
                display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                <Button 
                    variant="info"
                    disabled={!validateForm()}
                    onClick = {() => setViewMode(!viewMode)}
                    style = {{ marginRight: '3.5px', width: '31.5%' }} 
                >  
                    {viewMode ?  <EditIcon /> : <CodeIcon />  } 
                </Button>

                <Button 
                    disabled={!viewMode} 
                    variant="info" 
                    onClick = {() => setLineNumbers(!lineNumbers) }
                    style = {{ marginRight: '3.5px', width: '31.5%' }} 
                > 
                    <FormatListNumberedOutlinedIcon /> 
                </Button> 
              

                <Button 
                    disabled={!viewMode} 
                    variant="info"
                    style= {{ width: '31.5%' }} 
                    onClick = {() => setWrapLines(!wrapLines) 
                    }
                > 
                    <WrapTextOutlinedIcon /> 
                </Button>
            </div>
        );
    }

    function handleLanguageSelectorChange(updatedLanguage) {
        setLanguage(updatedLanguage); 
    }
    
    function LanguageSelector() {
        return (
            <div className = "languageSelector"> 
            <FormControl style = {{ width: '95%', margin: '15px 5px 5px 5px' }}>             
                <InputLabel htmlFor="grouped-native-select">
                    Language
                </InputLabel>

                <Select 
                    labelId="label" 
                    id="select" 
                    value={language} 
                    onChange={(e) => 
                        handleLanguageSelectorChange(e.target.value)
                    }
                > 
                    <MenuItem value="javascript"> JavaScript </MenuItem>
                    <MenuItem value="html"> HTML </MenuItem>
                    <MenuItem value="c++"> C++ </MenuItem>
                    <MenuItem value="java"> Java </MenuItem>

                </Select>
            </FormControl>
            </div>
        ); 
    }

    function handleViewerThemeChange(updatedViewerTheme) {
        setHighlighterTheme(updatedViewerTheme); 
      }
    
    function HighlighterThemeSelector() {
        return (
            <div className = "highlighterThemeSelector"> 
            <FormControl style = {{ width: '95%', margin: '5px' }}> 
                <InputLabel htmlFor="grouped-native-select">Highlighter Theme</InputLabel>
                
                <Select 
                    labelId="label"
                    disabled={!validateForm()} 
                    id="selectHighlighterTheme"
                    value={highlighterTheme} 
                    onChange={(e) => 
                        handleViewerThemeChange(e.target.value)
                    }
                > 

                    <MenuItem value={shadesOfPurple}> Shades Of Purple </MenuItem>
                    <MenuItem value={dark}> Dark </MenuItem>
                    <MenuItem value={github}> GitHub </MenuItem>
                    <MenuItem value={ocean}> Ocean </MenuItem>
                    <MenuItem value={atomOneLight}> Atom 1 Light </MenuItem>
                    <MenuItem value={brownPaper}> Brown Paper </MenuItem>
                    <MenuItem value={rainbow}> Rainbow </MenuItem>
                    <MenuItem value={googlecode}> GoogleCode </MenuItem>
                    <MenuItem value={monoBlue}> MonoBlue </MenuItem>
                    <MenuItem value={nightOwl}> NightOwl </MenuItem>
                    <MenuItem value={grayscale}> Grayscale </MenuItem>
                    <MenuItem value={stackoverflowDark}> StackOverflow Dark </MenuItem>
                    <MenuItem value={monokaiSublime}> Monokai Sublime </MenuItem>
                    <MenuItem value={purebasic}> Pure Basic </MenuItem> 
                    <MenuItem value={tomorrowNightBlue}> Tomorrow Night Blue </MenuItem> 
                    <MenuItem value={tomorrowNightBright}> Tomorrow Night Bright </MenuItem> 
                    <MenuItem value={tomorrowNightEighties}> Tomorrow Night Eighties </MenuItem> atelierCaveLight
                    <MenuItem value={atelierCaveLight}> Atelier Cave Light </MenuItem> 
                    <MenuItem value={atelierCaveDark}> Atelier Cave Dark </MenuItem>
                </Select>
            </FormControl>
            </div> 
        );
    }

    function getSubmitButtonTheme() {
        return validateForm() ? "outline-success" : "outline-dark"; 
    }

    // function getAttachButtonTheme() {
    //     return attachmentExists() ? "outline"
    // }


    return (
       
        <main> 
            <div style = {{ 
                    display: 'flex', 
                    flexDirection: 'column-reverse', 
                    justifyContent: 'stretch',
                    backgroundColor: "#f8f9fa"
                }}
            > 
                <div className="NewNote">

                    <Form onSubmit={handleSubmit}> 
                    
                    {!viewMode && 
                            <Box bgcolor="#f8f9fa"> 
                            
                                <Form.Group controlId="content">
                                    <Form.Control
                                        value={content}
                                        as="textarea"
                                        onChange={(e) => 
                                            setContent(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Box> 
                        }

                        {viewMode && 
                            <Box bgcolor="#f8f9fa"> 
                                <div style = {{ 
                                    minHeight: '77.75vh',
                                    maxHeight: '77.75vh',
                                    minWidth: '74.5%',
                                    maxWidth: '74.5%',
                                    overflowY: 'scroll',
                                    float: 'right',
                                }}
                            >
                                    <SyntaxHighlighter 
                                        language={language} 
                                        showLineNumbers={lineNumbers}
                                        showInlineLineNumbers={true}
                                        wrapLongLines={wrapLines}
                                        style={highlighterTheme}
                                    >   
                                        { content }
                                    </SyntaxHighlighter>
                                </div>
                            </Box>
                        }

                    <div style = {{ 
                        height: '77.5vh', width: '25%', backgroundColor: "#f8f9fa"
                        }}> 

                        <div> 
                            
                        </div>

                        <div > 
                            <List 
                                component="nav" 
                                aria-label="main mailbox folders"
                            >
                                <ListItem autofocus>

                                    <ListItemIcon>
                                        <FingerprintIcon /> 
                                    </ListItemIcon>
                            
                                    <ListItemText 
                                        primary = { 
                                            <TextField  id="standard-basic" 
                                                        placeholder="@name-me" 
                                                        size="large"
                                                        value={ moniker } 
                                                        onChange={(e) => 
                                                            handleMonikerChange(e.target.value)
                                                        }
                                                        style={{ height: '4vh' }}
                                            />
                                        } 
                                    />
                                </ListItem>
                            </List>

                            <EditorAndViewerOptionButtons />
                            <LanguageSelector /> 
                            <HighlighterThemeSelector />

                        

                            <List 
                                component = "nav" 
                                aria-label = "secondary mailbox folders">
                                
                                <ListItem autofocus>
                                    <ListItemIcon>
                                        <LoyaltyRoundedIcon />
                                    </ListItemIcon>

                                    <ListItemText 
                                        primary= {
                                            <TextField  id="standard-basic" 
                                                        placeholder="#tag-one [optional]"
                                                        size = "large"
                                                        value={ primaryTags } 
                                                        onChange={(e) => 
                                                            handlePrimaryTagsUpdate(e.target.value)
                                                        }
                                                        style={{ height: '5vh', marginTop:"10px" }}
                                            /> 
                                        }
                                    />
                                </ListItem>

                                <ListItem autofocus>
                                    <ListItemIcon>
                                        <LoyaltyOutlinedIcon />
                                    </ListItemIcon> 

                                    <ListItemText 
                                        secondary= {
                                            <TextField  id="standard-basic" 
                                                        size = "large"
                                                        placeholder="#tag-two [optional]" 
                                                        value={ secondaryTags } 
                                                        onChange={(e) => 
                                                            handleSecondaryTagsUpdate(e.target.value)
                                                        }         
                                                        style={{ height: '5vh' }}         
                                            />
                                        }
                                    />
                                </ListItem>
                            </List>
                        </div>

                        <div style = {{ margin: '0px 5px 5px 5px' }}> 
                            <AttachmentCard /> 
                        </div>

                    
                        <div style={{ marginTop: "20px" }}>
                            <LoaderButton 
                                block 
                                type = "submit" 
                                size = "sm" 
                                disabled={!validateForm()}
                                variant = {getSubmitButtonTheme()}
                                isLoading = {isLoading} 
                                disabled = {!validateForm()}
                                style = {{ margin: '5px', width: '97%' }}
                            >
                                <h5> 
                                    Create 
                                </h5> 

                            </LoaderButton>  

                            <LoaderButton 
                                block 
                                size = "sm" 
                                variant = "outline-danger" 
                                isLoading = {false}  
                                style = {{ margin: '5px', width: '97%' }}
                            >
                                <h5> 
                                    Cancel 
                                </h5> 

                            </LoaderButton>          
                        </div>   
                    </div>

                    </Form>
                </div>
            </div>
        </main>
    );
}


render(<NewNote />, document.getElementById('root')); 
export default NewNote; 