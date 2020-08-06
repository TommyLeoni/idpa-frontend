import React, { useCallback, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dropzone from "react-dropzone";
import LoadingModal from "./loading";
import "bootstrap/js/dist/modal";
import axios from "axios";
import "./home.css";
import { withAlert, useAlert } from "react-alert";

const HomePage = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [textFile, setTextFile] = useState(0);
  const [text, setText] = useState(0);
  const alert = useAlert();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles) {
      setTextFile(acceptedFiles[0]);
    }
  }, []);

  const handleSubmit = () => {
    if (text) {
      setShowModal(true);
      axios
        .post(
          "http://127.0.0.1:5000/api/textRawUpload", //"https://idpa-t04-backend.herokuapp.com/api/textRawUpload",
          { content: text },
          { headers: { "Access-Control-Allow-Origin": "*" } }
        )
        .then(async (res) => {
          setShowModal(false);
          await props.setResults(res.data);
          props.history.push("/results");
        });
    } else if (textFile) {
      setShowModal(true);
      var formData = new FormData();
      formData.append("file", textFile);
      axios
        .post(
          "http://127.0.0.1:5000/api/textFileUpload", //"https://idpa-t04-backend.herokuapp.com/api/textFileUpload",
          formData
        )
        .then(async (res) => {
          setShowModal(false);
          props.setResults(res.data);
          props.history.push("/results");
        });
    } else {
      alert.error(
        "Bitte versichern Sie sich den Text in einer der beiden Form angegeben zu haben und versuchen Sie gerne erneut.",
        {
          title: "Es ist weder Text noch eine Text-Datei vorhanden",
        }
      );
    }
  };

  return (
    <div className="container" id="container">
      <div className="row justify-content-center text-center h-100 m-0 p-0">
        <div className="col-10 my-auto">
          <h1 className="mb-0 mt-n3 font-weight-bold">AGB Analyzer</h1>
          <small className="text-muted">
            <em>by Tomaso Leoni</em>
          </small>
        </div>
        <div className="col-6 my-auto">
          <TextField
            id="outlined-basic"
            label="Geben Sie hier die AGBs ein oder kopieren Sie sie hierher"
            multiline
            rows={10}
            variant="outlined"
            onChange={(event) => setText(event.target.value)}
            fullWidth
          />
          <Dropzone onDrop={onDrop} accept={"text/plain"}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                className="grabbing w-50 mt-5 py-3 px-2 border rounded dropzone-border text-center d-inline-block "
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <AddIcon color="disabled" fontSize="large" />
                {isDragActive ? (
                  <p className="text-secondary my-auto">Hierher ziehen ...</p>
                ) : textFile ? (
                  <p className="text-secondary my-auto overflow-hidden">
                    {textFile.name}
                  </p>
                ) : (
                  <p className="text-secondary my-auto">
                    Ziehen Sie Ihre Datei hierher
                  </p>
                )}
              </div>
            )}
          </Dropzone>
        </div>
        <div className="col-12">
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            absenden
          </Button>
          <LoadingModal show={showModal} />
        </div>
      </div>
    </div>
  );
};

export default withAlert()(withRouter(HomePage));
