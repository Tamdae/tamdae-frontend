import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import novelService from "../../services/novel.service";
import INovel from "../../types/novel.type";
import chapterService from "../../services/chapter.service";
import { Row } from "react-bootstrap";
import IChapter from "../../types/chapter.type";

export function Chapter() {
  const { slug, chapterid } = useParams();
  const [chapter, setChapter] = useState({
    "_id": null,
    "novel_id": null,
    "author_id": null,
    "datetime": "",
    "title": "",
    "content": ""
  });


  // executed only once!
  useEffect(() => {
    if (typeof slug !== "undefined" && typeof chapterid !== "undefined") {
      chapterService.get_novel_chapter(slug, chapterid).then(
        // novelService.get_novel(slug.split("_")[1]).then(
        response => {
          setChapter({
            "_id": response.data._id,
            "novel_id": response.data.novel_id,
            "author_id": response.data.author_id,
            "datetime": response.data.datetime,
            "title": response.data.title,
            "content": response.data.content
          });
        },
        error => {
        }
      );

    } else if (typeof slug !== "undefined" && typeof chapterid == "undefined") {
      novelService.get_novel(slug).then(
        // novelService.get_novel(slug.split("_")[1]).then(
        response => {
          setChapter({
            "_id": null,
            "novel_id": response.data._id,
            "author_id": response.data.author_id,
            "datetime": "",
            "title": "",
            "content": ""
          });
        },
        error => {
        }
      );

    }

  }, [slug, chapterid]);

  return (
    <div className="container">
      <h1 className="section-title text-left">Novelas</h1>
      <header id="main" className="jumbotron">
        <h3>{chapter.title}</h3>
        {chapter.content}
      </header>
    </div>
  );

}
