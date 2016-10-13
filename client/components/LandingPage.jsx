import React from 'react';
import { Row, Col } from 'react-materialize';

const LandingPage = () => (
  <div>
    <div className="grey lighten-4">
      <div className="container">
              Plato
      </div>
      <div>
        <div className="row container">
          <div className="col s3">
            <div className="card white">
              <img role="presentation" className="responsive-img" src="/../styles/images/cbelle.jpg" />
              <div className="card-content">
                <span className="card-title">Cbelle</span>
                <p>Software Engineer</p>
              </div>
              <div className="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
              </div>
            </div>
          </div>
          <div className="col s3">
            <div className="card white">
              <img role="presentation" className="responsive-img" src="/../styles/images/jon.jpg" />
              <div className="card-content">
                <span className="card-title">Cbelle</span>
                <p>Software Engineer</p>
              </div>
              <div className="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
              </div>
            </div>
          </div>
          <div className="col s3">
            <div className="card white">
              <img role="presentation" className="responsive-img" src="/../styles/images/joejoe.jpg" />
              <div className="card-content">
                <span className="card-title">Cbelle</span>
                <p>Software Engineer</p>
              </div>
              <div className="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
              </div>
            </div>
          </div>
          <div className="col s3">
            <div className="card white">
              <img role="presentation" className="responsive-img" src="/../styles/images/dan.jpg" />
              <div className="card-content">
                <span className="card-title">Cbelle</span>
                <p>Software Engineer</p>
              </div>
              <div className="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Footer Content</h5>
              <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Links</h5>
              <ul>
                <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
          © 2014 Copyright Text
            <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
          </div>
        </div>
      </footer>
    </div>
  </div>


);

export default LandingPage;
