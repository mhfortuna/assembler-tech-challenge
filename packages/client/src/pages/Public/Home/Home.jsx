/* eslint-disable no-unused-vars */
import React from "react";
import ImageList from "../../../components/ImageList/ImageList";
import Layout from "../../../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="container">
        <h3> Some title here </h3>
      </div>
      <ImageList />
    </Layout>
  );
}
