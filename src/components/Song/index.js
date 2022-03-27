import { useState } from "react";

const Song = ({ song, active }) => {
  const [favorited, setFavorited] = useState(false);

  return (
      <div className={active ? 'row song border-bottom border-secondary' : 'hidden'}>
        <div className="track-number">
          {song.song_order}
        </div>
        <div className={favorited ? "favorite favorited" : "favorite"} onClick={() => setFavorited(!favorited)}>★</div>
        <div className="song-name">{song.song_name}</div>
        {song.song_label && song.song_label.includes("explicit") ? (
          <div className="label">
            EXPLICIT
          </div>
        ) : (
          ""
        )}
        {song.song_label && song.song_label.includes("upbeat") ? (
          <div className="label">
            UPBEAT
          </div>
        ) : (
          ""
        )}
        <div className="track-time">{song.song_duration}</div>
      </div>
  );
};

export default Song;
