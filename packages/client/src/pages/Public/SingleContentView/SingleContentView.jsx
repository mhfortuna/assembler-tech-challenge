/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouteMatch, useHistory, Link } from "react-router-dom";
import { getContentById } from "../../../api/content-api";
import Layout from "../../../components/Layout";
import Spinner from "../../../components/Spinner";
import { PUBLIC } from "../../../constants/routes";
import { capitalizeFirstLetter } from "../../../utils/stringManipulation";

export default function SingleContentView() {
  const history = useHistory();
  const [contentData, setContentData] = useState({ data: [], loaded: false });
  const { contentId } = useRouteMatch(`${PUBLIC.CONTENT}/:contentId`).params;

  const fetchContentData = async () => {
    try {
      const {
        data: { data },
      } = await getContentById(contentId);
      setContentData(() => ({ loaded: true, data: data }));
    } catch (error) {
      toast("Content not found", { type: "error" });
      history.push(PUBLIC.NOT_FOUND);
    }
  };

  useEffect(() => {
    fetchContentData();
  }, []);
  return (
    <Layout>
      {contentData.loaded ? (
        <div className="container">
          <div className="col">
            <h2 className="text-center mb-4 fnt-uppercase">
              {contentData.data.title}
            </h2>
            <div className="row">
              <div className="col-6">
                <img
                  src={contentData.data.url}
                  alt={`meme-img-${contentData.data._id}`}
                  className="img-fluid"
                />
              </div>
              <div className="col-6">
                <h5 className="h5">More info: </h5>
                <ul>
                  <li>Type: {contentData.data.type}</li>
                  <li>
                    Category:{" "}
                    <Link
                      to={`${PUBLIC.CATEGORY}/${contentData.data.categoryId.name}`}
                    >
                      {capitalizeFirstLetter(contentData.data.categoryId.name)}
                    </Link>
                  </li>
                  <li>
                    User:{" "}
                    {`${contentData.data.userId.firstName} ${contentData.data.userId.lastName}`}
                  </li>
                  <li className="text-break">
                    URL:{" "}
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(contentData.data.url);
                        toast("URL copied to the clipboard!", {
                          type: "success",
                        });
                      }}
                      className="fnt-selectable"
                    >
                      {contentData.data.url}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
}
