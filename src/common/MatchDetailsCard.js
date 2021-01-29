import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import 'react-circular-progressbar/dist/styles.css';
import DateTimeWrapper from '../home/matches/DateTimeWrapper';
import { Context } from '../Store';
import { FAN, GUEST, MANAGER, BASE_URL, buildRequestOptions, getLocalISOTime } from './constants';
import CircularProgress from './CircularProgress';

function MatchDetailsCard({
    match,
    teams,
    stadiums,
    toBeAdded,
    dialogClose,
    addNewMatch,
    userType,
    token
}) {
    const [matchDetails, setMatchDetails] = useState(match);
    const [editable, setEditable] = useState(false);
    const dateTime = new DateTimeWrapper(matchDetails.datetime);
    const [editState, setEditState] = useState({
        ...match,
        date: dateTime.getDateSelectFormat(),
        time: dateTime.getTimeInputFormat()
    });
    const [loading, setLoading] = useState(false);
    const [, dispatch] = useContext(Context);
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
        const requestOptions = buildRequestOptions(isNew ? 'POST' : 'PUT', token, matchObj);
        setLoading(true);
        fetch(`${BASE_URL}/matches/${isNew ? 'add' : 'edit'}`, requestOptions)
            .then((response) => {
                setLoading(false);
                if (isNew || !response.ok) {
                    return response
                        .json()
                        .then((responseObj) => ({ ok: response.ok, data: responseObj }));
                }
                setMatchDetails(matchState);
                setEditable(false);
                throw Error('ok');
            })
            .then(({ ok, data }) => {
                setLoading(false);
                if (ok) {
                    addNewMatch({ id: data.id, ...matchState });
                } else {
                    dispatch({ type: 'ERROR', payload: data.msg });
                }
            })
            .catch((errorThrown) => {
                if (errorThrown.message === 'ok') return;
                setLoading(false);
                dispatch({ type: 'ERROR', payload: errorThrown.message });
            });
    };

    // Done editing or Show Details or Buy Tickets / toBeAdded? dialog done
    const handlePrimaryClick = () => {
        if (toBeAdded) {
            postMatch(true);
        } else if (userType !== GUEST && !editable) {
            history.push(`/reservation?matchId=${matchDetails.id}`);
        } else if (editable) {
            postMatch(false);
        }
    };

    // Edit or Cancel / toBeAdded? dialog close
    const handleSecondaryClick = () => {
        if (toBeAdded) {
            dialogClose();
            return;
        }
        if (editable) {
            setEditable(false);
        } else {
            setEditState({
                ...matchDetails,
                date: dateTime.getDateSelectFormat(),
                time: dateTime.getTimeInputFormat()
            });
            setEditable(true);
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
        editState.secondLinesman !== '' &&
        `${editState.date}T${editState.time}` > getLocalISOTime();

    if (editable || toBeAdded) {
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
                        {!toBeAdded && (
                            <CircularProgress progress={matchDetails.reservationPercentage} />
                        )}
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
                    <CircularProgress progress={matchDetails.reservationPercentage} />
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
                {userType === MANAGER ? (
                    <button
                        type="button"
                        className="btn btn-secondary edit-match-details-btn"
                        onClick={handleSecondaryClick}>
                        Edit
                    </button>
                ) : null}
                {userType !== GUEST ? (
                    <button type="button" className="btn btn-primary" onClick={handlePrimaryClick}>
                        {userType === FAN ? 'Buy Tickets' : 'Show Details'}
                    </button>
                ) : null}
            </div>
        </div>
    );
}

export default MatchDetailsCard;
