import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import config from "../config";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";

import VirtualizedHighlighter from './VirtualizedHighlighter'; 

export default function Settings() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  // function billUser(details) {
  //   return API.post("notes", "/billing", {
  //     body: details
  //   });
  // }


  return (
    <div className="Settings" style={{ 
            position: "absolute", 
            top: '30%', left: '30%', width: '40%', height: '40%',
      }}>

        {/* <h2 style={{ width: '100%' }}> Name, Here </h2>    */}
        <div style={{ 
            display: 'flex', flexDirection: 'column', 
            justifyContent: 'flex-end', height: '100%'
          }}
        >

          <LinkContainer to="/settings/email"  style={{ margin: '5px' }} >
            <LoaderButton variant="info" bsSize="small">
              <h5> Update Email </h5> 
            </LoaderButton>
          </LinkContainer>
          
          <LinkContainer to="/settings/password" style={{ margin: '5px' }}>
            <LoaderButton variant="info" bsSize="small">
              <h5> Update Password </h5> 
            </LoaderButton>
          </LinkContainer>

      
        </div>
    </div>
  );
}
