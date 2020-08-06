import React, { useState } from "react";

export default function ResultComponent(danger, sentences, key) {
  const split = danger ? danger.text.split(danger.danger[0]) : null;
  const [viewRest, toggleView] = useState(false);
  var content = [];

  try {
    var textToAudit = danger[0].text;

    for (var i = 0; i < danger.danger.length; i++) {
      const split = textToAudit.split(danger.danger[i]);
      if (i === danger.danger.length - 1) {
        content.push(
          split[0],
          <span className="res-bg text-light">{danger.danger[i]}</span>,
          split[1]
        );
      } else {
        content.push(split[0], danger.danger[i]);
        textToAudit = split[1];
      }
    }
  } catch (err) { }

  return (
    <div className="container" id="container">
      <div className="row justify-content-center text-center h-100 m-0 p-0">
        {danger ?
          <div className={`row p-3`}>
            <div className="col-3 col-md-2 res-bg text-light py-4 my-2 rounded-corners-left shadow">
              <div className="my-auto">
                <h1 className="font-weight-bold">
                  <u className="id">{key}</u>
                </h1>
              </div>
            </div>
            <div className="col-9 col-md-10 bg-light py-4 my-2 rounded-corners-right text-left shadow">
              <p className="my-auto">{danger.text}</p>
            </div>
          </div>

          : <></>}
        {sentences.length > 0 ?
          <>
            <div className="w-100 text-center my-2 py-2 text-muted">
              <u onClick={() => toggleView(!viewRest)}>{viewRest ? "Hide context" : "Show context"}</u>
            </div>
            <div className={`${viewRest ? "" : "d-none"} w-100 text-center my-2 py-2 text-muted`}>
              {sentences.map(function (sentence, i) {
                return <p key={i}>{sentence}</p>;
              })}
            </div>
          </>
          : <></>
        }
      </div>
    </div>
  );
}
