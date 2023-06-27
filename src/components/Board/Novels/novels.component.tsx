import React, { useEffect, useState } from 'react';
import novelService from '../../../services/novel.service';
import AuthService from "../../../services/auth.service";
import INovel from '../../../types/novel.type';
import "./style.scss";
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IUser from '../../../types/user.type';

interface NovelListProps {
  // No props required in this case
}

const NovelsBoard: React.FC<NovelListProps> = () => {
  const [novels, setNovels] = useState<INovel[]>([]);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const novelsData = await novelService.getNovelsContent();
        setNovels(novelsData.data as INovel[]); // Apply type assertion to the response data
      } catch (error) {
        console.error('Error fetching novels:', error);
      }
    };

    fetchNovels().catch((error) => {
      console.error('Error fetching novels:', error);
    });

    setUser(AuthService.getCurrentUser());
  }, []);


  return (
    <main role="main" className="container-fluid">
      <div className="container">
        <div className="d-flex justify-content-between">
          <h2 className="section-title text-center">Novelas de {user?.username}</h2>
          <Link to={"/novel/new"}>Nueva Novela</Link>
        </div>

        <div className="row mx-2"></div>
        {novels.map((novel) => (
          <div className="col-12 col-md-6" key={novel._id}>
            <div className="card my-2">
              <div className="row no-gutters">
                <div className="col-5 col-sm-3 col-lg-2">
                  <Link to={"/novel/" + novel._id.$oid + "/edit"}><img src="https://novelasweb.es/wn_upload/novels/3.jpeg" className="card-img" alt="100%x120" data-holder-rendered="true" /></Link>
                </div>
                <div className="col-7 col-sm-9 col-lg-10">
                  <div className="card-body">
                    <div>
                      <div className="row">
                        <div className="col-12">
                          <h5 className="card-title">
                            <Link to={"/novel/" + novel._id.$oid + "/edit"}>{novel.title}</Link>
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="card-text list">
                      {novel.description}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between">
                  <Link to={"/novel/" + novel._id.$oid + "/new"}>Añadir Capítulo</Link>
                  <Link to={"/novel/" + novel._id.$oid + "/edit"}><span className="material-icons">create</span></Link>
                </div>
              </div>
            </div>
          </div>

        ))}
      </div>
    </main>
  );
};

export default NovelsBoard;