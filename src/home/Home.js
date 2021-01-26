import React, { useEffect, useState } from 'react';
import MatchDetailsList from './matches/MatchDetailsList';
import TeamList from './teams/TeamList';
import StadiumList from './stadiums/StadiumList';
import './styles.css';
import Loading from '../common/Loading';

// fake data
// import matchesFile from './fake-data/matches-details';
// import stadiumsFile from './fake-data/stadiums';
// import teamsFile from './fake-data/teams';

function Home() {
    const [matches, setMatches] = useState(null);
    const [stadiums, setStadiums] = useState(null);
    const [teams, setTeams] = useState(null);
    const baseUrl = 'https://f31cbb2ba792.ngrok.io';

    useEffect(() => {
        // Fetch match details
        fetch(`${baseUrl}/matches/all`)
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
        // Fetch stadiums list
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
        // Fetch teams list
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
    }, []);

    return (
        <div className="container-fluid home">
            <div className="row">
                <div className="text-center left-list col-3 d-lg-block d-none">
                    <StadiumList stadiums={stadiums} />
                </div>

                <div className="text-center middle-list col-lg-6 col-md-9 col-12">
                    <MatchDetailsList matches={matches} stadiums={stadiums} teams={teams} />
                    <Loading isShown={matches === null} />
                </div>

                <div className="text-center right-list col-3 d-md-block d-none">
                    <TeamList teams={teams} />
                </div>
            </div>
        </div>
    );
}

export default Home;
