import React, { useState, useEffect } from 'react';
import './css/App.css';
import { List, Segment, Header, Icon } from 'semantic-ui-react'
import Song from './Song'
import axios from 'axios'

const App = () => {
  const [songs, setSongs] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp1 = await axios.get("/api/songs");
        const resp2 = await axios.get("/api/rating");
        setSongs(resp1.data);
        setTopSongs(Object.entries(resp2.data).sort((a, b) => b[1] - a[1]));
      } catch (error) {
        console.error("Error loading data: ", error)
      }
    }
    fetchData();
  }, [])
  return (
    <div className="App">
      <div className="songList">
        <List divided relaxed verticalAlign="middle">
          {songs.map(it => <List.Item><Song title={it} topSongs={topSongs} setTopSongs={setTopSongs} /></List.Item>)}
        </List>
      </div >
      <div className="topSongs">
        <Segment compact style={{height:'1px'}}>
          <div align="center">
            <Header as="h2">Текущий топ 10</Header>
          </div>
          <List relaxed divided>
            {topSongs.sort((a, b) => b[1] - a[1]).slice(0, 10).map(it => <List.Item>{it[0]} : {it[1]} <Icon name="thumbs up outline" style={{ marginLeft: '5px' }}></Icon></List.Item>)}
          </List>

        </Segment>
      </div>
    </div>
  );
}

export default App;
