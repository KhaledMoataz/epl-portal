import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import { Dialog } from '@material-ui/core';
import { useCookies } from 'react-cookie';
import MatchDetailsList from './matches/MatchDetailsList';
import TeamList from './teams/TeamList';
import StadiumList from './stadiums/StadiumList';
import Loading from '../common/Loading';
import MatchDetailsCard from '../common/MatchDetailsCard';
import AddStadiumDialog from './AddStadiumDialog';
import { Context } from '../Store';
import {
    BASE_URL,
    getLocalISOTime,
    getRequestOptions,
    getUserType,
    MANAGER
} from '../common/constants';

// fake data
import matchesFile from './fake-data/matches-details';
import stadiumsFile from './fake-data/stadiums';
import teamsFile from './fake-data/teams';

const Home = () => {
    const useFakeData = true;
    const [matches, setMatches] = useState(null);
    const [stadiums, setStadiums] = useState(null);
    const [teams, setTeams] = useState(null);
    const [isAddingMatchShown, showAddingMatch] = useState(false);
    const [isAddingStadiumShown, showAddingStadium] = useState(false);
    const [globalState, dispatch] = useContext(Context);
    const [cookies] = useCookies(['jwt', 'role']);

    const userType = getUserType(cookies.role);
    const token = cookies.jwt;
    const requestOptions = getRequestOptions(token);

    const fetchMatches = () => {
        if (useFakeData) {
            setMatches(matchesFile);
            return;
        }
        fetch(
            `${BASE_URL}/matches/${globalState.showMyMatchesOnly ? 'my-matches' : 'all'}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((response) =>
                response.matches.map((match) => ({
                    // eslint-disable-next-line no-underscore-dangle
                    id: match._id,
                    datetime: match.time,
                    stadium: match.match_venue,
                    homeTeam: match.home_team,
                    homeTeamLogo: match.homeTeamLogo,
                    awayTeam: match.away_team,
                    awayTeamLogo: match.awayTeamLogo,
                    referee: match.referee,
                    firstLinesman: match.linesman1,
                    secondLinesman: match.linesman2,
                    reservationPercentage: match.reservationPercentage
                }))
            )
            .then((data) => setMatches(data))
            .catch(() => {
                setMatches([]);
                dispatch({
                    type: 'ERROR',
                    payload: 'Failed to fetch matches details.'
                });
            });
    };

    const fetchStadiums = () => {
        if (useFakeData) {
            setStadiums(stadiumsFile);
            return;
        }
        fetch(`${BASE_URL}/stadia/all`, requestOptions)
            .then((response) => response.json())
            .then((response) =>
                response.stadia.map((stadium) => ({
                    id: stadium.name,
                    name: stadium.name,
                    rows: stadium.numRows,
                    cols: stadium.seats_per_row
                }))
            )
            .then((data) => setStadiums(data))
            .catch(() => {
                setStadiums([]);
                dispatch({
                    type: 'ERROR',
                    payload: 'Failed to fetch stadiums list.'
                });
            });
    };

    const fetchTeams = () => {
        if (useFakeData) {
            setTeams(teamsFile);
            return;
        }
        fetch(`${BASE_URL}/teams/all`)
            .then((response) => response.json())
            .then((response) =>
                response.teams.map((team) => ({
                    // eslint-disable-next-line no-underscore-dangle
                    id: team._id,
                    name: team.name,
                    logo: team.logo
                }))
            )
            .then((data) => setTeams(data))
            .catch(() => {
                setTeams([]);
                dispatch({
                    type: 'ERROR',
                    payload: 'Failed to fetch teams list.'
                });
            });
    };

    useEffect(() => {
        fetchStadiums();
        fetchTeams();
    }, []);

    useEffect(() => {
        setMatches(null);
        fetchMatches();
    }, [globalState.showMyMatchesOnly]);

    const addNewMatch = (newMatch) => {
        showAddingMatch(false);
        setMatches([newMatch, ...matches]);
    };

    const addStadium = (stadium) => {
        showAddingStadium(false);
        setStadiums([...stadiums, stadium]);
    };

    return (
        <div className="container-fluid home">
            <div className="row">
                <div className="text-center left-list col-3 d-lg-block d-none">
                    <StadiumList stadiums={stadiums} />
                </div>

                <div className="middle-list col-lg-6 col-md-9 col-12">
                    <div className="ml-3 mr-0 mb-2 d-flex justify-content-start align-items-center">
                        <h1>{globalState.showMyMatchesOnly ? 'Reservations' : 'All Matches'}</h1>
                        {userType === MANAGER && (
                            <>
                                <div className="ml-auto" />
                                {matches !== null &&
                                stadiums != null &&
                                teams != null &&
                                stadiums.length >= 1 &&
                                teams.length >= 2 ? (
                                    <button
                                        type="button"
                                        className="add-match-button btn btn-outline-secondary"
                                        onClick={() => showAddingMatch(true)}>
                                        Add Match
                                    </button>
                                ) : null}
                                {stadiums != null ? (
                                    <button
                                        onClick={() => showAddingStadium(true)}
                                        type="button"
                                        className="ml-1 add-stadium-button btn btn-outline-secondary">
                                        Add Stadium
                                    </button>
                                ) : null}
                            </>
                        )}
                    </div>
                    {matches !== null && matches.length === 0 ? (
                        <p className="lead">No matches to show</p>
                    ) : null}
                    <MatchDetailsList
                        matches={matches}
                        stadiums={stadiums}
                        teams={teams}
                        userType={userType}
                        token={token}
                    />
                    <Loading isShown={matches === null} />
                </div>

                <div className="right-list col-3 d-md-block d-none">
                    <TeamList teams={teams} />
                </div>
            </div>
            <Dialog
                open={isAddingMatchShown}
                onClose={() => showAddingMatch(false)}
                aria-labelledby="form-dialog-title"
                fullWidth>
                {isAddingMatchShown ? (
                    <MatchDetailsCard
                        match={{
                            datetime: getLocalISOTime(),
                            stadium: stadiums[0].name,
                            homeTeam: teams[0].name,
                            homeTeamLogo: teams[0].logo,
                            awayTeam: teams[1].name,
                            awayTeamLogo: teams[1].logo,
                            referee: '',
                            firstLinesman: '',
                            secondLinesman: '',
                            reservationPercentage: 0
                        }}
                        stadiums={stadiums}
                        teams={teams}
                        toBeAdded
                        dialogClose={() => showAddingMatch(false)}
                        addNewMatch={addNewMatch}
                        userType={userType}
                        token={token}
                    />
                ) : null}
            </Dialog>
            <AddStadiumDialog
                isShown={isAddingStadiumShown}
                handleClose={() => showAddingStadium(false)}
                addStadium={addStadium}
                token={token}
            />
        </div>
    );
};

export default Home;
