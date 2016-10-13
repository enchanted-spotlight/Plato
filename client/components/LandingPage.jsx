import React from 'react';
import { Row, Col } from 'react-materialize';


const loginButtonStyle = {
  height: '32px',
  width: '32px',
  border: '0',
  background: 'transparent'
};

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
                <span className="card-title">Clarabelle</span>
                <p className="orange-text medium italic">Software Engineer</p>
              </div>
              <div className="card-action">
                <a href="https://github.com/ClarabelleCheng-Yue" >
                  <img role="presentation" style={loginButtonStyle} src="./styles/images/github_icon.png" />
                </a>
                <a href="https://www.linkedin.com/in/cachengyue" >
                  <img role="presentation" style={loginButtonStyle} src="./styles/images/linkedin_icon.png" />
                </a>
              </div>
            </div>
          </div>
          <div className="col s3">
            <div className="card white">
              <img role="presentation" className="responsive-img" src="/../styles/images/jon.jpg" />
              <div className="card-content">
                <span className="card-title">Jon</span>
                <p className="orange-text medium italic">Software Engineer</p>
              </div>
              <div className="card-action">
                <a href="https://github.com/jon-is-learning" >
                  <img role="presentation" style={loginButtonStyle} src="./styles/images/github_icon.png" />
                </a>
                <a href="https://www.linkedin.com/in/jon-garrett-47b63621" >
                  <img role="presentation" style={loginButtonStyle} src="./styles/images/linkedin_icon.png" />
                </a>
              </div>
            </div>
          </div>
          <div className="col s3">
            <div className="card white">
              <img role="presentation" className="responsive-img" src="/../styles/images/joejoe.jpg" />
              <div className="card-content">
                <span className="card-title">Joseph</span>
                <p className="orange-text medium italic">Software Engineer</p>
              </div>
              <div className="card-action">
                <a href="https://github.com/YOO629" >
                  <img role="presentation" style={loginButtonStyle} src="./styles/images/github_icon.png" />
                </a>
                <a href="https://www.linkedin.com/in/joeyu629" >
                  <img role="presentation" style={loginButtonStyle} src="./styles/images/linkedin_icon.png" />
                </a>
              </div>
            </div>
          </div>
          <div className="col s3">
            <div className="card white">
              <img role="presentation" className="responsive-img" src="/../styles/images/dan.jpg" />
              <div className="card-content">
                <span className="card-title">Dan</span>
                <p className="orange-text medium italic">Software Engineer</p>
              </div>
              <div className="card-action">
                <a href="https://github.com/DanCSnyder" >
                  <img role="presentation" style={loginButtonStyle} src="./styles/images/github_icon.png" />
                </a>
                <a href="https://www.linkedin.com/in/daniel-snyder-a3674594" >
                  <img role="presentation" style={loginButtonStyle} src="./styles/images/linkedin_icon.png" />
                </a>
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
          </div>
        </div>
      </footer>
    </div>
  </div>


);

export default LandingPage;
