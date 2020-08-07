import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/Home/";
import ResultsPage from "./components/Results/";

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  setResults = (results) => {
    this.setState({
      results: results,
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <HomePage setResults={this.setResults} />}
            />
            <Route
              path="/results"
              render={() => <ResultsPage results={this.state.results} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Root;
