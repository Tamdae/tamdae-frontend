import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import novelService from "../../services/novel.service";

export function Novel() {
  const { slug } = useParams();
  const [novel, setNovel] = useState({
    "_id": null,
    "author_id": null,
    "datetime": "",
    "title": "",
    "description": "",
  });


  // console.log("executed only once!");
  useEffect(() => {
    if (typeof slug !== "undefined") {
      novelService.get_novel(slug.split("_")[1]).then(
        response => {
          setNovel(response.data);
        },
        error => {
        }
      );
    } else { console.log("no slug provided"); }

  }, [slug]);

  return (
    <div className="container">
      <h1 className="section-title text-left">Novelas</h1>
      <header id="main" className="jumbotron">
        <h3>{novel.title}</h3>
        {novel.description}
      </header>
    </div>
  );

}
