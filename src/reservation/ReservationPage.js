/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import queryString from 'query-string';
import { getRequestOptions, BASE_URL, getLocalISOTime, GUEST } from '../common/constants';
import ReservationTable from './ReservationTable';
import MatchDetailsCard from '../common/MatchDetailsCard';
import { Context } from '../Store';

const ReservationPage = (props) => {
    const url = props.location.search;
    const { matchId } = queryString.parse(url);
    const [cookies] = useCookies(['jwt', 'role']);
    const [, dispatch] = useContext(Context);
    const [match, setMatch] = useState({ datetime: getLocalISOTime() });
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
                console.log(data[0]);
                setMatch(data[0]);
            })
            .catch(() => {
                setMatch({ datetime: getLocalISOTime() });
                dispatch({
                    type: 'ERROR',
                    payload: 'Failed to fetch match details.'
                });
            });
    };

    useEffect(() => {
        fetchMatch();
    }, []);

    return (
        <>
            <h1>Reservation</h1>
            <MatchDetailsCard key={matchId} match={match} userType={GUEST} />
            <ReservationTable matchId={matchId} />
        </>
    );
};

export default ReservationPage;
