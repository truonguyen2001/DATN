import React from "react";
import { FaCode, FaUserCircle } from "react-icons/fa";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="app-footer">
      <a
        href="https://github.com/SangLM-DEV/workflow-app.git"
        id="footer__source-code"
        className="app-footer__item">
        <FaCode className="app-footer__icon" />
        <span>source code</span>
      </a>
      <a href="https://github.com/DaRoTP" id="footer__author" className="app-footer__item">
        <FaUserCircle className="app-footer__icon" />
        <span>Author: @kaidev99</span>
      </a>
    </footer>
  );
};

export default Footer;
