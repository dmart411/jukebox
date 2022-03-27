import { useState, useEffect } from "react";
import SwiperCore, { EffectCoverflow, Navigation, Thumbs } from "swiper";
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
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let allSongs = [];
      axios.get("https://jukebox-proxy.herokuapp.com/albums").then((res) => {
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

  SwiperCore.use([EffectCoverflow, Navigation, Thumbs]);

  return albums && songs ? (
    <>
      <div className="back-btn btn shadow" id="swiper-back">←</div>
      <Swiper
        effect="coverflow"
        centeredSlides="true"
        spaceBetween={0}
        slidesPerView={3}
        initialSlide={2}
        loop="true"
        onSwiper={setThumbsSwiper}
        navigation={{ nextEl: "#swiper-forward", prevEl: "#swiper-back" }}
        onSlideChange={(swiper) => {
          setOpen(false);
          setTimeout(() => {
            let length = albums.length ? albums.length : 5;
            let index = (swiper.activeIndex % length) + 1;
            index = index === albums.length ? 0 : index;  
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
                  <div className={slide.isActive ? "album selected shadow" : "album shadow-lg"}>
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
        <div className="song-list shadow-lg">
          {songs
            .sort((a, b) => {
              return a.song_order - b.song_order;
            })
            .map((song, index) => {
              let album = albums[current];
              return <Song song={song} key={index} active={album ? song.album_id === album.id : false}/>;
            })}
        </div>
      </Collapse>
      <div className="btn next-btn shadow" id="swiper-forward">→</div>
    </>
  ) : (
    "Loading..."
  );
};

export default Albums;
