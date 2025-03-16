import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import StorePage from "./pages/StorePage";
import RatingPage from "./pages/RatingPage";
import ContactPage from "./pages/ContactPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure CSS is imported
import MyAccountPage from "./pages/MyAccountPage";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stores" element={<StorePage />} />
          <Route path="/rating" element={<RatingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path= "/my-account" element={<MyAccountPage />} />
        </Routes>
        <Footer />
      </Router>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" 
        toastStyle={{
          borderRadius: "0px", 
          backgroundColor: "black", 
          color: "white", 
        }}
      />
    </div>
  );
}

export default App;
