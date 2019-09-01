import React, { useEffect, useState } from "react";
import axios from "axios";
import Articles from "./Articles";
const Main = ({ AuthorFilter, NewspaperFilter }) => {
  const [articles, setArticles] = useState([]);
  const [Fields, setFields] = useState({});
  const [sortArticles, setSortArticles] = useState({
    name: "Date",
    direction: -1
  });
  const [Paginate, setPaginate] = useState({
    skip: 0,
    pageCount: 2
  });
  useEffect(() => {
    let isSubscribed = true;
    axios({
      method: "post",
      url:
        "http://localhost:8080/api/collections/get/Articles?token=e9d36bfe3216e7be83d9c44dd087ff",
      headers: { "Content-Type": "application/json" },
      data: {
        limit: 3,
        skip: Paginate.skip,
        sort: { [sortArticles.name]: sortArticles.direction },
        populate: 1
      }
    }).then(({ data, data: { entries, fields, total } }) => {
      console.log(data);
      if (isSubscribed) {
        setArticles(entries);
        setFields(fields);
        setPaginate({ ...Paginate, pageCount: Math.ceil(total / 3) });
      }
    });
    return () => (isSubscribed = false);
    /*eslint-disable */
  }, [sortArticles, AuthorFilter, Paginate.skip]);
  /*eslint-enable */

  delete Fields["Article"];
  return (
    <div>
      <Articles
        _Articles={articles}
        sortArticles={sortArticles}
        setSortArticles={setSortArticles}
        Fields={Fields}
        sortStatus={true}
        Paginate={Paginate}
        setPaginate={setPaginate}
      />
    </div>
  );
};

export default Main;
