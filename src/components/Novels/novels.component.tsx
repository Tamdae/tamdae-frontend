import React, { useEffect, useState } from 'react';
import novelService from '../../services/novel.service';
import AuthService from "../../services/auth.service";
import INovel from '../../types/novel.type';
import "./style.scss";
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IUser from '../../types/user.type';

interface NovelListProps {
  // No props required in this case
}

const NovelList: React.FC<NovelListProps> = () => {
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
        <h1 className="section-title text-left">Novelas</h1>

        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Titulo" aria-label="Recipient's username" aria-describedby="basic-addon2" />
          <div className="input-group-append">
            <button className="btn btn-outline-default" type="button">Buscar</button>
          </div>
        </div>
        {novels.map((novel) => (
          <div className="card my-2" key={novel._id}>
            <div className="row no-gutters">
              <div className="col-12 col-sm-3 col-lg-2">
                <Link to={"/novel/" + novel._id.$oid}><img src="https://novelasweb.es/wn_upload/novels/3.jpeg" className="card-img" alt="100%x120" data-holder-rendered="true" /></Link>
              </div>
              <div className="col-12 col-sm-9 col-lg-10">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 col-lg-8">
                      <h5 className="card-title">
                        <Link to={"/novel/" + novel._id.$oid}>{novel.title}</Link>
                      </h5>
                    </div>
                    <div className="col-12 col-lg-4 text-star">
                      <span>
                        <i className="material-icons">star</i>
                        <i className="material-icons">star</i>
                        <i className="material-icons">star</i>
                        <i className="material-icons">star_half</i>
                        <i className="material-icons">star_border</i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-8">
                    <div className="small smallText my-2">
                      <Link to={"/cat/" + 1} type="button" className="btn btn-outline-default btn-sm mb-1">categoria</Link>
                    </div>
                  </div>
                  <div className="col-12 col-lg-8">
                    <div className="card-text list">
                      {novel.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-12 col-lg-6">
                  <span className="sn-new-mark">NUEVO CAPÍTULO</span>
                  <small className="text-muted">
                    <a className="text-muted">
                      last chapter</a>
                  </small>
                </div>
                <div className="col-12 col-lg-6 pub">
                  <small className="text-muted">
                    59 minutes ago
                  </small>
                  <small className="spr"></small>
                  <small className="text-muted">
                    Status: Ongoing
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default NovelList;