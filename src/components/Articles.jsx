import React from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Articles = ({
  Fields,
  setSortArticles,
  sortArticles,
  _Articles,
  sortStatus,
  Paginate,
  setPaginate
}) => {
  return (
    <div className='d-flex flex-column h-100'>
      {sortStatus && (
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
      )}
      {Paginate && (
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"...."}
          breakClassName={"break-me"}
          pageCount={Paginate.pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={data => {
            let selected = data.selected;
            let skip = Math.ceil(selected * 3);
            setPaginate({ ...Paginate, skip });
          }}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
        />
      )}
      <div className='pb-2 h-100 overflow-auto'>
        {_Articles &&
          _Articles.map(({ Author, Date, Title, _id, Newspaper }) => (
            <div className='border rounded col-sm-12 mt-2 p-2' key={_id}>
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
