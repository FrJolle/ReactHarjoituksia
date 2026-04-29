import React, { useState } from 'react';

const Friends = () => {
    const [friends, setFriends] = useState([]);

    const submitHandler = (e, friend) => {
        e.preventDefault();
        setFriends(prevFriends => prevFriends.concat({ name: friend, points: 0, id: Math.floor(Math.random() * 1000000) }));
    };

    const addPoint = id => {
        setFriends(prevFriends => prevFriends.map(f => (id === f.id) ? { ...f, points: f.points + 1 } : f));
    };

    const setToZero = () => {
        setFriends(prevFriends => prevFriends.map(f => ({ ...f, points: 0 })));
    };

    const getTotalPoints = () => {
        return friends.map(f => f.points).reduce((a, b) => a + b, 0);
    };

    return (
        <div>
            <form onSubmit={e => submitHandler(e, e.target.elements.friendName.value)}>
                <input type="text" name="friendName" placeholder="Ystävän nimi" />
                <button type="submit">Lisää ystävä</button>
            </form>

            <ul>
                {friends.map((f, i) => (
                    <li key={i}>
                        nimi: {f.name} pisteet: {f.points}
                        <button onClick={() => addPoint(f.id)}>lisää piste</button>
                    </li>
                ))}
            </ul>

            <button onClick={setToZero}>Nollaa kaikkien pisteet</button>

            <p>Yhteispisteet: {getTotalPoints()}</p>
        </div>
    );
};

export default Friends;
