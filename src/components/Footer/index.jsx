import React from "react";
import { FooterWrapper } from "./styled";

export const Footer = () => (
  <FooterWrapper>
    by Auguest Gao&nbsp;© {new Date().getFullYear()} MIT
    <br />
    <a href="https://www.notaugust.com">check his website</a>
  </FooterWrapper>
);
