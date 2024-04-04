import React, { createContext, useContext, useState, useEffect } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [userType, setUserType] = useState(
    localStorage.getItem("userType") || "guest" //default to guest if no user type is found
  );

  const [user, setUser] = useState({
    "id": 3,
    "username": "emily_writer"
  })

  useEffect(() => {
    localStorage.setItem("userType", userType);
    localStorage.setItem("username", user.username);
    localStorage.setItem("id", user.id);
  }, [userType, user]);

  const setUserRoleType = (newUserType) => {
    setUserType(newUserType);
  };

  return (
    <SessionContext.Provider value={{ userType, setUserRoleType, user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
