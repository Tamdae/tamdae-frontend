import { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import IUser from '../../types/user.type';
import EventBus from "../../common/EventBus";

type Props = {};

type State = {
  isModerator: boolean,
  isAdmin: boolean,
  currentUser: IUser | undefined
}

class Navigation extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      isModerator: false,
      isAdmin: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        isModerator: user.roles.includes("ROLE_MODERATOR"),
        isAdmin: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      isModerator: false,
      isAdmin: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, isModerator: isModerator, isAdmin: isAdmin } = this.state;
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="navbar-brand"><Link to={"/"}>ANovelSite</Link></li>
          </ul>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item"><Link className="nav-link" to={"/"}>Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link" to={"/novels"}>Novelas</Link></li>
            </ul>

            {currentUser ? (
              <ul className="navbar-nav my-lg-0">
                {(isModerator || isAdmin) && (
                  <li className="nav-item"><Link className="nav-link" to={"/my/novels"}>My Novels</Link></li>
                )}
                <li className="nav-item"><Link className="nav-link" to={"/profile"}>{currentUser.username}</Link></li>
                <li className="nav-item"><span className="nav-link" onClick={this.logOut}>LogOut</span></li>
              </ul>
            ) : (
              <ul className="navbar-nav my-lg-0">
                <li className="nav-item"><Link className="nav-link" to={"/login"}>Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to={"/register"}>Sign Up</Link></li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;