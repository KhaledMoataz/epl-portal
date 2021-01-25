import React, { useState } from 'react';

function MatchDetailsCard(props) {
    const states = Object.freeze({
        guest: 0,
        user: 1,
        manager: 2,
        managerEditable: 3
    });
    const [state, setState] = useState(states.manager);

    const handlePrimaryClick = () => {};

    const handleSecondaryClick = () => {
        if (state === states.managerEditable) {
            setState(states.manager);
        } else if (state === states.manager) {
            setState(states.managerEditable);
        }
    };

    // YYYY-MM-DDTHH:mm

    const dateValue = props.match.datetime.split('T')[0];
    const datetime = new Date(props.match.datetime);
    const pad = (number) => {
        const s = `0 ${number}`;
        return s.substr(s.length - 2);
    };
    const hours = datetime.getHours();
    const timeString = `${hours % 12}:${pad(datetime.getMinutes())} ${hours < 12 ? 'AM' : 'PM'}`;
    const dateString = `${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()}`;

    return (
        <div className="card match-details">
            <div className="top-info">
                <div className="date">
                    {state === states.managerEditable ? (
                        <input type="date" className="bg-transparent" value={dateValue} />
                    ) : (
                        dateString
                    )}
                </div>
                <div className="stadium">{props.match.stadium}</div>
                <div className="time">{timeString}</div>
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
                        {state === states.managerEditable ? 'Done' : 'Edit'}
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
