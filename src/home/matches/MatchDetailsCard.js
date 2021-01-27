import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import DateTimeWrapper from './DateTimeWrapper';

function MatchDetailsCard({ match, teams, stadiums, toBeAdded, dialogClose, addNewMatch }) {
    const states = Object.freeze({
        guest: 0,
        user: 1,
        manager: 2,
        managerEditable: 3
    });
    const [matchDetails, setMatchDetails] = useState(match);
    const [state, setState] = useState(states.manager);
    const dateTime = new DateTimeWrapper(matchDetails.datetime);
    const [editState, setEditState] = useState({
        ...match,
        date: dateTime.getDateSelectFormat(),
        time: dateTime.getTimeInputFormat()
    });
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const postMatch = (isNew) => {
        const matchState = { ...editState, datetime: `${editState.date}T${editState.time}` };
        let matchObj = isNew ? {} : { _id: matchState.id };
        matchObj = {
            ...matchObj,
            time: matchState.datetime,
            match_venue: matchState.stadium,
            home_team: matchState.homeTeam,
            homeTeamLogo: matchState.homeTeamLogo,
            away_team: matchState.awayTeam,
            awayTeamLogo: matchState.awayTeamLogo,
            referee: matchState.referee,
            linesman1: matchState.firstLinesman,
            linesman2: matchState.secondLinesman
        };
        const requestOptions = {
            method: `${isNew ? 'POST' : 'PUT'}`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(matchObj)
        };
        setLoading(true);
        fetch(`https://f31cbb2ba792.ngrok.io/matches/${isNew ? 'add' : 'edit'}`, requestOptions)
            .then((response) => {
                setLoading(false);
                if (isNew || !response.ok) {
                    return response
                        .json()
                        .then((responseObj) => ({ ok: response.ok, data: responseObj }));
                }
                setMatchDetails(matchState);
                setState(states.manager);
                throw Error('ok');
            })
            .then(({ ok, data }) => {
                setLoading(false);
                console.log(data);
                if (ok) {
                    addNewMatch({ id: data.id, ...matchState });
                } else {
                    // validation error
                }
            })
            .catch((errorThrown) => {
                if (errorThrown.message === 'ok') return;
                setLoading(false);
                alert(errorThrown.message);
            });
    };

    // Done editing or Show Details or Buy Tickets / toBeAdded? dialog done
    const handlePrimaryClick = () => {
        if (toBeAdded) {
            postMatch(true);
        } else if (state !== states.guest && state !== states.managerEditable) {
            history.push('/reservation');
        } else if (state === states.managerEditable) {
            postMatch(false);
        }
    };

    // Edit or Cancel / toBeAdded? dialog close
    const handleSecondaryClick = () => {
        if (toBeAdded) {
            dialogClose();
            return;
        }
        if (state === states.managerEditable) {
            setState(states.manager);
        } else if (state === states.manager) {
            setEditState({
                ...matchDetails,
                date: dateTime.getDateSelectFormat(),
                time: dateTime.getTimeInputFormat()
            });
            setState(states.managerEditable);
        }
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setEditState({
            ...editState,
            [name]: value
        });
    };

    const getTeamLogo = (teamName) => teams.find((team) => team.name === teamName).logo;

    const getOtherTeamAttr = (teamAttr) => (teamAttr === 'homeTeam' ? 'awayTeam' : 'homeTeam');

    const handleTeamSelection = (event) => {
        const { name: myTeamAttr, value: myTeamName } = event.target;
        const otherTeamAttr = getOtherTeamAttr(myTeamAttr);
        const otherTeamName = editState[otherTeamAttr];
        const myTeamLogo = getTeamLogo(myTeamName);
        const newState = {
            ...editState,
            [myTeamAttr]: myTeamName,
            [`${myTeamAttr}Logo`]: myTeamLogo
        };
        if (myTeamName === otherTeamName) {
            newState[otherTeamAttr] = editState[myTeamAttr];
            newState[`${otherTeamAttr}Logo`] = editState[`${myTeamAttr}Logo`];
        }
        setEditState(newState);
    };

    const isValid = () =>
        editState.referee !== '' &&
        editState.firstLinesman !== '' &&
        editState.secondLinesman !== '';

    if (state === states.managerEditable || toBeAdded) {
        return (
            <div className={`card match-details shadow-sm rounded ${toBeAdded ? 'm-0' : ''}`}>
                {loading ? <LinearProgress /> : null}
                <div className="top-info">
                    <input
                        type="date"
                        name="date"
                        className="date bg-transparent"
                        onChange={handleFormChange}
                        value={editState.date}
                    />
                    <select
                        className="stadium bg-transparent"
                        name="stadium"
                        value={editState.stadium}
                        onChange={handleFormChange}>
                        {stadiums.map((stadium) => (
                            <option key={stadium.id} value={stadium.name}>
                                {stadium.name}
                            </option>
                        ))}
                    </select>
                    <input
                        className="time bg-transparent"
                        type="time"
                        name="time"
                        onChange={handleFormChange}
                        value={editState.time}
                    />
                </div>
                <div className="card-body">
                    <div className="teams">
                        <div className="team home-team">
                            <img
                                className="team-logo"
                                src={editState.homeTeamLogo}
                                alt="home-team-logo"
                            />
                            <select
                                className="team-name bg-transparent"
                                name="homeTeam"
                                value={editState.homeTeam}
                                onChange={handleTeamSelection}>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.name}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="team away-team">
                            <img
                                className="team-logo"
                                src={editState.awayTeamLogo}
                                alt="away-team-logo"
                            />
                            <select
                                className="team-name bg-transparent"
                                name="awayTeam"
                                value={editState.awayTeam}
                                onChange={handleTeamSelection}>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.name}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="bottom-info">
                    <table className="referee-team">
                        <tbody>
                            <tr>
                                <th>Referee</th>
                                <td>
                                    <input
                                        name="referee"
                                        value={editState.referee}
                                        onChange={handleFormChange}
                                        className="bg-transparent"
                                        type="text"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Linesman 1</th>
                                <td>
                                    <input
                                        name="firstLinesman"
                                        value={editState.firstLinesman}
                                        onChange={handleFormChange}
                                        className="bg-transparent"
                                        type="text"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Linesman 2</th>
                                <td>
                                    <input
                                        name="secondLinesman"
                                        value={editState.secondLinesman}
                                        onChange={handleFormChange}
                                        className="bg-transparent"
                                        type="text"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ marginLeft: 'auto' }} />
                    <button
                        disabled={loading}
                        type="button"
                        className="btn btn-secondary edit-match-details-btn"
                        onClick={handleSecondaryClick}>
                        Cancel
                    </button>
                    <button
                        disabled={loading || !isValid()}
                        type="button"
                        className="btn btn-primary"
                        onClick={handlePrimaryClick}>
                        Done
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="card match-details shadow-sm rounded">
            <div className="top-info">
                <div className="date">{dateTime.getDateString()}</div>
                <div className="stadium">{matchDetails.stadium}</div>
                <div className="time">{dateTime.getTimeString()}</div>
            </div>
            <div className="card-body">
                <div className="teams">
                    <div className="team home-team">
                        <img
                            className="team-logo"
                            src={matchDetails.homeTeamLogo}
                            alt="home-team-logo"
                        />
                        <div className="team-name">{matchDetails.homeTeam}</div>
                    </div>
                    <div className="team away-team">
                        <img
                            className="team-logo"
                            src={matchDetails.awayTeamLogo}
                            alt="away-team-logo"
                        />
                        <div className="team-name">{matchDetails.awayTeam}</div>
                    </div>
                </div>
            </div>
            <div className="bottom-info">
                <table className="referee-team">
                    <tbody>
                        <tr>
                            <th>Referee</th>
                            <td>{matchDetails.referee}</td>
                        </tr>
                        <tr>
                            <th>Linesman 1</th>
                            <td>{matchDetails.firstLinesman}</td>
                        </tr>
                        <tr>
                            <th>Linesman 2</th>
                            <td>{matchDetails.secondLinesman}</td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ marginLeft: 'auto' }} />
                {state !== states.user ? (
                    <button
                        type="button"
                        className="btn btn-secondary edit-match-details-btn"
                        onClick={handleSecondaryClick}>
                        Edit
                    </button>
                ) : null}
                <button type="button" className="btn btn-primary" onClick={handlePrimaryClick}>
                    {state === states.user ? 'Buy Tickets' : 'Show Details'}
                </button>
            </div>
        </div>
    );
}

export default MatchDetailsCard;
