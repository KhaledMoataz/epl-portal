import React, { useEffect, useState } from 'react';
import MatchDetailsList from './matches/MatchDetailsList';
import TeamList from './teams/TeamList';
import StadiumList from './stadiums/StadiumList';
import './styles.css';

// fake data
import matchesFile from './fake-data/matches-details';
import stadiumsFile from './fake-data/stadiums';
import teamsFile from './fake-data/teams';

function Home() {
    const [matches, setMatches] = useState([]);
    const [stadiums, setStadiums] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        setMatches(matchesFile);
        setStadiums(stadiumsFile);
        setTeams(teamsFile);
    }, []);

    return (
        <div className="container-fluid home">
            <div className="row">
                <div className="left-list col-3 d-lg-block d-none">
                    <StadiumList stadiums={stadiums} />
                </div>

                <div className="middle-list col-lg-6 col-md-9 col-12">
                    <MatchDetailsList matches={matches} stadiums={stadiums} teams={teams} />
                </div>

                <div className="right-list col-3 d-md-block d-none">
                    <TeamList teams={teams} />
                </div>
            </div>
        </div>
    );
}

export default Home;
