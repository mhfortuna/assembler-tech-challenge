/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import ImageList from "../../../components/ImageList/ImageList";
import Layout from "../../../components/Layout";
import Spinner from "../../../components/Spinner";
import { PUBLIC } from "../../../constants/routes";
import { searchContent } from "../../../api/search-api";

export default function Search() {
  const query = new URLSearchParams(useLocation().search).get("q");
  const history = useHistory();
  const [contentData, setContentData] = useState({ data: [], loaded: false });

  const fetchContentData = async () => {
    try {
      const {
        data: { data },
      } = await searchContent(query, 16, 0);
      setContentData(() => ({ loaded: true, data: data }));
    } catch (error) {
      toast("Content not found", { type: "error" });
      history.push(PUBLIC.NOT_FOUND);
    }
  };

  useEffect(() => {
    setContentData({ data: [], loaded: false });
    fetchContentData();
  }, [query]);

  return (
    <Layout>
      <div className="container">
        {contentData.loaded ? (
          <h2 className="text-center mb-4 fnt-uppercase">Search results</h2>
        ) : (
          <Spinner />
        )}
      </div>
      {contentData.loaded ? (
        <ImageList contentArray={contentData.data} />
      ) : (
        <Spinner />
      )}
    </Layout>
  );
}
