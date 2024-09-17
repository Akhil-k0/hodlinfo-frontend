import { Component } from "react";
import { ThemeContext } from "../ThemeContext";

import "./index.css";

class Home extends Component {
  static contextType = ThemeContext;
  render() {
    const { theme } = this.context;
    return (
      <>
        <div
          className={`price-details-container ${
            theme === "dark" ? "dark-mode" : ""
          }`}
        >
          <h1 className="subtitle">Best Price To Trade</h1>

          <div className="different-time-profits-container">
            <div>
              <h1 className="profit-percentage">0.1%</h1>
              <p className="profit-time">5 Mins</p>
            </div>

            <div>
              <h1 className="profit-percentage">0.96%</h1>
              <p className="profit-time">1 Hour</p>
            </div>

            <div>
              <h1 className={`price ${theme === "dark" ? "dark-mode" : ""}`}>
                ₹ 26,56,110
              </h1>
            </div>

            <div>
              <h1 className="profit-percentage">2.73%</h1>
              <p className="profit-time">1 Day</p>
            </div>

            <div>
              <h1 className="profit-percentage">7.51%</h1>
              <p className="profit-time">7 Days</p>
            </div>
          </div>
          <p className="note">Average BTC/INR net price including Commission</p>
        </div>
        <div
          className={`add-btn-container ${theme === "dark" ? "dark-mode" : ""}`}
        >
          <button className="add-btn">Add hodlinfo to home screen</button>
        </div>
      </>
    );
  }
}

export default Home;
