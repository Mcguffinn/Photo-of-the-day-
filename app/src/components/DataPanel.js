import React, { Fragment, useState } from "react";
import axiosCall, { api_key } from "../hooks/nasaCall";
import defaultImg from "../images/gradient.jpeg";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const DataPanel = () => {
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
        <CardActionArea>
          <div className="img">
            {data?.media_type === "image" ? (
              <img src={data?.url} alt={data.title} />
            ) : (
              <img src={defaultImg} />
            )}
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data?.media_type === "image" ? (
                <p>{data.title}</p>
              ) : (
                <p>Details</p>
              )}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {data != null ? <p>{data.explanation}</p> : <p></p>}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
export default DataPanel;
