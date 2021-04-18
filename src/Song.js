import React from 'react';
import './css/Song.css'
import { Button, Icon } from 'semantic-ui-react'
import axios from 'axios';
const Song = ({ title,setTopSongs }) => {
    const upVote  = async () =>{
        try {
            const res = await axios.post('/api/rating',{title:title,action:1});
            setTopSongs(Object.entries(res.data));
        } catch (error) {
            console.log(error);
        }        
    }
    const downVote = async ()=>{
        try {
            const res = await axios.post('/api/rating',{title:title,action:0});
            setTopSongs(Object.entries(res.data));
        } catch (error) {
            console.log(error);
        } 
    }
    return (
        <div className="song">
            {title}
            <div className="ratingButtons">
                <Button icon basic onClick={upVote}>
                    <Icon name="thumbs up outline" style={{ color: 'green' }} />
                </Button>
                <Button icon basic onClick={downVote}>
                    <Icon name="thumbs down outline" style={{ color: 'red' }} />
                </Button>
            </div>
        </div>
    );
}

export default Song;