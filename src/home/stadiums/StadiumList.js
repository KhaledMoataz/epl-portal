import React from 'react';
import StadiumItem from './StadiumItem';
import Loading from '../../common/Loading';

function StadiumList(props) {
    const stadiumsList =
        props.stadiums === null ? (
            <Loading isShown />
        ) : (
            props.stadiums.map((stadium) => <StadiumItem key={stadium.id} stadium={stadium} />)
        );
    return (
        <div className="stadium-list">
            <div className="list-heading">Stadiums</div>
            {stadiumsList}
        </div>
    );
}

export default StadiumList;
