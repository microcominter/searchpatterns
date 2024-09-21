import React, { useContext, useState, useEffect, useRef } from "react";
import Navbar from "./Navbar.jsx";
import { SearchContext } from "../contextApi/SearchContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { setPrompt } from "../slices/query.js";

function Table() {


  return (
    <>
      <Navbar />
      <SearchBar selected={selected} setSelected={setSelected} />
      <div id="apidatatable">
        {showQuestionTable && (
          <h2 className="text-white text-center my-5" style={{ fontFamily: "denton" }} ref={chrt}>
            Questions
          </h2>
        )}
        <div className="row">
          {showQuestionTable &&
            suggestions &&
            Object.entries(suggestions).map(([key, values]) =>
              values ? (
                <div key={key} className="col-md-4 mb-4">
                  <strong className="text-white" style={{ fontFamily: "gilroy", fontSize: "20px", marginLeft: "15px" }}>
                    {key}:
                  </strong>
                  <ul className="pl-3" style={{ fontFamily: "gilroy" }}>
                    {values.map((value, index) => (
                      <li key={index}>
                        <div
                          className="google-link text-white"
                          onClick={() => handleTableClick(value)}
                        >
                          {value}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div key={key}></div>
              )
            )}
        </div>

        {showPrepositionsTable && (
          <h2 className="text-white text-center my-5" ref={chartprepos}>
            Prepositions
          </h2>
        )}
        <div className="row">
          {showPrepositionsTable &&
            prepositions &&
            Object.entries(prepositions).map(([key, values]) =>
              values ? (
                <div key={key} className="col-md-4 mb-4">
                  <strong className="text-white">{key}:</strong>
                  <ul className="pl-3">
                    {values.map((value, index) => (
                      <li key={index}>
                        <div
                          className="google-link text-white"
                          onClick={() => handleTableClick(value)}
                        >
                          {value}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div key={key}></div>
              )
            )}
        </div>

        {showComparisonTable && (
          <>
            <h2 className="text-white text-center my-5" ref={chrtcompare}>
              Comparisons
            </h2>
          </>
        )}
        <div className="row">
          {showComparisonTable &&
            comparisons &&
            Object.entries(comparisons).map(([key, values]) =>
              values.length > 0 ? (
                <div key={key} className="col-md-4 mb-4">
                  <strong className="text-white">{key}:</strong>
                  <ul className="pl-3">
                    {values.map((value, index) => (
                      <li key={index}>
                        <div
                          className="google-link text-white"
                          onClick={() => handleTableClick(value)}
                        >
                          {value}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div key={key}></div>
              )
            )}
        </div>
      </div>
    </>
  );
}

export default Table;
