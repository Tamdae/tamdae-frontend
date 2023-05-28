import { Component } from "react";
import novelService from "../../services/novel.service";
import INovel from '../../types/novel.type';

type Props = {};

type State = {
  content: INovel[];
}

export default class Home extends Component<Props, State> {
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
        <h2>Home</h2>
        {this.state.content.map(novel => (
        <h3>{novel.title}</h3>
      ))}
          
        </header>
      </div>
    );
  }
}
