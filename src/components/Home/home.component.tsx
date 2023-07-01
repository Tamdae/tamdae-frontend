import React, { useEffect, useState } from 'react';
import novelService from '../../services/novel.service';
import INovel from '../../types/novel.type';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface NovelListProps {
  // No props required in this case
}

const Home: React.FC<NovelListProps> = () => {
  const [novels, setNovels] = useState<INovel[]>([]);

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const novelsData = await novelService.getLastNovels(10);
        setNovels(novelsData.data as INovel[]); // Apply type assertion to the response data
      } catch (error) {
        console.error('Error fetching novels:', error);
      }
    };

    fetchNovels();
  }, []);


  return (
    <main role="main" className="container-fluid">
      <div className="container-fluid">
        <h2 className="section-title text-left">Ultimas Novelas Añadidas</h2>
      </div>

      {novels && novels.map((novel) => (
        <div className="col-12 col-md-6" key={novel._id}>
          <div className="card my-2">
            <div className="row no-gutters">
              <div className="col-5 col-sm-3 col-lg-2">
                <Link to={"/novel/" + novel._id.$oid}>
                  <img src="https://novelasweb.es/wn_upload/novels/3.jpeg" className="card-img" alt="100%x120" data-holder-rendered="true" />
                </Link>
              </div>
              <div className="col-7 col-sm-9 col-lg-10">
                <div className="card-body">
                  <div>
                    <div className="row">
                      <div className="col-12">
                        <h5 className="card-title"><Link to={"/novel/" + novel._id.$oid}>{novel.title}</Link></h5>
                      </div>
                      <div className="col-12 col-lg-4 text-star">
                      </div>
                    </div>
                  </div>
                  <div className="card-text list">
                    {novel.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
      }
    </main >

  );
};

export default Home;