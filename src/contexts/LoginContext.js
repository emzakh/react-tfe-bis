import { createContext, useContext } from "react";

const jwt = require("jsonwebtoken");

const LoginContext = createContext(undefined);

export function GetUser(props) {
  let token = localStorage.getItem("authToken");
  let user = jwt.decode(token);

  return (
    <LoginContext.Provider value={user}>{props.children}</LoginContext.Provider>
  );
}

export function useLoginContext() {
  return useContext(LoginContext);
}
