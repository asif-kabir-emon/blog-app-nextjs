import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { authKey } from "@/constants";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = Cookies.get(authKey);
      setIsLoggedIn(!!token);
    };

    // Initial check on component mount
    checkLoginStatus();

    // Listen for global auth events to update login status
    const handleAuthEvent = () => {
      checkLoginStatus();
    };

    window.addEventListener("authEvent", handleAuthEvent);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("authEvent", handleAuthEvent);
    };
  }, []);

  return isLoggedIn;
};

export default useAuth;
