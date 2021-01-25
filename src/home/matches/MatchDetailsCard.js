import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import DateTimeWrapper from './DateTimeWrapper';

function MatchDetailsCard(props) {
    const states = Object.freeze({
        guest: 0,
        user: 1,
        manager: 2,
        managerEditable: 3
    });
    const [state, setState] = useState(states.manager);
    const dateTime = new DateTimeWrapper(props.match.datetime);
    const [editState, setEditState] = useState(null);
    const history = useHistory();

    // Done editing or Show Details or Buy Tickets
    const handlePrimaryClick = () => {
        if (state !== states.guest && state !== states.managerEditable) {
            history.push('/reservation');
        }
    };

    // Edit or Cancel
    const handleSecondaryClick = () => {
        if (state === states.managerEditable) {
            setState(states.manager);
        } else if (state === states.manager) {
            setEditState({
                ...props.match,
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

    const getTeamLogo = (teamName) => props.teams.find((team) => team.name === teamName).logo;

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

    if (state === states.managerEditable) {
        return (
            <div className="card match-details shadow-sm rounded">
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
                        {props.stadiums.map((stadium) => (
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
                                {props.teams.map((team) => (
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
                                {props.teams.map((team) => (
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
                                <th>Lineman 1</th>
                                <td>
                                    <input
                                        name="firstLineman"
                                        value={editState.firstLineman}
                                        onChange={handleFormChange}
                                        className="bg-transparent"
                                        type="text"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Lineman 2</th>
                                <td>
                                    <input
                                        name="secondLineman"
                                        value={editState.secondLineman}
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
                <div className="stadium">{props.match.stadium}</div>
                <div className="time">{dateTime.getTimeString()}</div>
            </div>
            <div className="card-body">
                <div className="teams">
                    <div className="team home-team">
                        <img
                            className="team-logo"
                            src={props.match.homeTeamLogo}
                            alt="home-team-logo"
                        />
                        <div className="team-name">{props.match.homeTeam}</div>
                    </div>
                    <div className="team away-team">
                        <img
                            className="team-logo"
                            src={props.match.awayTeamLogo}
                            alt="away-team-logo"
                        />
                        <div className="team-name">{props.match.awayTeam}</div>
                    </div>
                </div>
            </div>
            <div className="bottom-info">
                <table className="referee-team">
                    <tbody>
                        <tr>
                            <th>Referee</th>
                            <td>{props.match.referee}</td>
                        </tr>
                        <tr>
                            <th>Lineman 1</th>
                            <td>{props.match.firstLineman}</td>
                        </tr>
                        <tr>
                            <th>Lineman 2</th>
                            <td>{props.match.secondLineman}</td>
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
