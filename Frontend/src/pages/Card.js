import React from 'react';
import img1 from "./images/image1.jpg";
import img2 from "./images/image2.jpg";
import img3 from "./images/image3.jpg";
import "./card.css";

import 'bootstrap/dist/css/bootstrap.min.css';

function Cards() {
  return (
    <section id='CARD'>
      <div className='cards'>
        <h1 className="text-center text-light ">Welcome to our services</h1>
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <div className="card">
                <img src={img1} className="card-img-top" height="250" alt="" />
                <div className="card-body" >
                  <h5 className="card-title">Weather Forecast</h5>
                  <p className="card-text">Keep track of weather conditions for disaster.</p>
                  <a href="/weather" className="btn btn-primary" style={{ backgroundColor: "#0F6292" }}>Click here</a>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <img src={img2} className="card-img-top" height="250" alt="" />
                <div className="card-body" >
                  <h5 className="card-title">Disaster Relief</h5>
                  <p className="card-text">Gain access to the severity of a disaster with the damage location</p>
                  <a href="/storeSection" className="btn btn-primary" style={{ backgroundColor: "#0F6292" }}>Click here</a>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <img src={img3} className="card-img-top" height="250" alt="" />
                <div className="card-body" >
                  <h5 className="card-title">Satellite Map</h5>
                  <p className="card-text">Access satellite map to upload data to disaster relief</p>
                  <a href="/localcrops" className="btn btn-primary" style={{ backgroundColor: "#0F6292" }}>Click here</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cards;
