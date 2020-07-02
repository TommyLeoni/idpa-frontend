import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Home/Home";
import ResultsPage from "./Results/Results";

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  setResults = (results) => {
    this.setState({
      results: results[0],
      orgContent: results[1]
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
              render={() => <ResultsPage results={this.state.results} orgContent={this.state.orgContent}/>}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Root;
