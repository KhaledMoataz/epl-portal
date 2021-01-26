import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import DateTimeWrapper from './DateTimeWrapper';

function MatchDetailsCard({ match, teams, stadiums, toBeAdded, dialogClose, dialogDone }) {
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
    const history = useHistory();

    // Done editing or Show Details or Buy Tickets / toBeAdded? dialog done
    const handlePrimaryClick = () => {
        if (toBeAdded) {
            dialogDone(editState);
        } else if (state !== states.guest && state !== states.managerEditable) {
            history.push('/reservation');
        } else if (state === states.managerEditable) {
            setMatchDetails({ ...editState, datetime: `${editState.date}T${editState.time}` });
            setState(states.manager);
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

    if (state === states.managerEditable || toBeAdded) {
        return (
            <div className={`card match-details shadow-sm rounded ${toBeAdded ? 'm-0' : ''}`}>
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
                        type="button"
                        className="btn btn-secondary edit-match-details-btn"
                        onClick={handleSecondaryClick}>
                        Cancel
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handlePrimaryClick}>
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
