import React, { useState, useEffect } from "react";
import "./style.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../HomePage";
import Dashboard from "../Dashboard";
import Login from "../Login";
import Register from "../Register";
import firebase from "../firebase";

const theme = createMuiTheme();

export default function App() {
  const [FirebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then((val) => {
      setFirebaseInitialized(val);
    });
  });
  return FirebaseInitialized !== false ? (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  ) : (
    <div id="loader">CircularProgress</div>
  );
}
