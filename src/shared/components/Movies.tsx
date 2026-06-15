"use client";
import { IMovie } from "@/types/movie.types";
import Image from "next/image";
import { useState } from "react";
import MoviePopup from "./MoviePopup";
import MovieInfoModal from "./MovieInfoModal";

const Movies = ({movies, label} : {movies: IMovie[], label: string}) => {

    const [movieData, setMovieData] = useState<IMovie | null>(null);
    const [movieId, setMovieId] = useState<string | null>(null);
    const [showInfoModal, setShowInfoModal] = useState(false);

    const handleMouseEnter = (movie : IMovie, movieId : string) => {
        setMovieData(movie);
        setMovieId(movieId);
    
    };

    const handleOpenInfoModal = () => {
        setMovieId(null);

    }
    
    const handleMouseLeave = () => {
        setMovieId(null);
        setShowInfoModal(true);
    } 
    return (
        <>
            <div className="flex flex-col gap-2 relative my-[3vw] px-[4%]">
                {movies.length ? <h2>{label}</h2> : null}
                <div className="flex gap-2">
                    {movies.map((movie) => (
                        <div key={movie._id}>
                            <div className="relative cursor-pointer" onMouseEnter={() => handleMouseEnter(movie, movie._id)} onMouseLeave={handleMouseLeave}>
                                <Image src={movie.thumbnailUrl} className="object-cover" alt={movie.title} fill />
                            </div>
                            {movie._id === movieId ? <MoviePopup movie={movie} handleOpenInfoModal={handleOpenInfoModal} /> : null}
                        </div>
                    ))}
                </div>
            </div>

            {showInfoModal ? <MovieInfoModal showInfoModal={showInfoModal} setShowInfoModal={setShowInfoModal} movieData={movieData} /> : null}
        </>
    );
};

export default Movies;