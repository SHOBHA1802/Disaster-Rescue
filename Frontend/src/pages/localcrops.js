import React, { Component, useState, useEffect } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Navbar from "./Navbar.js";
// import Form from "./Form.js";
import { Route, Link, NavLink } from "react-router-dom";
// import Home from "./pages/Home.js";
import { useGlobalContext } from "./context.js";
import axios from "axios";
import Loading from "./Loading.js";
import data from "./datacrops.js";
import Footer from "./Footer.js";
// import Loading from "./Loading.js";
import { MapContainer, Marker, Popup, TileLayer, Polygon } from "react-leaflet";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
const Home = () => {
  const [toggle, setToggle] = useState(0);
  const [toggle2, setToggle2] = useState(0);
  const [form, setForm] = useState(0);
  const [profile, setProfile] = useState(1);
  const { lat, lon, setLat, setLon } = useGlobalContext();
  let t1, t2;
  const { name, email, name2, email2, setName, setEmail, polygon_id, setId } =
    useGlobalContext();
  const [rem, setRem] = useState(0);
  // const { polygon_id, setId } = useGlobalContext();
  const [loading, setLoading] = useState(1);
  const [found, setFound] = useState(0);
  const [done, setDone] = useState(0);
  const [lat1, setLat1] = useState("");
  const [lat2, setLat2] = useState("");
  const [lat3, setLat3] = useState("");
  const [lat4, setLat4] = useState("");
  const [lon1, setLon1] = useState("");
  const [lon2, setLon2] = useState("");
  const [lon3, setLon3] = useState("");
  const [lon4, setLon4] = useState("");
  const [farmers, setFarmers] = useState([]);
  const [options, setOptions] = useState([]);
  const [you, setYou] = useState(1);
  const [friends, setFriends] = useState([]);
  const Navigate = useNavigate();
  const clickHandler = async (name) => {
    const loggedInUser = localStorage.getItem("user");
    var accesstoken;
    var id_now;
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      accesstoken = foundUser.token;
      console.log(foundUser);
    }
    const p = localStorage.getItem("polygon");
    if (p) {
      const foundUser = JSON.parse(p);
      id_now = foundUser.polygon_id;
    }
    let s1 = `${process.env.REACT_APP_BACKEND}/user/localcrops`;
    const requestOptions = {
      method: "post",
      url: s1,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };

    const val = JSON.stringify({
      name: name,
      email: email,
      polygon_id: id_now,
    });
    console.log(val);
    try {
      const d = await axios.post(s1, val, requestOptions);
      console.log(d);
      if (d.data !== "Failed") setFarmers(d.data);
      else {
        // console.log("adfoiweaog");
        setFarmers([]);
      }
      console.log("Hellooo", d.data);
    } catch (err) {
      console.log(err);
    }
    // setLoading(false);
    setYou(0);
  };

  const fetchFarmers = async () => {
    const loggedInUser = localStorage.getItem("user");
    var accesstoken;
    var id_now;
    let name, email;
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      // console.log(foundUser);
      accesstoken = foundUser.token;
      name = foundUser.name;
      email = foundUser.email;
    }
    const p = localStorage.getItem("polygon");
    if (p) {
      const foundUser = JSON.parse(p);
      id_now = foundUser.polygon_id;
    }
    // console.log(polygon_id);
    let s1 = `${process.env.REACT_APP_BACKEND}/user/farmer`;
    let requestOptions = {
      method: "post",
      url: s1,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    console.log(name, email, lat, lon);
    let val = JSON.stringify({
      polygon_id: id_now,
    });
    // console.log("I set the polygon_id", polygon_id);
    try {
      const d = await axios.post(s1, val, requestOptions);
      console.log(d);
      setFarmers(d.data);
    } catch (err) {
      console.log(err);
    }
    setYou(1);

    s1 = `${process.env.REACT_APP_BACKEND}/user/options`;
    requestOptions = {
      method: "post",
      url: s1,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };

    val = JSON.stringify({
      name: name,
      email: email,
    });
    // console.log("Options called");
    try {
      const d = await axios.post(s1, val, requestOptions);
      console.log(d);
      setOptions(d.data.options);
      console.log("Hellooo", d.data);
    } catch (err) {
      console.log(err);
    }

    s1 = `${process.env.REACT_APP_BACKEND}/user/latitudes`;
    requestOptions = {
      method: "post",
      url: s1,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    val = JSON.stringify({
      polygon_id: id_now,
    });
    let lat_now, lon_now;
    const location = localStorage.getItem("latitudes");
    if (location) {
      const foundLocation = JSON.parse(location);
      lat_now = foundLocation.lat;
      setLat(foundLocation.lat);
      lon_now = foundLocation.lon;
      setLon(foundLocation.lon);
    }
    let lat1, lon1, lat2, lon2, lat3, lon3, lat4, lon4;
    let a = Math.sqrt((1500 * 4) / Math.sqrt(3));
    let b = (Math.sqrt(3) / 2) * a;
    b /= 1000;
    lat1 = lat_now - b * Math.cos(45);
    lon1 = lon_now - b * Math.sin(45);

    lat2 = lat_now + b * Math.cos(45);
    lon2 = lon_now - b * Math.sin(45);

    lat3 = lat_now + b * Math.cos(45);
    lon3 = lon_now + b * Math.sin(45);

    lat4 = lat_now - b * Math.cos(45);
    lon4 = lon_now + b * Math.sin(45);

    setLat1(lat1);
    setLat2(lat2);
    setLat3(lat3);
    setLat4(lat4);
    setLon1(lon1);
    setLon2(lon2);
    setLon3(lon3);
    setLon4(lon4);
    setLoading(false);
  };
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    document.head.appendChild(link);
    const loggedInUser = localStorage.getItem("user");
    let name2;
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setName(foundUser.name);
      name2 = foundUser.name;
      setEmail(foundUser.email);
    }
    let lat_now, lon_now;
    lat_now = lat;
    lon_now = lon;
    const location = localStorage.getItem("latitudes");
    if (location) {
      const foundLocation = JSON.parse(location);
      lat_now = foundLocation.lat;
      setLat(foundLocation.lat);
      lon_now = foundLocation.lon;
      setLon(foundLocation.lon);
    }
    const p = localStorage.getItem("polygon");
    if (p) {
      const p2 = JSON.parse(p);
      // console.log(p2.polygon_id);
      if (typeof p2 != "NULL") setId(p2.polygon_id);
    }

    const p2 = localStorage.getItem("friends");
    console.log("friends", p2);
    if (p2) {
      const p3 = JSON.parse(p2);
      setFriends(p3.friends);
      // console.log("friends", p3.friends[2]);
    }

    if (localStorage.getItem("polygon")) {
      fetchFarmers();
    } else {
      setLoading(0);
    }
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  if (loading) return <Loading />;
  return (
    <div >
      <Navbar profile={profile} setProfile={setProfile} show={1} />
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <iframe
          width="600"
          height="500"
          src="https://api.maptiler.com/maps/satellite/?key=pbFR9sHiTqZEtGlVqhm1#0.9/19.81919/1.53625"
          style={{ border: 'none' }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
// Improvement could be setting localstorage because on loading we won't get the component or use a useEffect api call for geoLocation
// Also add filter for the user
// Returning different maps for different crops
// Making a button for differnet crops and farmers. Crops can be done by using forEach function or a map. Whenever I click on them
// i need to fetch an api from backend to return all the farmers on the model3 having the crops. You could use a state variable
// it's basic work would be having states from data.length. state 0 is default and will correspond to farmers fetching. All the
// other buttons are disabled and would be a link to the profile to complete the profile to access the features
