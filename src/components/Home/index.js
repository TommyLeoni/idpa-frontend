import { withTranslation, useTranslation } from "react-i18next";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import React, { useCallback, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { withAlert, useAlert } from "react-alert";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dropzone from "react-dropzone";
import LoadingModal from "./loading";
import "bootstrap/js/dist/modal";
import axios from "axios";
import "./home.css";
import {
  makeStyles,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  Tooltip,
  withStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(5),
    minWidth: 110,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    textAlign: "left",
  },
  infoIcon: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(1),
  },
}));

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#ffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const HomePage = (props) => {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [textFile, setTextFile] = useState(0);
  const [text, setText] = useState(0);
  const classes = useStyles();
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
      alert.error(t("alert.error"), {
        title: t("alert.title"),
      });
    }
  };

  return (
    <div className="container" id="container">
      <div className="row justify-content-center text-center h-100 m-0 p-0">
        <div className="col-10 my-auto">
          <h1 className="mb-0 mt-n3 font-weight-bold">{t("title")}</h1>
          <small className="text-muted">
            <em>{t("author")}</em>
          </small>
        </div>
        <div className="col-10 col-lg-6 my-auto">
          <TextField
            id="outlined-basic"
            helperText={t("tooltips.mainTextField")}
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
                  <p className="text-secondary my-auto">
                    {t("tooltips.dropping")}
                  </p>
                ) : textFile ? (
                  <p className="text-secondary my-auto overflow-hidden">
                    {textFile.name}
                  </p>
                ) : (
                  <p className="text-secondary my-auto">
                    {t("tooltips.dropzone")}
                  </p>
                )}
              </div>
            )}
          </Dropzone>
        </div>
        <div className="col-12">
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            {t("tooltips.submitButton")}
          </Button>
          <br />
          <FormControl className={classes.formControl}>
            <Select
              value={i18n.language}
              onChange={(event) => i18n.changeLanguage(event.target.value)}
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem name="Deutsch" value="de">
                Deutsch
              </MenuItem>
              <MenuItem name="English" value="en">
                English
              </MenuItem>
            </Select>
            <FormHelperText>{t("tooltips.langSwitcher")}</FormHelperText>
          </FormControl>
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">
                  {t("tooltips.langSwitcherInfoTitle")}
                </Typography>
                {t("tooltips.langSwitcherInfo")}
              </React.Fragment>
            }
            placement="right"
          >
            <InfoOutlinedIcon className={classes.infoIcon} />
          </HtmlTooltip>
          <LoadingModal show={showModal} />
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(withAlert()(withRouter(HomePage)));
