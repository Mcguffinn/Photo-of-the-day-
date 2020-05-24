import React from "react";
import "./css/App.css";
import defaultImg from "./images/gradient.jpeg";
import DataPanel from "./components/DataPanel";
import { Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";

function App() {
  return (
    <Container
      className="container"
      fixed
      style={{ backgroundImage: defaultImg }}
    >
      <Card className="container">
        <div>
          <div className="bg">
            <span className="title">
              <h1>Explore the Stars</h1>
            </span>
            <div className="cta">
              <p className="text">
                This is a simple implementation of nasa's
                <a href="https://api.nasa.gov/" target="APOD">
                  {" APOD "}
                </a>
                api. Enjoy browsing the dataset.
              </p>
              <DataPanel />
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
}

export default App;
