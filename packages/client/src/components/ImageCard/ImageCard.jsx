import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PUBLIC } from "../../constants/routes";

import "./ImageCard.scss";

export default function ImageCard({ content }) {
  const userState = useSelector((state) => state.user);
  const handleNotImplemented = () => {
    return toast("This feature is not implemented yet!", { type: "warning" });
  };
  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          className="card-img-top img-thumbnail img-max-size"
          src={content.isGiphy ? content.images.fixed_height.url : content.url}
          alt="meme"
        />
        <title>{content.title}</title>

        <div className="card-body">
          <h5 className="card-title">{content.title}</h5>

          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              {content.isGiphy ? (
                <a
                  href={content.url}
                  className="btn btn-sm btn-outline-secondary"
                >
                  View
                </a>
              ) : (
                <Link
                  to={`${PUBLIC.CONTENT}/${content._id}`}
                  className="btn btn-sm btn-outline-secondary"
                >
                  View
                </Link>
              )}
              {content.isGiphy === false &&
                userState.mongoId === content.userId && (
                  <button
                    onClick={handleNotImplemented}
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Edit
                  </button>
                )}
            </div>
            <small className="text-muted">
              {content.isGiphy ? (
                "Content from GIPHY"
              ) : (
                <Link to={`${PUBLIC.CATEGORY}/${content.categoryId._id}`}>
                  {content.categoryId.categoryName}
                </Link>
              )}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
