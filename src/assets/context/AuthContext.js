import React from 'react';

//juste besoin d'une forme




export const UserAuth = React.createContext({
    isAuthenticated: false,
    setIsAuthenticated:(value) => {}
    
})

export const UserID = React.createContext({
    ID : "",
    setUserID:(value) => {}
})


