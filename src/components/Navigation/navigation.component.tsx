import { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../../services/auth.service";
import IUser from '../../types/user.type';
import EventBus from "../../common/EventBus";
import { Nav, Navbar, NavLink } from "react-bootstrap";

type Props = {};

type State = {
  showModeratorBoard: boolean,
  showAdminBoard: boolean,
  currentUser: IUser | undefined
}

class Navigation extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
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
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <Navbar fixed="top" collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Link to={"/"} className="navbar-brand">
          Tamdae
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" data-bs-toggle="collapse" data-bs-target="#navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <NavLink eventKey="1" as={Link} to={"/home"}>Inicio</NavLink>
            <NavLink eventKey="2" as={Link} to={"/novels"}>Novelas</NavLink>
          </Nav>
          {currentUser ? (
            <Nav className="d-flex">
              {showModeratorBoard && (<NavLink eventKey="1" as={Link} to={"/mod"}>Moderator Board</NavLink>)}
              {showAdminBoard && (<NavLink eventKey="2" as={Link} to={"/admin"}>Admin Board</NavLink>)}
              <NavLink eventKey="3" as={Link} to={"/my/novels"}>User</NavLink>
              <NavLink eventKey="4" as={Link} to={"/profile"}>{currentUser.username}</NavLink>
              <NavLink eventKey="5" onClick={this.logOut}>LogOut</NavLink>
            </Nav>
          ) : (
            <Nav className="d-flex">
              <NavLink eventKey="1" as={Link} to={"/login"}>Login</NavLink>
              <NavLink eventKey="2" as={Link} to={"/register"}>Sign Up</NavLink>
            </Nav>
          )};
        </Navbar.Collapse>
      </Navbar >
    );
  }
}

export default Navigation;