import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import novelService from "../../services/novel.service";
import INovel from "../../types/novel.type";
import chapterService from "../../services/chapter.service";
import { Row } from "react-bootstrap";

export function Novel() {
  const { slug } = useParams();
  const [novel, setNovel] = useState<INovel>({
    "_id": null,
    "author_id": null,
    "datetime": "",
    "title": "",
    "slug": "",
    "description": "",
    "chapters": [],
  });


  // executed only once!
  useEffect(() => {
    if (typeof slug !== "undefined") {
      novelService.get_novel(slug).then(
        // novelService.get_novel(slug.split("_")[1]).then(
        response => {
          chapterService.get_novel_chapters(slug).then(
            // novelService.get_novel(slug.split("_")[1]).then(
            rchap => {
              setNovel({
                "_id": response.data._id,
                "author_id": response.data.author_id,
                "datetime": response.data.datetime,
                "title": response.data.title,
                "description": response.data.description,
                "chapters": rchap.data
              });
            },
            error => {
            }
          );
        },
        error => {
        }
      );
    }
  }, [slug]);

  return (
    <div className="container">
      <h1 className="section-title text-left">Novelas</h1>
      <header id="main" className="jumbotron">
        <h3>{novel.title}</h3>
        {novel.description}
      </header>
      <Row xs={1} md={2} className="g-4">
        {novel.chapters && novel.chapters.map((chapter) => (
          <li key={chapter._id}><Link to={"/novel/"+chapter.novel_id.$oid+"/"+chapter._id.$oid}>{chapter.title}</Link></li>
        ))}
      </Row>
    </div>
  );

}
