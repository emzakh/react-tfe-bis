import React from "react";
import Login from '../components/Login';

const Auth = (props) => {
  return (
    <div>

<div className="login">
            <Login props={props}/>            
        </div>

    
    </div>
  );
};

export default Auth;
