import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Authors = () => {
  const [Authors, setAuthors] = useState();
  const [Fields, setFields] = useState({});
  const [sortArticles, setSortArticles] = useState({
    name: "Name",
    direction: 1
  });
  useEffect(() => {
    let isSubscribed = true;

    axios({
      method: "post",
      url:
        "http://localhost:8080/api/collections/get/Authors?token=e9d36bfe3216e7be83d9c44dd087ff",
      headers: { "Content-Type": "application/json" },
      data: {
        limit: 10,
        skip: 0,
        sort: { [sortArticles.name]: sortArticles.direction }
      }
    }).then(({ data: { entries, fields } }) => {
      if (isSubscribed) {
        setAuthors(entries);
        setFields(fields);
      }
    });
    return () => (isSubscribed = false);
  }, [sortArticles.direction, sortArticles.name]);
  delete Fields["Description"];
  delete Fields["Image"];
  return (
    <div>
      <div className='d-flex justify-content-end pt-2 pb-2'>
        {Object.keys(Fields).map(
          key =>
            key !== "Logo" && (
              <button
                className='btn btn-light btn-sm ml-2'
                key={key}
                onClick={() =>
                  setSortArticles({
                    name: key,
                    direction: sortArticles.direction * -1
                  })
                }
              >
                {key}
                {sortArticles.name === key &&
                  (sortArticles.direction > 0 ? " ⬇" : " ⬆")}
              </button>
            )
        )}
      </div>
      <div className='d-flex justify-content-start align-items-stretch border border-light rounded'>
        {Authors &&
          Authors.map(({ Name, Image, _id }) => (
            <Link
              to={`/authors/${_id}`}
              className=' border border-light m-1 rounded d-flex flex-column p-2'
              key={_id}
            >
              <div className='rounded mx-auto flex-grow-1 d-flex align-items-center'>
                {Image.path ? (
                  <img
                    alt=''
                    className='img-thumbnail border-0 rounded'
                    src={Image && Image.path}
                    key={_id}
                    width='100px'
                  />
                ) : (
                  "no image"
                )}
              </div>

              <h5 className='badge badge-info w-100 p-2'>{Name}</h5>
            </Link>
          ))}
      </div>
    </div>
  );
};
export default Authors;
