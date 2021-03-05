
// import React from 'react'; 

// import {
//     FormControl, 
//     InputLabel, 
//     Select, 
//     MenuItem
// } from "@material-ui/core"; 

// import {  
//     dark, ocean, atelierCaveLight, atelierCaveDark, stackoverflowDark,
//     atomOneLight,brownPaper,github,shadesOfPurple,rainbow, googlecode,
//     monoBlue, nightOwl, grayscale,purebasic, monokaiSublime, 
//     tomorrowNightBlue, tomorrowNightBright, tomorrowNightEighties,
// } from "react-syntax-highlighter/dist/esm/styles/hljs";

// function SyntaxThemeSelector(props) {

//     return (
//         <div className = "theme-selector"> 
//         <FormControl style = {{ width: '95%', margin: '5px' }}> 
//             <InputLabel htmlFor="grouped-native-select">Highlighter Theme</InputLabel>
            
//             <Select 
//                 labelId="label"
//                 disabled={!validateForm()} 
//                 id="selectHighlighterTheme"
//                 value={props.themeName} 
//                 onChange={(e) => 
//                     handleViewerThemeChange(e.target.value)
//                 }
//             > 

//                 <MenuItem value={shadesOfPurple}> Shades Of Purple </MenuItem>
//                 <MenuItem value={dark}> Dark </MenuItem>
//                 <MenuItem value={github}> GitHub </MenuItem>
//                 <MenuItem value={ocean}> Ocean </MenuItem>
//                 <MenuItem value={atomOneLight}> Atom 1 Light </MenuItem>
//                 <MenuItem value={brownPaper}> Brown Paper </MenuItem>
//                 <MenuItem value={rainbow}> Rainbow </MenuItem>
//                 <MenuItem value={googlecode}> GoogleCode </MenuItem>
//                 <MenuItem value={monoBlue}> MonoBlue </MenuItem>
//                 <MenuItem value={nightOwl}> NightOwl </MenuItem>
//                 <MenuItem value={grayscale}> Grayscale </MenuItem>
//                 <MenuItem value={stackoverflowDark}> StackOverflow Dark </MenuItem>
//                 <MenuItem value={monokaiSublime}> Monokai Sublime </MenuItem>
//                 <MenuItem value={purebasic}> Pure Basic </MenuItem> 
//                 <MenuItem value={tomorrowNightBlue}> Tomorrow Night Blue </MenuItem> 
//                 <MenuItem value={tomorrowNightBright}> Tomorrow Night Bright </MenuItem> 
//                 <MenuItem value={tomorrowNightEighties}> Tomorrow Night Eighties </MenuItem> atelierCaveLight
//                 <MenuItem value={atelierCaveLight}> Atelier Cave Light </MenuItem> 
//                 <MenuItem value={atelierCaveDark}> Atelier Cave Dark </MenuItem>
//             </Select>
//         </FormControl>
//         </div> 
//     );
// }

// export default HighlighterThemeSelector;