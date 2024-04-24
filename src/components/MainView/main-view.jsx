import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setselectedMovie] = useState(null);
    
    //Connect App to API
    useEffect(() => {
    if (!token) {
        return;
    }

    fetch("https://my-flix-database-movie-app-5157085d44be.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}`}
    })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => {
                return {
                    _id: movie._id,
                    Title: movie.Title,
                    ImagePath: movie.ImagePath,
                    Description: movie.Description,
                    Year: movie.Year,
                    Genre: {
                        Name: movie.Genre.Name
                    },
                    Director: {
                        Name: movie.Director.Name
                    }
                };
            });
            setMovies(moviesFromApi);
        });
    }, [token]);

    //Token state variable

    if (!user) {
    return (
        <LoginView
        onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
        }}
        />
    );
    }

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
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setselectedMovie(newSelectedMovie);
                    }}
                />
            ))}
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </div>
    );
}