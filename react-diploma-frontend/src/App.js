import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CatalogPage from "./pages/CatalogPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Layout from "./components/Layout";
import About from "./pages/About";
import Error404 from "./pages/Error404";
import ContactsPage from "./pages/ContactsPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/catalog/:id" component={ProductPage} />
          <Route path="/catalog" component={CatalogPage} />
          <Route path="/about" component={About} />
          <Route path="/contacts" component={ContactsPage} />
          <Route path="/cart" component={CartPage} />
          <Route exact path="/" component={HomePage} />
          <Route component={Error404} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
