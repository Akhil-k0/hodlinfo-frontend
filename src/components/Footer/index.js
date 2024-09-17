import React from "react";
import "./index.css";
import { ThemeContext } from "../ThemeContext";

const Footer = () => {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <footer
          className={`footer-container ${theme === "dark" ? "dark-mode" : ""}`}
        >
          <div className="footer-text">Copyright © 2019</div>
          <div className="footer-text">HodlInfo.com</div>
          <div className="footer-text footer-support">
            <a href="mailto:support@hodlinfo.com">Support</a>
          </div>
        </footer>
      )}
    </ThemeContext.Consumer>
  );
};

export default Footer;
