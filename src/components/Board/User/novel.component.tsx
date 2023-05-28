import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import novelService from "../../../services/novel.service";
import INovel from '../../../types/chapter.type';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from "react";




export function BoardNovel() {
  const { slug } = useParams();
  const [novel, setNovel] = useState({
    "_id": null,
    "author_id": null,
    "datetime": "",
    "title": "",
    "description": ""
  });

  useEffect(() => {
    // console.log("executed only once!");
    if (typeof slug !== "undefined") {
      novelService.get_novel(slug.split("_")[1]).then(
        response => {
          setNovel({
            "_id": response.data._id,
            "author_id": response.data.author_id,
            "datetime": response.data.datetime,
            "title": response.data.title,
            "description": response.data.description
          });
        },
        error => {
        }
      );
    }
  }, [slug]);

  const submit = (e: {
    target: any; preventDefault: () => void;
  }) => {
    e.preventDefault()
    console.log(e.target.title.value, e.target.description.value)
  }

  return (
    <div className="container">
      <h1 className="section-title text-left">Novelas</h1>
      <header className="jumbotron">
        <form onSubmit={submit}>
          <div>
            <div className="form-group">
              <label htmlFor="title"> Title </label>
              <input name="title" type="text" defaultValue={novel.title} className="form-control" />
            </div>

            <div className="form-group">
              <textarea name="description" defaultValue={novel.description} ></textarea>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">Enviar</button>
            </div>
          </div>
        </form>
      </header>

      <Row xs={1} md={2} className="g-4">
        {/* {novel.chapters.map(chapters => (
            <p></p>
          ))} */}
        </Row>

    </div >
  );

}


