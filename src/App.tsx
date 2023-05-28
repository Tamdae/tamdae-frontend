import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./styles/App.css";
import Login from "./components/Auth/login.component";
import Register from "./components/Auth/register.component";
import Home from "./components/Home/home.component";
import Novels from "./components/Novels/novels.component";
import Profile from "./components/Profile/profile.component";
import Navigation from "./components/Navigation/navigation.component";
import NotFound from "./components/NotFound/404.component";
import BoardNovels from "./components/Board/User/novels.component";
import BoardModerator from "./components/Board/moderator.component";
import BoardAdmin from "./components/Board/admin.component";
import { Novel } from "./components/Novel/novel.component";
import { BoardNovel } from "./components/Board/User/novel.component";



class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/novels" element={<Novels />} />
            <Route path="/novel/:slug/edit" element={<BoardNovel />} />
            <Route path="/novel/:slug" element={<Novel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my/novels" element={<BoardNovels />} />
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