import React, { createContext, useContext, useState, useEffect } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [userType, setUserType] = useState(
    localStorage.getItem("userType") || "guest" //default to guest if no user type is found
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "" //default to empty string if no username is found
  );

  useEffect(() => {
    localStorage.setItem("userType", userType);
  }, [userType]);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  const setUserRoleType = (newUserType) => {
    setUserType(newUserType);
  };

  const setUser = (newUsername) => {
    setUsername(newUsername);
  };

  return (
    <SessionContext.Provider value={{ userType, username, setUserRoleType, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
