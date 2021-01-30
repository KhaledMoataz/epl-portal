import React, { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { CircularProgress } from '@material-ui/core';
import { getRequestOptions, BASE_URL, GUEST } from '../common/constants';
import { Context } from '../Store';
import MatchDetailsCard from '../common/MatchDetailsCard';
import './reservation.css';

const MatchDetails = (props) => {
    const { matchId } = props;
    const [error, setError] = useState(false);
    const [cookies] = useCookies(['jwt', 'role']);
    const [, dispatch] = useContext(Context);
    const [match, setMatch] = useState(null);
    const token = cookies.jwt;
    const requestOptions = getRequestOptions(token);

    const fetchMatch = () => {
        fetch(`${BASE_URL}/matches/${matchId}`, requestOptions)
            .then((response) => response.json())
            .then((response) =>
                response.matches.map((data) => ({
                    // eslint-disable-next-line no-underscore-dangle
                    id: data._id,
                    datetime: data.time,
                    stadium: data.match_venue,
                    homeTeam: data.home_team,
                    homeTeamLogo: data.homeTeamLogo,
                    awayTeam: data.away_team,
                    awayTeamLogo: data.awayTeamLogo,
                    referee: data.referee,
                    firstLinesman: data.linesman1,
                    secondLinesman: data.linesman2,
                    reservationPercentage: data.reservationPercentage
                }))
            )
            .then((data) => {
                setMatch(data[0]);
            })
            .catch(() => {
                setMatch(null);
                dispatch({
                    type: 'ERROR',
                    payload: 'Failed to fetch match details.'
                });
                setError(true);
            });
    };
    useEffect(() => {
        fetchMatch();
    }, []);

    return (
        !error && (
            <div className="match-details-bg">
                {match == null ? (
                    <CircularProgress />
                ) : (
                    <div className="match-details-window">
                        <MatchDetailsCard key={matchId} match={match} userType={GUEST} />
                    </div>
                )}
            </div>
        )
    );
};

export default MatchDetails;
