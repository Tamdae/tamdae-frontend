import { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

import Login from "./components/Auth/login.component";
import Register from "./components/Auth/register.component";
import Home from "./components/Home/home.component";
import Profile from "./components/Profile/profile.component";
import BoardUser from "./components/Board/user.component";
import BoardModerator from "./components/Board/moderator.component";
import BoardAdmin from "./components/Board/admin.component";
import Navigation from "./components/Navigation/navigation.component";
import NotFound from "./components/NotFound/404.component";



class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;