import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({})
  return (
    <>
    <AuthContext.Provider value={{loggedIn, setLoggedIn, userData, setUserData}}>
      {children}
    </AuthContext.Provider>
    </>
  );
}