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
import BoardNovels from "./components/Board/Novels/novels.component";
import { Novel } from "./components/Novel/novel.component";
import { BoardNovel } from "./components/Board/Novel/novel.component";
import { BoardChapter } from "./components/Board/Chapter/chapter.component";
import { Chapter } from "./components/Chapter/chapter.component";



class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Novels Page */}
            <Route path="/novels" element={<Novels />} />
            {/* Novel Page */}
            <Route path="/novel/:slug" element={<Novel />} />
            {/* Edit Novel Page */}
            <Route path="/novel/:slug/edit" element={<BoardNovel />} />
            {/* New Novel Page */}
            <Route path="/novel/new" element={<BoardNovel />} />
            {/* Chapter Page */}
            <Route path="/novel/:slug/:chapterid" element={<Chapter />} />
            {/* Edit Novel Page */}
            <Route path="/novel/:slug/:chapterid/edit" element={<BoardChapter />} />
            {/* New Novel Page */}
            <Route path="/novel/:slug/new" element={<BoardChapter />} />
            {/* Novel */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my/novels" element={<BoardNovels />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;