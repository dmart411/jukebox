import { useState, useEffect } from "react";
import SwiperCore, { EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Collapse } from "react-bootstrap";
import axios from "axios";
import Song from "../Song";

// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";

const Albums = () => {
  const [open, setOpen] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [current, setCurrent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let allSongs = [];
      axios.get("http://jukebox-proxy.herokuapp.com/albums").then((res) => {
        setAlbums(res.data);
        res.data.forEach((album) => {
          axios
            .get(`https://jukebox-proxy.herokuapp.com/songs/${album.id}`)
            .then((res) => {
              allSongs = [...allSongs, ...res.data];
            })
            .then((res) => {
              setSongs(allSongs);
            });
        });
      });
    };

    fetchData();
  }, []);

  SwiperCore.use([EffectCoverflow]);

  return albums && songs ? (
    <>
      <Swiper
        effect="coverflow"
        centeredSlides="true"
        spaceBetween={0}
        slidesPerView={3}
        initialSlide={2}
        loop="true"
        onSlideChange={(swiper) => {
          setOpen(false);
          setTimeout(() => {
            let length = albums.length ? albums.length : 5;
            let index = (swiper.activeIndex % length) + 1;
            index = index === albums.length ? 0 : index;  
            console.log(albums.length);
            setCurrent(index);
            setOpen(true);
          }, 500);
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: false,
        }}
        breakpoints={{
          700: {
            spaceBetween: 0,
            slidesPerView: 4,
          },
          500: {
            spaceBetween: 100,
            slidesPerView: 2,
          },
          411: {
            spaceBetween: 100,
            slidesPerView: 2,
          },
          300: {
            spaceBetween: 0,
            slidesPerView: 1,
          },
        }}
      >
        {albums.map((album, index) => {
          return (
            <SwiperSlide key={index}>
              {(slide) => {
                return (
                  <div className={slide.isActive ? "album selected" : "album"}>
                    <img src={album.cover_photo_url} alt="album" />
                    <h3 className="album-name">{album.name.toUpperCase()}</h3>
                    <h5 className="artist-name">
                      {album.artist_name.toUpperCase()}
                    </h5>
                  </div>
                );
              }}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Collapse in={open}>
        <div className="song-list border border-secondary border-bottom-0">
          {songs
            .filter((song) => {
              let album = albums[current];
              return album ? song.album_id === album.id : false;
            })
            .sort((a, b) => {
              return a.song_order - b.song_order;
            })
            .map((song, index) => {
              return <Song song={song} key={index} />;
            })}
        </div>
      </Collapse>
    </>
  ) : (
    "Loading..."
  );
};

export default Albums;
