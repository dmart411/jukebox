import SwiperCore, { EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";

const albums = [
  {
    id: 1,
    name: "If Your'e Reading This It's Too Late",
    artist_name: "DRAKE",
    cover_photo_url: "https://s3.amazonaws.com/hakuapps/prod/album-1.png",
  },
  {
    id: 2,
    name: "Hotter Than July",
    artist_name: "Stevie Wonder",
    cover_photo_url: "https://s3.amazonaws.com/hakuapps/prod/album-2.png",
  },
  {
    id: 3,
    name: "Overexposed",
    artist_name: "Maroon 5",
    cover_photo_url: "https://s3.amazonaws.com/hakuapps/prod/album-3.png",
  },
  {
    id: 4,
    name: "Hit n Run Phase One",
    artist_name: "PRINCE",
    cover_photo_url: "https://s3.amazonaws.com/hakuapps/prod/album-4.png",
  },
  {
    id: 5,
    name: "Brothers",
    artist_name: "The Black Keys",
    cover_photo_url: "https://s3.amazonaws.com/hakuapps/prod/album-5.png",
  },
];

const Albums = () => {
  SwiperCore.use([EffectCoverflow]);

  return (
    <Swiper
      effect="coverflow"
      centeredSlides="true"
      spaceBetween={0}
      slidesPerView={3}
      loop="true"
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
            {( swiper ) => {
              return (
                <div className={swiper.isActive ? "album selected" : "album"}>
                  <img src={album.cover_photo_url} alt="album" />
                  <h3 className="album-name">{album.name.toUpperCase()}</h3>
                  <h5 className="artist-name">{album.artist_name.toUpperCase()}</h5>
                </div>  
              );
            }}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Albums;
