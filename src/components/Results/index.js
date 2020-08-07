import "./results.css";
import React from "react";
import ResultComponent from "./ResultComponent";
import { useTranslation } from "react-i18next";

export default function ResultsNewTest(props) {
  var sentences = [];
  var resultView = [];
  const results = props.results;
  const { t } = useTranslation();

  results.map(function (result, i) {
    if (result.danger) {
      resultView.push(ResultComponent(result, sentences, i));
      sentences = [];
    } else if (i === results.length - 1) {
      resultView.push(ResultComponent(null, sentences, i));
    } else {
      sentences.push(result.sentence);
    }
    return i;
  });

  return (
    <div className="container" id="container">
      <div className="row justify-content-center text-center h-100 m-0 p-0">
        <h1 className="font-weight-bold my-5 display-4">
          {t("results.title")}
        </h1>
        <div className="col-12 col-md-10 overflow-auto">{resultView}</div>
      </div>
    </div>
  );
}
