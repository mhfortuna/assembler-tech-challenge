import React from "react";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageList({ contentArray = [] }) {
  return (
    <div>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
            {contentArray.map((element) => (
              <ImageCard
                content={element}
                key={
                  element.isGiphy
                    ? `img-card-giphy-${element.id}`
                    : `img-card-${element._id}`
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
