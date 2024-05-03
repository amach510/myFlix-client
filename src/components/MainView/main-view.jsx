import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    // const [selectedMovie, setselectedMovie] = useState(null);
    
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

    return (
        <BrowserRouter>
            <Row className="justify-content-md-center mt-5">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route 
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView 
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route 
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route 
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className="mb-5" key={movie._id} md={3}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};

//     if (!user) {
//         return (
//             <Row className="justify-content-md-center mt-5">
//                 <Col md={5}>
//                     <LoginView 
//                         onLoggedIn={(user, token) => {
//                             setUser(user);
//                             setToken(token);
//                         }}
//                     />
//                     or
//                     <SignupView />
//                 </Col>
//             </Row>
//         );
//     }

//     //onBackClick
//     if (selectedMovie) {
//         return (
//             <Row className="justify-content-md-center">
//                 <Col md={8}>
//                     <MovieView movie={selectedMovie} onBackClick={() => setselectedMovie(null)} />
//                 </Col>
//             </Row>
//         );
//     }

//     //onClick
//     if (movies.length === 0) {
//         return (
//             <Row className="justify-content-md-center">
//                 <Col>
//                     <p>The list is empty!</p>
//                     <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
//                 </Col>
//             </Row>
//         );
//     }

//     return (
//         <Row className="justify-content-md-center">
//             {movies.map((movie) => (
//                 <Col md={3} className="mb-5" key={movie._id}>
//                 <MovieCard
//                     movie={movie}
//                     onMovieClick={(newSelectedMovie) => {
//                         setselectedMovie(newSelectedMovie);
//                     }}
//                     style={img={height:"300px"}}
//                 />
//             </Col>
//         ))}
//             <Button className="my-5" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
//         </Row>
//     );
// }