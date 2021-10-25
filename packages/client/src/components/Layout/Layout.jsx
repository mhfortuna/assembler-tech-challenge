import React from "react";

import Header from "../Header";
import Footer from "../Footer";

import "./Layout.scss";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="clr-light p-4">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
