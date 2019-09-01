import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Newspapers = () => {
  const [newspapers, setNewspapers] = useState([]);
  const [Fields, setFields] = useState({});
  const [sortArticles, setSortArticles] = useState({
    name: "Name",
    direction: -1
  });
  useEffect(() => {
    let isSubscribed = true;
    axios({
      method: "post",
      url:
        "http://localhost:8080/api/collections/get/Newspapers?token=e9d36bfe3216e7be83d9c44dd087ff",
      headers: { "Content-Type": "application/json" },
      data: {
        limit: 10,
        skip: 0,
        sort: { [sortArticles.name]: sortArticles.direction }
      }
    }).then(({ data: { entries, fields } }) => {
      if (isSubscribed) {
        setNewspapers(entries);
        setFields(fields);
      }
    });
    return () => (isSubscribed = false);
  }, [sortArticles.direction, sortArticles.name]);
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
      <div className='d-flex justify-content-start align-items-stretch'>
        {newspapers.map(({ Name, _id, Logo: { path } }) => (
          <div
            className=' border border-light m-1 rounded d-flex flex-column p-2'
            key={_id}
          >
            <Link
              to={`/newspapers/${_id}`}
              className='rounded mx-auto flex-grow-1 d-flex align-items-center justify-content-center flex-column'
            >
              <div className='flex-grow-1 d-flex justify-content-center align-items-center flex-grow-1 mb-3'>
                <img src={path} alt={Name} />
              </div>
              <p className='m-0 p-2 badge badge-warning w-100'>{Name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newspapers;
