import React, { useEffect, useState } from "react";
import axios from "axios";
import Articles from "./Articles";
import { Route } from "react-router-dom";
const Newspaper = ({ match: { params } }) => {
  const [_Newspaper, setNewspaper] = useState({});
  useEffect(() => {
    let isSubscribed = true;
    axios({
      method: "post",
      url:
        "http://localhost:8080/api/collections/get/Newspapers?token=e9d36bfe3216e7be83d9c44dd087ff",
      headers: { "Content-Type": "application/json" },
      data: {
        filter: { _id: params.id }
      }
    }).then(({ data: { entries } }) => {
      if (isSubscribed) {
        setNewspaper(entries[0]);
      }
    });
    return () => (isSubscribed = false);
  }, [params.id]);
  const { _id, Name, Logo } = _Newspaper;
  return _id ? (
    <div className='d-flex flex-column h-100'>
      <div className='d-flex justify-content-start'>
        <div className='d-flex flex-column'>
          <img src={Logo.path} alt={Name} />
          <p className='badge badge-warning mt-2 p-2 '>{Name}</p>
        </div>
      </div>
      <Route
        component={props => <Articles NewspaperFilter={_id} {...props} />}
      />
    </div>
  ) : null;
};
export default Newspaper;
