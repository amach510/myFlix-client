import React, { useCallback } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { Button, Col, Container, Row,} from "react-bootstrap";
import { Link } from "react-router-dom";

export const FavoriteMovies = ({ movies, user, token }) => {
    const favoriteMovies = useCallback(()=>{movies.filter((movie) => user.favoriteMovies.includes(movie._id))},[movies]);

    const addFavoriteMovie = () => {     
        if (!token) {
          return;
        }
        fetch("https://my-flix-database-movie-app-5157085d44be.herokuapp.com/users/${user}/movies/${movie._id}", {        
                method: 'POST',
                headers: { 
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}` 
                }
            })
            .then((response) => {
                alert('Movie has been added to Favorite Movies');
                return response.json(), console.log(response);
            })
            .catch((error) => {
                alert('Something went wrong' + error);
            })
        };
    
    const deleteMovie = () => {
        if (!token) {
            return;
        }
        fetch("https://my-flix-database-movie-app-5157085d44be.herokuapp.com/users/${user}/movies/${movie._id}", {
                method: 'DELETE',
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                alert('Movie has been deleted');
                return response.json(), console.log(response);
            })
            .catch((error) => {
                alert('Something went wrong' + error);
            })
            };
    return (
        <Container className="content">
        <Row>
          <span>Favorite Movies</span>
          {favoriteMovies.length === 0 ? (
            <Col>Your list of favorite movies is empty</Col>
          ) : (
            <>
              <div className='text-start h2 mb-4'>Your list of favorite movies</div>
              {favoriteMovies.map((movie) => (
                <Col key={movie._id} className='mb-5' xs={12} sm={6} md={4} lg={3}>
                  <MovieCard
                    movie={movie}
                    user={user}
                    token={token}
                    updateUserOnFav={(user) => {
                      console.log('Update User called', user);
                      setUser(user);
                      setToken(token);
                      localStorage.setItem('user', JSON.stringify(user));
                    }}
                  />
                </Col>
              ))}
            </>
          )}
          <Link to={`/movies`}>
            <Button 
              className="add-to-favorite"
              variant="warning"
              onClick={addFavoriteMovie}
            > Add Favorites
            </Button>
          </Link>
          <Link to={`/movies`}>
            <Button 
              className="remove-from-favorite"
              variant="danger"
              onClick={deleteMovie}
            > Remove from Favorites
            </Button>
          </Link>
        </Row>
    </Container>
  );
};