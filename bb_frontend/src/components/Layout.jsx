import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom"; // Import Outlet

function Layout() {
  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen"> {/* Padding top to avoid overlap with fixed Header */}
        <Outlet /> {/* This will render the page content dynamically */}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
