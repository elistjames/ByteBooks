import React, { createContext, useContext, useState, useEffect } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [userType, setUserType] = useState(
    localStorage.getItem("userType") || "guest" //default to guest if no user type is found
  );

  useEffect(() => {
    localStorage.setItem("userType", userType);
  }, [userType]);

  const setUserRoleType = (newUserType) => {
    setUserType(newUserType);
  };

  return (
    <SessionContext.Provider value={{ userType, setUserRoleType }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
