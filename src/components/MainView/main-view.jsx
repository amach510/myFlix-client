import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
        id: 1,
        title: "Kiki's Delivery Service",
        description: "Following the coming-of-age journey of a young witch named Kiki as she establishes her own delivery service in a quaint seaside town, discovering friendship and self-confidence along the way.",
        director: "Miyazaki, Hayao",
        genre: "Adventure",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHAXQmo6UAT_P8xIAppBglmEruxxExDBGELnwXCqjDjZToWwXr"

    },
    {
        id: 2,
        title: "A Silent Voice",
        description: "A grade-school student with a hearing impairment is bullied and transfers to another school. Years later, the former bully is tormented by his behaviour and sets out to make amends.",
        director: "Yamada, Naoko",
        genre: "Drama",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQJrlYXvqlm1bAFMMfjhlX970K4B0z2AJv66KKb1Y9gW-4eml2X"
    },
    {
        id: 3,
        title: "Ride Your Wave",
        description: "Blending romance and fantasy as it follows a young woman who discovers the transformative power of love and resilience after her surfer boyfriend's tragic death.",
        director: "Yuasa, Masaaki",
        genre: "Drama",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5FoZxavLyV9NpxWm1XGPwVEQ0qAon_B6KIv55nJb3BAjfAX-V",
    }
]);
    // Return statement
    const [selectedMovie, setselectedMovie] = useState(null);
   
    //onBackClick
    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setselectedMovie(null)} />
        );
    }

    // onClick
    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                    <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setselectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
}