import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./ShowImage.css";

const ShowImage = ({ image, setShowFullMedia }) => {
  return (
    <div className="fullMediaImage">
      <div className="closeButCont">
        <div className="closeButton" onClick={setShowFullMedia}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
      <div className="fullMediaImageCont">
        <img
          src={`https://image.tmdb.org/t/p/original${image?.file_path}`}
          alt={image?.name || "Media"}
          className="fullImage"
        />
      </div>
    </div>
  );
};

export default ShowImage;
