import { modalAtom, movieAtom } from "@/atoms/modalAtom";
import { Movie } from "@/typings"
import { DocumentData } from "firebase/firestore";
import { useAtom } from "jotai";
import Image from "next/image"

interface Props {
  // when using firebase
  movie: Movie | DocumentData
}

function Thumbnail({movie}: Props) {
  const [/*showModal*/, setShowModal] = useAtom(modalAtom);
  const [/*currentMovie*/, setCurrentMovie] = useAtom(movieAtom);

  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200
    ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        fill
        alt="movie-poster"
      />
    </div>
  );
}

export default Thumbnail