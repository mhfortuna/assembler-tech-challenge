import React from "react";

import Header from "../Header";
import Footer from "../Footer";

import "./Layout.scss";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>
        <div className="thumbnail-background" />
        <div className="thumbnail-childrens">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
