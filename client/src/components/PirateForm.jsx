import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const PirateForm = (props) => {
    const { pirate, setPirate, update, setUpdate } = props;
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [imgURL, setImgURL] = useState('');
    const [phrase, setPhrase] = useState('');
    const [position, setPosition] = useState('');
    const [treasures, setTreasures] = useState('');
    const [pegleg, setPegleg] = useState(true);
    const [eyepatch, setEyepatch] = useState(true);
    const [hookhand, setHookhand] = useState(true);
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8000/api/pirates/new', {
                firstName,
                imgURL,
                phrase,
                position,
                treasures,
                pegleg,
                eyepatch,
                hookhand,
            })
            .then((res) => {
                console.log(res.data.errors);
                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    setUpdate(!update);
                    console.log('Request to server');
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log('erorrTest:' + JSON.stringify(err));
            });

        setFirstName('');
        setImgURL('');
        setPhrase('');
        setPosition('');
        setTreasures('');
        setPegleg(true);
        setEyepatch(true);
        setHookhand(true);
    };

    return (
        <div className="container-fluid" style={{ backgroundColor: '#fc9900', minHeight: '100vh' }}>
            <nav
                className="d-flex justify-content-around align-items-center mb-5"
                style={{ height: '15vh', width: '', backgroundColor: '#744100' }}
            >
                <h1 className="text-white text-center">Add Pirate</h1>
                <button className="btn btn-primary shadow shadow-lg">
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
                        Crew Board
                    </Link>
                </button>
            </nav>
            <form style={{ width: '40%', margin: '5% 30%' }} onSubmit={onSubmitHandler}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Pirate Name:</label>
                            <input type="text" className="form-control mt-1" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            {errors.firstName ? <p className="text-danger">{errors.firstName.message}</p> : ''}
                        </div>
                        <div className="form-group">
                            <label>Image Url:</label>
                            <input type="text" className="form-control mt-1" value={imgURL} onChange={(e) => setImgURL(e.target.value)} />
                            {errors.imgURL ? <p className="text-danger">{errors.imgURL.message}</p> : ''}
                        </div>
                        <div className="form-group">
                            <label># of Treasure Chests:</label>
                            <input type="number" className="form-control mt-1" value={treasures} onChange={(e) => setTreasures(e.target.value)} />
                            {errors.treasures ? <p className="text-danger">{errors.treasures.message}</p> : ''}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Crew Position:</label>
                            <br />
                            <select className="form-select" onChange={(e) => setPosition(e.target.value)} value={position}>
                                <option value={"0"}>Select an option</option>
                                <option value={'First Mate'}>First Mate</option>
                                <option value={'Quarter Master'}>Quarter Master</option>
                                <option value={'Boatswain'}>Boatswain</option>
                                <option value={'Powder Monkey'}>Powder Monkey</option>
                                <option value={'Captain'}>Captain</option>
                            </select>
                            {errors.position ? <p className="text-danger">{errors.position.message}</p> : ''}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Pirate Catch Phrase:</label>
                            <input type="text" className="form-control mt-1" value={phrase} onChange={(e) => setPhrase(e.target.value)} />
                            {errors.phrase ? <p className="text-danger">{errors.phrase.message}</p> : ''}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Peg Leg:</label>
                            <br />
                            <input type="checkbox" checked={pegleg} onChange={(e) => setPegleg(!pegleg)} />
                        </div>
                        <div className="form-group">
                            <label>Eye Patch</label>
                            <br />
                            <input type="checkbox" checked={eyepatch} onChange={(e) => setEyepatch(!eyepatch)} />
                        </div>
                        <div className="form-group">
                            <label>Hook Hand</label>
                            <br />
                            <input type="checkbox" checked={hookhand} onChange={(e) => setHookhand(!hookhand)} />
                        </div>
                        <button type="submit" className="btn btn-primary shadow shadow-lg">
                            Add Pirate
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PirateForm;
