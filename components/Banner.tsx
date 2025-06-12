import Image from "next/image";
import { Movie } from "@/typings";
import React, { useEffect, useState } from "react";
import { baseUrl } from "@/constants/movie";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { modalAtom, movieAtom } from "@/atoms/modalAtom";
import { useAtom } from "jotai";

interface Props {
  netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useAtom(modalAtom);
  const [currentMovie, setCurrentMovie] = useAtom(movieAtom);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div
      className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end
    lg:pb-12"
    >
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen overflow-x-hidden">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt="movie image"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <h1 className="text-2xl  md:text-4xl lg:text-7xl font-bold">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
          Play
        </button>
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
        >
          More Info
          <InformationCircleIcon className="h-6 w-6 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
}

export default Banner;
