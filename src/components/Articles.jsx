import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Articles = ({ AuthorFilter, NewspaperFilter }) => {
  const [Articles, setArticles] = useState([]);
  const [Fields, setFields] = useState({});
  const [sortArticles, setSortArticles] = useState({
    name: "Date",
    direction: -1
  });
  useEffect(() => {
    let isSubscribed = true;
    axios({
      method: "post",
      url:
        "http://localhost:8080/api/collections/get/Articles?token=e9d36bfe3216e7be83d9c44dd087ff",
      headers: { "Content-Type": "application/json" },
      data: {
        limit: 10,
        skip: 0,
        sort: { [sortArticles.name]: sortArticles.direction },
        filter: false && { _id: "" },
        populate: 1
      }
    }).then(({ data, data: { entries, fields } }) => {
      if (isSubscribed) {
        setArticles(entries);
        setFields(fields);
      }
    });
    return () => (isSubscribed = false);
  }, [sortArticles, AuthorFilter]);
  delete Fields["Article"];
  AuthorFilter && delete Fields["Author"];
  NewspaperFilter && delete Fields["Newspaper"];
  return (
    <div className='d-flex flex-column h-100'>
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
      <div className='pt-2 pb-2 h-100 overflow-auto'>
        {Articles.filter(({ Author }) =>
          AuthorFilter ? Author[0]._id === AuthorFilter : Author
        )
          .filter(({ Newspaper }) =>
            NewspaperFilter ? Newspaper[0]._id === NewspaperFilter : Newspaper
          )
          .map(({ Article, Author, Date, Title, _id, Newspaper }) => (
            <div className='border rounded col-sm-12 mt-3 p-3' key={_id}>
              <div>
                <span className='badge m-1 p-2 badge-secondary'>{Date}</span>
                <Link to={`/articles/${_id}`}>
                  <h5 className='card-title text-muted pt-3 pb-3'>{Title}</h5>
                </Link>
                {Author.map(({ Name, _id, Image }) => (
                  <Link to={`/authors/${_id}`} key={_id}>
                    {Image.path && (
                      <img
                        src={Image.path}
                        alt={Name}
                        style={{ height: 25, width: "auto" }}
                        className='mr-2'
                      />
                    )}
                    <span className='badge mr-1 p-2 badge-info'>{Name}</span>
                  </Link>
                ))}
              </div>
              {Newspaper.map(({ Name, _id, Logo }) => (
                <div key={_id}>
                  <Link
                    to={`/newspapers/${_id}`}
                    className='d-flex align-items-center pt-2 pb-2'
                  >
                    <div style={{ height: 30 }}>
                      <img
                        alt=''
                        className='mb-4'
                        src={Logo.path}
                        style={{ height: "100%", width: "auto" }}
                      />
                    </div>
                    <span className='badge ml-2 p-2 badge-warning'>{Name}</span>
                  </Link>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Articles;
