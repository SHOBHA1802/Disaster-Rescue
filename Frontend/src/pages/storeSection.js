import React, { useState } from "react";
import Navbar from "./Navbar.js";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer.js";
import axios from 'axios';

function Storesmap() {
  const [profile, setProfile] = useState(0);
  const [imageResponse, setImageResponse] = useState(null);
  const [noDamage, setNoDamage] = useState([]);
  const [minorDamage, setMinorDamage] = useState([]);
  const [majorDamage, setMajorDamage] = useState([]);
  const [destroyed, setDestroyed] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    e.preventDefault()
    const fileblob = new Blob([e.target.files[0]], { type: 'image/png' });// WORKS much better (if you know what MIME type you want.
    let data = new FormData();
    data.append('file', fileblob);
    try {
      let response = await axios.post('http://127.0.0.1:5000/', data, { headers: { 'Content-Type': 'multipart/form-data' } })
      setImageResponse(response.data.img_data_url);
      setNoDamage(response.data.no_damage);
      setMinorDamage(response.data.minor_damage);
      setMajorDamage(response.data.major_damage);
      setDestroyed(response.data.destroyed);
    }
    catch (e) {
      console.log(e)
    }
  };

  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap"
        rel="stylesheet"
      ></link>
      <Navbar profile={profile} setProfile={setProfile} show={1} />
      <h1> Upload disaster satellite image for disaster relief</h1>
      <form >
        <input type="file" accept=".png,.jpg" onChange={handleFileChange} />
        <button type="submit" onClick={(e) => e.preventDefault()}>Submit</button>
      </form>
      {imageResponse && <img src={imageResponse} alt="Predicted Image" style={{ display: 'block', margin: '0 auto', width: '50%' }} />}
      <div>
        <h2>No Damage</h2>
        <ul>
          {noDamage.map((item, index) => (
            <li key={index}>Rectangle Coordinates: (Center - x: {item[0]}, y: {item[1]}), (Width: {item[2]}, Height: {item[3]})</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Minor Damage</h2>
        <ul>
          {minorDamage.map((item, index) => (
            <li key={index}>Rectangle Coordinates: (Center - x: {item[0]}, y: {item[1]}), (Width: {item[2]}, Height: {item[3]})</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Major Damage</h2>
        <ul>
          {majorDamage.map((item, index) => (
            <li key={index}>Rectangle Coordinates: (Center - x: {item[0]}, y: {item[1]}), (Width: {item[2]}, Height: {item[3]})</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Destroyed</h2>
        <ul>
          {destroyed.map((item, index) => (
            <li key={index}>Rectangle Coordinates: (Center - x: {item[0]}, y: {item[1]}), (Width: {item[2]}, Height: {item[3]})</li>
          ))}
        </ul>
      </div>
      <Footer />
    </div >
  );
}

export default Storesmap;
