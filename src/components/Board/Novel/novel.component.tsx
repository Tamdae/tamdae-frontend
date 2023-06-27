import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import novelService from "../../../services/novel.service";
import Row from 'react-bootstrap/Row';
import EditorComponent from "../../WysiwygEditor";
import chapterService from "../../../services/chapter.service";
import IChapter from '../../../types/chapter.type';
import INovel from "../../../types/novel.type";

export function BoardNovel() {
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

  const submit = (e: {
    target: any; preventDefault: () => void;
  }) => {
    e.preventDefault()
    novelService.create_novel(e.target.title.value, e.target.editor.value)
      .then(response => {
        // Code to execute after the novel is successfully created
        window.location.href = '/novel/' + response.data.insertedId.$oid + "/edit";
        // console.log('Novel created successfully:', response.data);
      })
      .catch((error) => {
        // Code to handle any errors that occurred during the creation
        console.error('Error creating the novel:', error);
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
              <input name="title" type="text" defaultValue={novel.title} className="form-control" />
            </div>

            <div className="form-group">
              <textarea id="editor">{novel.description}</textarea>
              {/* <EditorComponent /> */}
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">Enviar</button>
            </div>
          </div>
        </form>
      </header>

      <Row xs={1} md={2} className="g-4">
        {novel.chapters && novel.chapters.map((chapter) => (
          <li key={chapter._id}><Link to={"/novel/"+chapter.novel_id.$oid+"/"+chapter._id.$oid+"/edit"}>{chapter.title}</Link></li>
        ))}
      </Row>

    </div >
  );

}


