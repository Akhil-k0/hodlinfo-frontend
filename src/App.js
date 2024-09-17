// App.js
import React from "react";
import { ThemeProvider } from "./components/ThemeContext";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DataTable from "./components/DataTable";

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Home />
      <DataTable />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
