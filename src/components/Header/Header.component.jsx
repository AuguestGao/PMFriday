import React from "react";
import { Link } from "react-router-dom";

import HeaderContainer from "./Header.styles";

const Header = () => {
  return (
    <HeaderContainer>
      <span>
        PM
        <span className="Friday">Friday</span>
      </span>
      <Link to="/">
        <span>Back</span>
      </Link>
    </HeaderContainer>
  );
};

export default Header;
