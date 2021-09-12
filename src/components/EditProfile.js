import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditProfile = () => {
    const [data, setData] = useState([]);
    

    useEffect(() => {
        axios
          .get("http://localhost:8000/api/users")
          .then((res) => res.data["hydra:member"])
          .then((data) => setData(data));
          console.log(data)
      }, []);

    return ( 
        <div></div>
    )

       
}
 
export default EditProfile;