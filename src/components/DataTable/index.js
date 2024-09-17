import React, { Component } from "react";
import "./index.css";
import { ThemeContext } from "../ThemeContext";

class DataTable extends Component {
  static contextType = ThemeContext;

  state = {
    data: [],
    isLoading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchDataFromServer();
  }

  // Function to fetch data from the server
  fetchDataFromServer = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getTop10");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      // Generate serial numbers for each item in the data
      const dataWithSerialNumbers = this.generateSerialNumbers(data);

      this.setState({
        data: dataWithSerialNumbers,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching data:", error.message);
      this.setState({ isLoading: false, error: error.message });
    }
  };

  // Function to generate serial numbers
  generateSerialNumbers = (data) => {
    return data.map((item, index) => {
      return { ...item, serialNumber: index + 1 };
    });
  };

  // Function to render table rows
  renderTableRows = () => {
    const { data } = this.state;
    const { theme } = this.context;

    return data.map((item) => {
      const last = item.last;
      const buy = item.buy;
      const sell = item.sell;
      const percentageChange = buy === 0 ? 0 : ((sell - buy) * 100) / buy;
      const savings = (item.sell - item.buy) * item.volume;

      const percentageColor = percentageChange === 0 ? "#ef4444" : "green";
      const savingColor = savings === 0 ? "#ef4444" : "green";

      return (
        <tr
          key={item.serialNumber}
          className={`table-row ${theme === "dark" ? "dark-mode" : ""}`}
        >
          <td>{item.serialNumber}</td>
          <td>{item.name}</td>
          <td>₹ {last}</td>
          <td>
            ₹ {buy} / ₹ {sell}
          </td>
          <td style={{ color: percentageColor }}>
            {percentageChange.toFixed(2)}%
          </td>
          <td style={{ color: savingColor }}>{savings}</td>
        </tr>
      );
    });
  };

  render() {
    const { isLoading, error, data } = this.state;
    const { theme } = this.context;

    if (isLoading) {
      // Display loader when data is being fetched
      return (
        <div className="loader-wrapper">
          <div className="loader" />
        </div>
      );
    }

    if (error) {
      // Display error message if fetching fails
      return (
        <div className="error-message">
          <p>Error fetching data: {error}</p>
        </div>
      );
    }

    if (data.length === 0) {
      return <p>No data available.</p>;
    }

    return (
      <div className={`table-container ${theme === "dark" ? "dark-mode" : ""}`}>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Platform</th>
              <th>Last Traded Price</th>
              <th>Buy / Sell Price</th>
              <th>Difference</th>
              <th>Savings</th>
            </tr>
          </thead>
          <tbody>{this.renderTableRows()}</tbody>
        </table>
      </div>
    );
  }
}

export default DataTable;
