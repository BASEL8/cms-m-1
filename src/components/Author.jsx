import React, { useEffect, useState } from "react";
import Articles from "./Articles";
import axios from "axios";
import { Route } from "react-router-dom";
const Author = ({ match: { params } }) => {
  const [Author, setAuthor] = useState({});
  useEffect(() => {
    let isSubscribed = true;
    axios({
      method: "post",
      url:
        "http://localhost:8080/api/collections/get/Authors?token=e9d36bfe3216e7be83d9c44dd087ff",
      headers: { "Content-Type": "application/json" },
      data: {
        filter: { _id: params.id },
        populate: 3
      }
    }).then(({ data, data: { entries } }) => {
      console.log(data);
      if (isSubscribed) {
        setAuthor(entries[0]);
      }
    });
    return () => (isSubscribed = false);
  }, [params.id]);
  const { _id, Name, Description, Image } = Author;
  return _id ? (
    <div className='p-4 w-100'>
      <div className='d-flex justify-content-start p-2'>
        <div className='p-2 d-flex flex-column'>
          {Image.path ? (
            <img src={Image.path} alt={Name} />
          ) : (
            <div className='p-4'>no image</div>
          )}
          <p className='badge badge-info mt-2 p-2 '>{Name}</p>
        </div>
        <div className='flex-grow-1 pt-0 pr-4 pl-4'>
          <p>{Description}</p>
        </div>
      </div>
      <Route component={props => <Articles AuthorFilter={_id} {...props} />} />
    </div>
  ) : null;
};

export default Author;
