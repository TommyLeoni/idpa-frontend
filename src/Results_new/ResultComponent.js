import React, { useState } from "react";

export default function ResultComponent(danger, sentences, key) {
  const [viewRest, toggleView] = useState(false);
  var content = [];

  try {
    var textToAudit = danger.sentence;

    for (var i = 0; i < danger.danger.length; i++) {
      const split = textToAudit.split(danger[i]);
      if (i === danger.length - 1) {
        content.push(
          split[0],
          <span className="res-bg text-light">{danger[i]}</span>,
          split[1]
        );
      } else {
        content.push(split[0], danger[i]);
        textToAudit = split[1];
      }
    }
  } catch (err) {}

  return (
    <div key={key}>
      {sentences.length > 0 ? (
        <div className="row p-2">
          <div className="w-100 text-center text-muted">
            <u onClick={() => toggleView(!viewRest)}>
              {viewRest ? "Hide context" : "Show context"}
            </u>
          </div>
          <div
            className={`${
              viewRest ? "" : "d-none"
            } w-100 text-left my-2 bg-light p-4 my-2 rounded-corners shadow`}
          >
            {sentences.map(function (sentence, i) {
              return <p key={i}>{sentence}</p>;
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
      {danger ? (
        <div className="row">
          <div className="col-3 col-md-2 res-bg text-light py-4 my-2 rounded-corners-left shadow">
            <div className="my-auto">
              <h1 className="font-weight-bold">
                <u className="id">{key}</u>
              </h1>
            </div>
          </div>
          <div className="col-9 col-md-10 bg-light py-4 my-2 rounded-corners-right text-left shadow">
            <p className="my-auto">{danger.sentence}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
