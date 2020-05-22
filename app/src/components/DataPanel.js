import React, { Fragment, useState } from "react";
import axiosCall, { api_key } from "../hooks/nasaCall";
import defaultImg from "../images/gradient.jpeg";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

  if (loading) return "null";
  if (error) return "null";

  {
    console.log(data);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          id="picker"
          name="date"
          min="1970-01-01"
          max={getFormattedDate(new Date())}
          onChange={handleChange}
        />
        <button type="submit">Explore</button>
      </form>
      <Card>
        <div className="img">
          {data?.media_type === "image" ? (
            <img src={data?.url} alt={data.title} />
          ) : (
            <img src={defaultImg} />
          )}
        </div>
        <CardContent>
          <CardActionArea>
            <Typography gutterBottom variant="h5" component="h2">
              {data?.media_type === "image" ? (
                <p>{data.title}</p>
              ) : (
                <p>Details</p>
              )}
            </Typography>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography
                paragraph
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {data != null ? <p>{data.explanation}</p> : <p></p>}
              </Typography>
            </Collapse>
          </CardActionArea>
        </CardContent>
      </Card>
    </div>
  );
};
export default DataPanel;
