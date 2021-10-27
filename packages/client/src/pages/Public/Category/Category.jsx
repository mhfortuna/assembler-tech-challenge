/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouteMatch, useHistory } from "react-router-dom";
import { getContentByCategoryId } from "../../../api/content-api";
import ImageList from "../../../components/ImageList/ImageList";
import Layout from "../../../components/Layout";
import Spinner from "../../../components/Spinner";
import { PUBLIC } from "../../../constants/routes";
import { capitalizeFirstLetter } from "../../../utils/stringManipulation";

export default function Category() {
  const { categoryName } = useRouteMatch(
    `${PUBLIC.CATEGORY}/:categoryName`,
  ).params;
  const history = useHistory();
  const [contentData, setContentData] = useState({ data: [], loaded: false });

  const fetchContentData = async () => {
    try {
      const {
        data: { data },
      } = await getContentByCategoryId(categoryName, 16, 0);
      setContentData(() => ({ loaded: true, data: data }));
    } catch (error) {
      toast("Content not found", { type: "error" });
      history.push(PUBLIC.NOT_FOUND);
    }
  };

  useEffect(() => {
    setContentData({ data: [], loaded: false });
    fetchContentData();
  }, [categoryName]);

  return (
    <Layout>
      <div className="container">
        {contentData.loaded ? (
          <h2 className="text-center mb-4 fnt-uppercase">
            {capitalizeFirstLetter(categoryName)} content
          </h2>
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
