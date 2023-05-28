import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PirateList = (props) => {
  const { setPirate, pirate, update } = props;

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/pirates')
      .then((res) => {
        const sortedData = res.data.pirate.sort((a, b) => a.firstName.localeCompare(b.firstName));
        setPirate(sortedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);

  const deletePirate = (pirateId) => {
    axios
      .delete('http://localhost:8000/api/pirates/' + pirateId)
      .then((res) => {
        setPirate(pirate.filter((pirate) => pirate._id !== pirateId));
      })
      .catch((err) => console.log(err));
  };

  if (!pirate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: '#fc9900', minHeight: '100vh' }}>
      <nav className="d-flex justify-content-around align-items-center" style={{ height: '15vh', width: '', backgroundColor: '#744100' }}>
        <h1 className="text-white text-center">Pirate Crew</h1>
        <div className="d-flex justify-content-center align-items-center">
          <button className="btn btn-primary shadow shadow-lg">
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/pirates/new">
              Add Pirate
            </Link>
          </button>
        </div>
      </nav>
      <br />
      <div className="d-flex justify-content-around" style={{ marginLeft: '20%'}}>
        <table className="table table-borderless" style={{ maxWidth: '80vw' }}>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {pirate.map((pirate, index) => {
              return (
                <tr key={index}>
                  <td className="d-flex justify-content-start align-items-center text-left">
                    <img width="70px" height="70px" src={pirate.imgURL} className="rounded" alt="" />
                    <h4>{pirate.firstName}</h4>
                  </td>
                  <td style={{ width:'42.5%', marginLeft: '30%'}}>
                    <Link to={'/pirates/' + pirate._id}>
                      <button className="btn btn-primary shadow shadow-lg">View Pirate</button>
                    </Link>{' '}
                    <button className="btn btn-danger shadow shadow-lg" onClick={() => deletePirate(pirate._id)}>
                      Walk the Plank
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PirateList;
