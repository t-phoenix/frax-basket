import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import { useNetwork } from "wagmi";
import {Toaster} from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import Mint from "./pages/Mint";
import Fund from "./pages/Fund";
import Rebalance from "./pages/Rebalance";

// import Fund from "./pages/Fund";
// import DemoApp from "./pages/DemoApp";

function App() {
  const { chain } = useNetwork();
  console.log("chain:", chain);

  return (
    <div className="App">
      <Header />

      <div className="body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />}/>
          <Route path="/mint" element={<Mint />} />
          <Route path="/swap" element={<Fund />} />
          {/* <Route path="/rebalance" element={<Rebalance />}/> */}
          
        </Routes>
      </div>

      <Footer/>
      <Toaster toastOptions={{duration: 8000, style: {maxWidth: 800}}}/>
      
    </div>
  );
}

export default App;
