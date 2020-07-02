import React, { useState } from "react";
import "./results.css";
import { Fab, makeStyles } from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    margin: theme.spacing.unit, // You might not need this now
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
}));

function ResultsPage(props) {
  const [documentView, setDocumentView] = useState(false);
  const classes = useStyles();
  const items = props.results;
  const resultsList = auditedItems(items).map((d) => (
    <ResultTile
      key={items.indexOf(d)}
      content={d.text}
      danger={d.danger}
      id={items.indexOf(d) + 1}
    />
  ));

  return (
    <div className="container" id="container">
      <div className="row justify-content-center text-center h-100 m-0 p-0">
        <div
          className={`col-${documentView ? "4" : "10 my-auto"} overflow-auto`}
        >
          <h1 className="font-weight-bold my-5 display-4">Resultate</h1>
          {resultsList}
          <Fab
            color="secondary"
            aria-label="add"
            className={classes.fab}
            onClick={() => setDocumentView(!documentView)}
          >
            <DescriptionIcon />
          </Fab>
        </div>
        <div
          className={`${
            documentView ? "col-8" : "d-none"
          } overflow-auto justify-none`}
        >
          <h1 className="font-weight-bold my-5 display-4">
            Ursprünglicher Inhalt
          </h1>
          <div className="p-3 rounded-corners shadow bg-light my-3">
          {props.orgContent.split("\n").map((part) => (
            <p className="text-left m-1">{part}</p>
          ))}

          </div>
        </div>
      </div>
    </div>
  );
}

function ResultTile(props) {
  var content = [];
  var textToAudit = props.content;

  for (var i = 0; i < props.danger.length; i++) {
    const split = textToAudit.split(props.danger[i]);
    if (i === props.danger.length - 1) {
      content.push(
        split[0],
        <span className="res-bg text-light">{props.danger[i]}</span>,
        split[1]
      );
    } else {
      content.push(split[0], props.danger[i]);
      textToAudit = split[1];
    }
  }

  return (
    <div className="row p-3">
      <div className="col-3 col-md-2 res-bg text-light py-4 my-2 rounded-corners-left shadow">
        <div className="my-auto">
          <h1 className="font-weight-bold">
            <u className="id">{props.id}</u>
          </h1>
        </div>
      </div>
      <div className="col-9 col-md-10 bg-light py-4 my-2 rounded-corners-right text-left shadow">
        <p className="my-auto">{content}</p>
      </div>
    </div>
  );
}

function auditedItems(items) {
  for (var i = 0; i < items.length - 1; i++) {
    if (items[i].text === items[i + 1].text) {
      items[i].danger.push(items[i + 1].danger);
      items.splice(i, 1);
    }
  }
  return items;
}

export default ResultsPage;
