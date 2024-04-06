import React, { createContext, useContext, useState, useEffect } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [userType, setUserType] = useState(
    localStorage.getItem("userType") || "guest" //default to guest if no user type is found
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "" //default to empty string if no username is found
  );
  const [userId, setUserId] = useState(
      localStorage.getItem("userId") || "" //default to empty string if no user id is found
  )

  useEffect(() => {
    localStorage.setItem("userType", userType);
  }, [userType]);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  const setUserRoleType = (newUserType) => {
    setUserType(newUserType);
  };

  const setUser = (newUsername) => {
    setUsername(newUsername);
  };

  const setId = (newUserId) => {
    setUserId(newUserId);
  };

  return (
    <SessionContext.Provider value={{ userType, username, userId, setUserRoleType, setUser, setId }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
