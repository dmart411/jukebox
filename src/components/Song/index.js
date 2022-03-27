import { useState } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const Song = ({ song, active }) => {
  const [favorited, setFavorited] = useState(false);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="toolip"> 
      MARK AS FAVORITE
    </Tooltip>
  );

  return (
    <div className={active ? "row song" : "hidden"}>
      <div className="track-number">{song.song_order}</div>
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 200 }}
        overlay={renderTooltip}
      >
        <div
          className={favorited ? "favorite favorited" : "favorite"}
          onClick={() => setFavorited(!favorited)}
        >
          ★
        </div>
      </OverlayTrigger>
      <div className="song-name">{song.song_name}</div>
      {song.song_label && song.song_label.includes("explicit") ? (
        <div className="label">EXPLICIT</div>
      ) : (
        ""
      )}
      {song.song_label && song.song_label.includes("upbeat") ? (
        <div className="label">UPBEAT</div>
      ) : (
        ""
      )}
      <div className="track-time">{song.song_duration}</div>
    </div>
  );
};

export default Song;
