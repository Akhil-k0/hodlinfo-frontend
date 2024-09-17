import { Component } from "react";
import "./index.css";
import { ThemeContext } from "../ThemeContext";

class Header extends Component {
  state = {
    assets: [],
    selectedAsset: "BTC▾",
    selectedCurrency: "INR▾",
    countDownTimer: 60,
    isDarkMode: false,
  };

  startCountdown = () => {
    this.timerInterval = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.countDownTimer > 0) {
          return { countDownTimer: prevState.countDownTimer - 1 };
        } else {
          this.fetchAssetsFromBackend();
          return { countDownTimer: 60 };
        }
      });
    }, 1000);
  };

  componentDidMount() {
    this.fetchAssetsFromBackend();
    this.startCountdown();
  }

  fetchAssetsFromBackend = async () => {
    const response = await fetch("http://localhost:5000/api/getTop10");
    const data = await response.json();
    this.setState({ assets: data });
  };

  handleAssetClick = (asset) => {
    this.setState({ selectedAsset: asset.toUpperCase() });
  };

  handleCurrencyClick = (currency) => {
    this.setState({ selectedCurrency: currency });
  };

  static contextType = ThemeContext;

  handleThemeToggle = () => {
    const { toggleTheme } = this.context;
    toggleTheme();
  };

  render() {
    const { assets, selectedAsset, countDownTimer, isDarkMode } = this.state;
    const { theme } = this.context;

    return (
      <div
        className={`header-bg-container ${theme === "dark" ? "dark-mode" : ""}`}
      >
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dxrszpxbx/image/upload/v1726507660/Hodlinfo.png"
            alt="HodlInfo"
            className="logo"
          />
        </div>

        <div className="dropdown-section">
          {/* Currency Dropdown */}
          <div className="dropdown">
            <select
              className={`dropdown-button ${isDarkMode ? "dark-mode" : ""}`}
              value={selectedAsset}
              onChange={(e) => this.handleCurrencyClick(e.target.value)}
            >
              {Array.from(
                new Set(assets.map((asset) => asset.name.slice(4, 8)))
              ).map((uniqueAsset) => (
                <option key={uniqueAsset} value={uniqueAsset}>
                  {uniqueAsset}▾
                </option>
              ))}
            </select>
          </div>

          {/* Asset Dropdown */}
          <div className="dropdown">
            <select
              className={`dropdown-button ${isDarkMode ? "dark-mode" : ""}`}
              value={selectedAsset}
              onChange={(e) => this.handleAssetClick(e.target.value)}
            >
              {assets.map((asset) => (
                <option
                  key={asset.base_unit}
                  value={asset.name.slice(0, 3)}
                  className="dropdown-menu"
                >
                  {asset.name.slice(0, 3)}▾
                </option>
              ))}
            </select>
          </div>

          {/* Buy Button */}
          <a
            href={`https://wazirx.com/invite/sp7pvbt6`}
            target="_blank"
            className={`buy-button ${isDarkMode ? "dark-mode" : ""}`}
            rel="noreferrer"
          >
            BUY {selectedAsset.slice(0, 3)}
          </a>
        </div>

        <div className="right-header">
          {/* Countdown Timer */}
          <div className="countdown-timer">{countDownTimer}</div>

          {/* Telegram Button */}
          <div className="telegram-button">
            <img
              src="https://res.cloudinary.com/dxrszpxbx/image/upload/v1726512588/uuerzysizlduzipc7jt6.png"
              alt="Telegram"
              className="telegram-logo"
            />
            <span>Connect Telegram</span>
          </div>

          {/* Theme Toggle */}
          <div className="theme-switch">
            <label className="switch">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={this.handleThemeToggle}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
