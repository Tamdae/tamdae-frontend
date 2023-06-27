import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import chapterService from "../../../services/chapter.service";
import Row from 'react-bootstrap/Row';
import EditorComponent from "../../WysiwygEditor";
import novelService from "../../../services/novel.service";

export function BoardChapter() {
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

  const submit = (e: {
    target: any; preventDefault: () => void;
  }) => {
    e.preventDefault()
    chapterService.create_chapter(e.target.title.value, e.target.editor.value, chapter.novel_id)
      .then(response => {
        // Code to execute after the novel is successfully created
        window.location.href = '/novel/' + response.data.insertedId.$oid + "/edit";
        // console.log('Novel created successfully:', response.data);
      })
      .catch((error) => {
        // Code to handle any errors that occurred during the creation
        console.error('Error creating the chapter:', error);
      });

  }

  return (
    <div className="container">
      <h1 className="section-title text-left">Novelas</h1>
      <header className="jumbotron">
        <form onSubmit={submit}>
          <div>
            <div className="form-group">
              <label htmlFor="title"> Title </label>
              <input name="title" type="text" defaultValue={chapter.title} className="form-control" />
            </div>

            <div className="form-group">

              <textarea id="editor"></textarea>
              {/* <EditorComponent /> */}
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


