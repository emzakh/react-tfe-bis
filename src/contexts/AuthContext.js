import React from 'react';
// import { createContext } from 'react';

//juste besoin d'une forme
export default React.createContext({
    isAuthenticated: false,
    setIsAuthenticated:(value) => {}
})

// export const UserContext = createContext(null);