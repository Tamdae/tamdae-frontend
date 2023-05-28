import { Component } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import UserService from "../../services/novel.service";
import "./style.scss";
import INovel from '../../types/novel.type';
import { Link } from 'react-router-dom';

type Props = {};

type State = {
  content: INovel[];
}

export default class Novels extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    UserService.getNovelsContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          {/* <h3>{this.state.content}</h3> */}
        </header>
        <h1 className="section-title text-left">Novelas</h1>

        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Titulo" aria-label="Recipient's username" aria-describedby="basic-addon2" />
          <div className="input-group-append">
            <button className="btn btn-outline-default" type="button">Buscar</button>
          </div>
        </div>
        <Row xs={1} md={2} className="g-4">
        {this.state.content.map(novel => (
            <Col>
              <Card>
                <Link to={"/novel/"+novel.slug+"_"+novel._id.$oid}>
                  <Card.Body>
                    <Row xs={1} md={2}>
                      <Col sm="12" md="4">
                        <Card.Img variant="top" src="https://novelasweb.es/wn_upload/novels/3.jpeg" />
                      </Col>
                      <Col sm="12" md="8">
                        <Card.Title>{novel.title}</Card.Title>
                        <Card.Text>{novel.description}</Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
