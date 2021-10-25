import React from "react";
import Layout from "../../../components/Layout";

export default function NotFound() {
  return (
    <Layout docTitle="Not found" isNegative>
      <div className="d-flex justify-content-between align-items-start row p-0 g-4">
        <div className="col col-12 mt-4">
          <div className="d-flex justify-content-between align-items-start">
            Oops, this page doesnt exist!
          </div>
          <h3 className="fnt-subtitle-light mt-4">Error 404</h3>
        </div>
      </div>
    </Layout>
  );
}
