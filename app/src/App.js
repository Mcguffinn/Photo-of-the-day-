import React from "react";
import "./App.css";
import defaultImg from "./images/gradient.jpeg";
import DataPanel from "./components/DataPanel";
import { Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";

function App() {
  // if (loading) return "null";
  // if (error) return <img src={defaultImg}/>;
  // if(!data) return <img src={defaultImg}/>;
  // const isImageValid = data?.url && data?.media_type === "image";
  // const isVideoValid = data?.url && data?.media_type === "mp3";

  return (
    <Container fixed>
      <Card>
        <div className="container" style={{ backgroundImage: defaultImg }}>
          <div className="bg">
            <span className="title">
              <h1>Call to the Stars</h1>
            </span>
            <div>
              <p>
                This is a simple implementation of nasa's
                <a href="https://api.nasa.gov/">nasaAPOD</a> api. Enjoy browsing
                the dataset.
              </p>
            </div>
            <DataPanel />
          </div>
        </div>
      </Card>
    </Container>
  );
}

export default App;
