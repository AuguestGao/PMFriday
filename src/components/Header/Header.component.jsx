import React from "react";
import HeaderContainer from "./Header.styles";

const Header = () => {
  return (
    <HeaderContainer>
      <span>
        PM
        <span className="Friday">Friday</span>
      </span>
      <span>your personal PM assisstant Friday</span>
    </HeaderContainer>
  );
};

export default Header;
