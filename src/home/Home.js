import React, { useContext, useEffect, useState } from 'react';
import { Dialog } from '@material-ui/core';
import MatchDetailsList from './matches/MatchDetailsList';
import TeamList from './teams/TeamList';
import StadiumList from './stadiums/StadiumList';
import './styles.css';
import Loading from '../common/Loading';

// fake data
import matchesFile from './fake-data/matches-details';
import stadiumsFile from './fake-data/stadiums';
import teamsFile from './fake-data/teams';
import MatchDetailsCard from './matches/MatchDetailsCard';
import AddStadiumDialog from './AddStadiumDialog';
import { Context } from '../Store';

const Home = () => {
    const useFakeData = false;
    const [matches, setMatches] = useState(null);
    const [stadiums, setStadiums] = useState(null);
    const [teams, setTeams] = useState(null);
    const [isAddingMatchShown, showAddingMatch] = useState(false);
    const [isAddingStadiumShown, showAddingStadium] = useState(false);
    const [globalState] = useContext(Context);

    const baseUrl = 'https://f31cbb2ba792.ngrok.io';

    const fetchMatches = () => {
        if (useFakeData) {
            setMatches(matchesFile);
            return;
        }
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                jwt:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTBiZDU1ZGQyMTZjNjEwODMwNzA4MyIsImlhdCI6MTYxMTcxMzE1MSwiZXhwIjoxNjExNzk5NTUxfQ.bNGpiPA3UwMGgBQqKvEwhJx-dNUAzoCszLWhS3vNEeU'
            }
        };
        fetch(
            `${baseUrl}/matches/${globalState.showMyMatchesOnly ? 'my-matches' : 'all'}`,
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
                    secondLinesman: match.linesman2
                }))
            )
            .then((data) => setMatches(data));
    };

    const fetchStadiums = () => {
        if (useFakeData) {
            setStadiums(stadiumsFile);
            return;
        }
        fetch(`${baseUrl}/stadia/all`)
            .then((response) => response.json())
            .then((response) =>
                response.stadia.map((stadium) => ({
                    id: stadium.name,
                    name: stadium.name,
                    rows: stadium.numRows,
                    cols: stadium.seats_per_row
                }))
            )
            .then((data) => setStadiums(data));
    };

    const fetchTeams = () => {
        if (useFakeData) {
            setTeams(teamsFile);
            return;
        }
        fetch(`${baseUrl}/teams/all`)
            .then((response) => response.json())
            .then((response) =>
                response.teams.map((team) => ({
                    // eslint-disable-next-line no-underscore-dangle
                    id: team._id,
                    name: team.name,
                    logo: team.logo
                }))
            )
            .then((data) => setTeams(data));
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
                    <div className="home-buttons">
                        {stadiums != null ? (
                            <button
                                onClick={() => showAddingStadium(true)}
                                type="button"
                                className="add-stadium-button btn btn-primary">
                                Add Stadium
                            </button>
                        ) : null}
                        {matches !== null &&
                        stadiums != null &&
                        teams != null &&
                        stadiums.length >= 1 &&
                        teams.length >= 2 ? (
                            <button
                                type="button"
                                className="add-match-button btn btn-primary"
                                onClick={() => showAddingMatch(true)}>
                                Add Match
                            </button>
                        ) : null}
                    </div>
                    <StadiumList stadiums={stadiums} />
                </div>

                <div className="middle-list col-lg-6 col-md-9 col-12">
                    <MatchDetailsList matches={matches} stadiums={stadiums} teams={teams} />
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
                            datetime: new Date().toISOString(),
                            stadium: stadiums[0].name,
                            homeTeam: teams[0].name,
                            homeTeamLogo: teams[0].logo,
                            awayTeam: teams[1].name,
                            awayTeamLogo: teams[1].logo,
                            referee: '',
                            firstLinesman: '',
                            secondLinesman: ''
                        }}
                        stadiums={stadiums}
                        teams={teams}
                        toBeAdded
                        dialogClose={() => showAddingMatch(false)}
                        addNewMatch={addNewMatch}
                    />
                ) : null}
            </Dialog>
            <AddStadiumDialog
                isShown={isAddingStadiumShown}
                handleClose={() => showAddingStadium(false)}
                addStadium={addStadium}
            />
        </div>
    );
};

export default Home;
