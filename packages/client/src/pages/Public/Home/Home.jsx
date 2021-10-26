/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getContent } from "../../../api/content-api";
import ImageList from "../../../components/ImageList/ImageList";
import Layout from "../../../components/Layout";
import Spinner from "../../../components/Spinner";

export default function Home() {
  const [contentData, setContentData] = useState({ data: [], loaded: false });

  const fetchContentData = async () => {
    try {
      const { data } = await getContent(16, 0);
      setContentData(() => ({ loaded: true, data: data.data }));
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  useEffect(() => {
    fetchContentData();
  }, []);
  return (
    <Layout>
      <div className="container">
        <h2 className="text-center mb-4 fnt-uppercase">Most popular content</h2>
      </div>
      {contentData.loaded ? (
        <ImageList contentArray={contentData.data} />
      ) : (
        <Spinner />
      )}
    </Layout>
  );
}
