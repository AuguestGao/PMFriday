import React from "react";
import { isEmpty } from "lodash";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { auth } from "../../firebase/firebase";

import { HeaderWrapper, NavWrapper } from "./Header.styles";

export const Header = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const handleSignout = async () => {
    await auth.signOut();
  };

  return (
    <HeaderWrapper>
      {isEmpty(user) ? null : (
        <>
          <div className="brand" onClick={() => history.push("/")}>
            PM&nbsp;Friday
          </div>
          <NavWrapper>
            <ul>
              <li onClick={() => history.push("/")}>
                <Link to="/">Home</Link>
              </li>
              <li onClick={handleSignout}>
                <Link to="/">Sign out</Link>
              </li>
            </ul>
          </NavWrapper>
        </>
      )}
    </HeaderWrapper>
  );
};
