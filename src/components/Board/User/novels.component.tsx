import { Component } from "react";
import EventBus from "../../../common/EventBus";
import novelService from "../../../services/novel.service";
import INovel from "../../../types/novel.type";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

type Props = {};

type State = {
  content: INovel[];
}

export default class NovelsBoard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    novelService.getNovelsContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }
  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h2>User</h2>
        </header>
        <Row xs={1} md={2} className="g-4">
          {this.state.content.map(novel => (
            <Col>
              <Card>
                <Link to={"/novel/"+novel.slug+"_"+novel._id.$oid+"/edit"}>
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

      </div >
    );
  }
}
