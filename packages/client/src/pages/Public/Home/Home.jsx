/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getGifs } from "../../../api/gif-api";
import ImageList from "../../../components/ImageList/ImageList";
import Layout from "../../../components/Layout";
import Spinner from "../../../components/Spinner";

export default function Home() {
  const [gifData, setGifData] = useState({ data: [], loaded: false });

  const fetchGifData = async () => {
    try {
      const { data } = await getGifs(15, 0);
      setGifData((prev) => ({ loaded: true, data: data.data }));
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  useEffect(() => {
    fetchGifData();
  }, []);
  return (
    <Layout>
      <div className="container">
        <h2 className="text-center mb-4 fnt-uppercase">Most popular content</h2>
      </div>
      {gifData.loaded ? <ImageList contentArray={gifData.data} /> : <Spinner />}
    </Layout>
  );
}
