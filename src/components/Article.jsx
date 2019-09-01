import React, { useEffect, useState } from "react";
import axios from "axios";
const Article = ({ match: { params } }) => {
  const [_Article, setArticle] = useState({});
  useEffect(() => {
    let isSubscribed = true;
    axios({
      method: "post",
      url:
        "http://localhost:8080/api/collections/get/Articles?token=e9d36bfe3216e7be83d9c44dd087ff",
      headers: { "Content-Type": "application/json" },
      data: {
        filter: { _id: params.id },
        populate: 1
      }
    }).then(({ data, data: { entries, fields } }) => {
      console.log(data);
      if (isSubscribed) {
        setArticle(entries[0]);
      }
    });
    return () => (isSubscribed = false);
  }, [params.id]);
  const { Title, Author, Newspaper, Date, Article, _id } = _Article;
  return _id ? (
    <div className='d-flex flex-column h-100'>
      <div>
        <h2>{Title}</h2>
        <div>
          <p className='badge badge-info mr-2 p-2 '>{Author[0].display}</p>
          <p className='badge badge-warning mr-2 p-2 '>
            {Newspaper[0].display}
          </p>
        </div>
        <p>{Date}</p>
      </div>
      <div
        className='mb-5 pb-5'
        dangerouslySetInnerHTML={{ __html: Article }}
      ></div>
    </div>
  ) : null;
};
export default Article;
