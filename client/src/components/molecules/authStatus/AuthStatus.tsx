import React from "react";
// import { AuthStatusProps } from "./AuthStatus.props";
// import styles from "./AuthStatus.module.css";
import { useRouter } from "next/dist/client/router";
import axios from "axios";
import { AUTH_ME_URL, LOGOUT_URL} from "constants/url";
import { useCookies } from "react-cookie";
import { authCookie } from "constants/cookie";
import { Button } from "@mui/material";

export const AuthStatus = (): JSX.Element => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([authCookie]);

  const [loginStatus, setLoginStatus] = React.useState(
    "initialLoginStatus" || "Loading..."
  );

  async function logOut() {
    setLoginStatus("Loading...");

    try {
      const res = await axios.post(LOGOUT_URL);
      removeCookie(authCookie);
      // router.push("/auth");
    } catch (err) {
      console.error(err);
    }

    getLoginStatus();
  }

  async function getLoginStatus() {
    setLoginStatus("Loading...");

    try {
      const res = await axios.get(AUTH_ME_URL, {withCredentials: true}).then((response) => response.data);
      console.log(cookies);
      setLoginStatus(`Logged in as ${res.email}`);
    } catch (err) {
      setLoginStatus("Not logged in");

      // router.push("/auth");
    }
  }


    React.useEffect(() => {
    getLoginStatus();
    
  }, []);

  return (
    <>
    <p>{loginStatus}</p>
    
      <Button color="secondary" onClick={logOut}>
        Logout
      </Button>
    
    </>
  );
};