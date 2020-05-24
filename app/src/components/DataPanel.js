import React, { useState } from "react";
import "../css/DataPanel.css";
import axiosCall, { api_key } from "../hooks/nasaCall";
import defaultImg from "../images/gradient.jpeg";
import clsx from "clsx";
import * as core from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Image, { Shimmer } from "react-shimmer";

function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const dropdown = makeStyles((theme) => ({
  expand: {
    transfrom: "rotate(90deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const DataPanel = () => {
  const classes = dropdown();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [config, setconfig] = useState({
    method: "GET",
    url: "/planetary/apod",
    params: {
      date: getFormattedDate(new Date()),
      api_key,
    },
  });

  const [{ data, loading, error }, api] = axiosCall(config, { manual: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    api(config);
  };

  const handleChange = (e) => {
    setconfig({
      method: "GET",
      url: "/planetary/apod",
      params: {
        date: e.target.value,
        api_key,
      },
    });
  };

  if (loading)
    // <--- Testing new loading library react shimmer
    return <Image src="https://example.com/test.jpg" fallback={<Shimmer />} />;
  if (error) return "null";

  return (
    <div className="calendar">
      <form className={classes.container} onSubmit={handleSubmit} noValidate>
        <core.TextField
          type="date"
          id="picker"
          name="date"
          min="1970-01-01"
          className={classes.textField}
          max={getFormattedDate(new Date())}
          onChange={handleChange}
        />
        <core.Button
          type="submit"
          disableElevation
          variant="contained"
          color="primary"
        >
          Explore
        </core.Button>
      </form>
      <core.Card>
        <div className="img">
          {data?.media_type === "image" ? (
            <Image src={data?.url} alt={data.title} fallback={<Shimmer />} />
          ) : (
            <Image src={defaultImg} alt="background" fallback={<Shimmer />} />
          )}
        </div>
        <core.CardContent>
          <core.CardActionArea>
            <core.Typography gutterBottom variant="h5" component="h2">
              {data?.media_type === "image" ? (
                <p>{data.title}</p>
              ) : (
                <p>Details</p>
              )}
            </core.Typography>
            <core.IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </core.IconButton>
            <core.Collapse in={expanded} timeout="auto" unmountOnExit>
              <core.Typography
                paragraph
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {data != null ? <p>{data.explanation}</p> : <p></p>}
              </core.Typography>
            </core.Collapse>
          </core.CardActionArea>
        </core.CardContent>
      </core.Card>
    </div>
  );
};
export default DataPanel;
