import React from "react";
import Navigation from '../components/Navigation';
import EditProfile from "../components/EditProfile"

const Edit = () => {
  return (
    <div>

        <div className="edit">
            <Navigation/>               
             <EditProfile />       
        </div>

    
    </div>
  );
};

export default Edit;
