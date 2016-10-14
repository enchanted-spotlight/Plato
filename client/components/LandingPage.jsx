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
      <div>
        <div className="topContainer">
          <div>
            <h1 className="title center-align">Plato</h1>
            <h3 className="center-align">The new note-taking experience</h3>
          </div>
        </div>
        <div className="outerContainer">
          <div className="container innerContainer">
            <div className="row innerContainer">
              <div className="col s4 innerContainer valign-wrapper center-align">
                <div className="container">
                  <i className="medium material-icons">settings_remote</i>
                  <p> Tired of typing your notes? Let our speech to text editor do the heavy lifting for you. </p>
                </div>
              </div>
              <div className="col s4 innerContainer valign-wrapper center-align">
                <div className="container">
                  <i className="medium material-icons">picture_in_picture</i>
                  <p> Can't put your thoughts into words? Use our infinite canvas to draw them instead. </p>
                </div>
              </div>
              <div className="col s4 innerContainer valign-wrapper center-align">
                <div className="container">
                  <i className="medium material-icons">message</i>
                  <p>Need clarification? Use the class chat feature to share insights and problems.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row container">
          <h2 className="center-align"> Meet Us: </h2>
          <div className="col s3">
            <div className="card white">
              <img role="presentation" className="responsive-img" src="/../styles/images/cbelle.jpg" />
              <div className="card-content">
                <p className="center-align names">Clarabelle Cheng-Yue</p>
                <p className="orange-text medium italic center-align jobdesc">Software Engineer</p>
              </div>
              <div className="card-action">
                <Row>
                  <Col s={2} offset="s2">
                    <a href="https://github.com/ClarabelleCheng-Yue" >
                      <img role="presentation" style={loginButtonStyle} src="./styles/images/github_icon.png" />
                    </a>
                  </Col>
                  <Col s={4} offset="s2">
                    <a href="https://www.linkedin.com/in/cachengyue" >
                      <img role="presentation" style={loginButtonStyle} src="./styles/images/linkedin_icon.png" />
                    </a>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div className="col s3">
            <div className="card white">
              <img role="presentation" className="responsive-img" src="/../styles/images/jon.jpg" />
              <div className="card-content">
                <p className="center-align names">Jon Garrett</p>
                <p className="orange-text medium italic center-align jobdesc">Software Engineer</p>
              </div>
              <div className="card-action">
                <Row>
                  <Col s={2} offset="s2">
                    <a href="https://github.com/jon-is-learning" >
                      <img role="presentation" style={loginButtonStyle} src="./styles/images/github_icon.png" />
                    </a>
                  </Col>
                  <Col s={4} offset="s2">
                    <a href="https://www.linkedin.com/in/jon-garrett-47b63621" >
                      <img role="presentation" style={loginButtonStyle} src="./styles/images/linkedin_icon.png" />
                    </a>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div className="col s3">
            <div className="card white">
              <img role="presentation" className="responsive-img" src="/../styles/images/joejoe.jpg" />
              <div className="card-content">
                <p className="center-align names">Joe-Joe Yu</p>
                <p className="orange-text medium italic center-align jobdesc">Software Engineer</p>
              </div>
              <div className="card-action">
                <Row>
                  <Col s={2} offset="s2">
                    <a href="https://github.com/YOO629" >
                      <img role="presentation" style={loginButtonStyle} src="./styles/images/github_icon.png" />
                    </a>
                  </Col>
                  <Col s={4} offset="s2">
                    <a href="https://www.linkedin.com/in/joeyu629" >
                      <img role="presentation" style={loginButtonStyle} src="./styles/images/linkedin_icon.png" />
                    </a>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div className="col s3">
            <div className="card white">
              <img role="presentation" className="responsive-img" src="/../styles/images/dan.jpg" />
              <div className="card-content">
                <p className="center-align names">Dan Snyder</p>
                <p className="orange-text medium italic center-align jobdesc">Software Engineer</p>
              </div>
              <div className="card-action">
                <Row>
                  <Col s={2} offset="s2">
                    <a href="https://github.com/DanCSnyder" >
                      <img role="presentation" style={loginButtonStyle} src="./styles/images/github_icon.png" />
                    </a>
                  </Col>
                  <Col s={2} offset="s2">
                    <a href="https://www.linkedin.com/in/daniel-snyder-a3674594" >
                      <img role="presentation" style={loginButtonStyle} src="./styles/images/linkedin_icon.png" />
                    </a>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="page-footer light-blue darken-2">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2016 MIT License
          </div>
        </div>
      </footer>
    </div>
  </div>

);

export default LandingPage;
