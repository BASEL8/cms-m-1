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
  return (
    <Articles
      _Articles={articles}
      sortArticles={sortArticles}
      setSortArticles={setSortArticles}
      Fields={Fields}
      sortStatus={true}
    />
  );
};

export default Main;
