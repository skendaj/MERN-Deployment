import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const Details = (props) => {
  const { update, setUpdate } = props;
  const [pirate, setPirate] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [pegleg, setPegLeg] = useState('Yes');
  const [eyepatch, setEyePatch] = useState('Yes');
  const [hookhand, setHookHand] = useState('Yes');

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pirates/${id}`)
      .then((res) => {
        console.log(res.data);
        setPirate(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const onCheck = (property) => {
    const updatedValue = !pirate[property];
    const payload = {
      [property]: updatedValue,
    };
    axios
      .patch(`http://localhost:8000/api/pirates/edit/${id}`, payload)
      .then(() => {
        setPirate((prevPirate) => ({
          ...prevPirate,
          [property]: updatedValue,
        }));
        setUpdate((prevUpdate) => !prevUpdate);
      })
      .catch((err) => console.log(err));
  };

  const toggleButton = (toggle) => {
    if (toggle === 'Yes') {
      return 'No';
    } else {
      return 'Yes';
    }
  };

  const handlePegLeg = () => {
    setPegLeg(toggleButton(pegleg));
  };

  const handleEyePatch = () => {
    setEyePatch(toggleButton(eyepatch));
  };

  const handleHookHand = () => {
    setHookHand(toggleButton(hookhand));
  };

  const ButtonStyle = (e) => {
    let buttonStyle = "btn ";
    buttonStyle += e === "Yes" ? "btn-danger" : "btn-success";
    return buttonStyle;
  };

  const editPirate = () => {
    navigate(`/pirates/edit/${id}`);
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#fc9900', minHeight: '100vh' }}>
      <nav className="d-flex justify-content-around align-items-center mb-5" style={{ height: '15vh', width: '', backgroundColor: '#744100' }}>
        <h1 className="text-white text-center">{pirate.firstName}</h1>
        <button className="btn btn-primary shadow shadow-lg">
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
            Crew Board
          </Link>
        </button>
      </nav>
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-column align-items-center mr-5">
          <img
            width="300px"
            height="300px"
            src={pirate.imgURL}
            alt="Profile"
            className="border border-dark rounded"
          />
          <h2>"{pirate.phrase}"</h2>
        </div>
        <div className="d-flex flex-column ml-5 p-3 mb-2 bg-light text-dark rounded border border-dark">
          <h2>About</h2>
          <p>Position: {pirate.position}</p>
          <p>Treasures: {pirate.treasures}</p>
          <div>
            <p>Peg-Leg: {pegleg}</p>
            <button className={ButtonStyle(pegleg)} onClick={handlePegLeg}>
              {pegleg === 'Yes' ? 'No' : 'Yes'}
            </button>
          </div>
          <div>
            <p>Eye-Patch: {eyepatch}</p>
            <button className={ButtonStyle(eyepatch)} onClick={handleEyePatch}>
              {eyepatch === 'Yes' ? 'No' : 'Yes'}
            </button>
          </div>
          <div>
            <p>Hand-Hook: {hookhand}</p>
            <button className={ButtonStyle(hookhand)} onClick={handleHookHand}>
              {hookhand === 'Yes' ? 'No' : 'Yes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
