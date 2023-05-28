import { RouteComponentProps } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Novel {
  id: number;
  title: string;
  author: string;
}

interface Chapter {
  id: number;
  title: string;
}

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const Novel: React.FC<Props> = ({ match }) => {
  const [novel, setNovel] = useState<Novel>({ id: 0, title: "", author: "" });
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    const getNovel = async () => {
      const novelId = parseInt(match.params.id);
      const novelResponse = await axios.get<Novel>(`/novels/${novelId}`);
      setNovel(novelResponse.data);
      const chapterResponse = await axios.get<Chapter[]>(`/chapters?novelId=${novelId}`);
      setChapters(chapterResponse.data);
    };
    getNovel();
  }, [match.params.id]);

  return (
    <div>
      <h1>{novel.title}</h1>
      <p>{novel.author}</p>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter.id}>{chapter.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Novel;