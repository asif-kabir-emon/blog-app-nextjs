"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { authKey } from "@/constants";

const AuthContext = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // useEffect(() => {
  //   const checkLoginStatus = () => {
  //     const token = localStorage.getItem(authKey);
  //     if ((token && isLoggedIn) || (!token && !isLoggedIn)) {
  //     } else {
  //       setIsLoggedIn(!!token);
  //     }
  //   };

  //   return () => {
  //     checkLoginStatus();
  //   };
  // }, []);const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // useEffect(() => {
  //   const token = localStorage.getItem(authKey);
  //   // Check for token only when the component is mounted for the first time
  //   if (token && !isLoggedIn) {
  //     setIsLoggedIn(true);
  //   } else if (!token && isLoggedIn) {
  //     setIsLoggedIn(false);
  //   }
  // }, []); // Empty dependency array ensures this runs only once on mount

  // Only update isLoggedIn if login status changes (e.g., after login or logout)
  useEffect(() => {
    const token = localStorage.getItem(authKey);
    if (token && !isLoggedIn) {
      setIsLoggedIn(true);
    } else if (!token && isLoggedIn) {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]); // Runs whenever isLoggedIn changes, including login/logout

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Provider store={store}>{children}</Provider>
    </AuthContext.Provider>
  );
};

export default Providers;
