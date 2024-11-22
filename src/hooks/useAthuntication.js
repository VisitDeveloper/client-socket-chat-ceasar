/* eslint-disable @typescript-eslint/no-explicit-any */
// library
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useUserAuthentication() {
  const [userAuthenticationStatus, setUserAuthenticationStatus] = useState(true);
  const isLogin = useSelector((store) => store.user.token);

  useEffect(() => {
    if (isLogin === null || !isLogin) {
      if (userAuthenticationStatus === false) return;
      setUserAuthenticationStatus(false);
    } else {
      if (userAuthenticationStatus === true) return;
      setUserAuthenticationStatus(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, userAuthenticationStatus]);

  return userAuthenticationStatus;
}

export default useUserAuthentication;
