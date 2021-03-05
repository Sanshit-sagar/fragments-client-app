import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import config from "../config";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";

import { Auth } from "aws-amplify";

import Button from '@material-ui/core/Button';
import './Settings.css'; 

export default function Settings() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  return (

    <div className='settings-box'>
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-end', 
            height: '100%', 
          }}
        >
          <h2> User, Name </h2>
       
          <LinkContainer to="/settings/email"  style={{ margin: '5px' }} >
            <LoaderButton bsSize="small">
              <h5> Update Email </h5> 
            </LoaderButton>
          </LinkContainer>
          
          <LinkContainer to="/settings/password" style={{ margin: '5px' }}>
            <LoaderButton bsSize="small">
              <h5> Update Password </h5> 
            </LoaderButton>
          </LinkContainer>

      
        </div>
    </div>
  );
}
