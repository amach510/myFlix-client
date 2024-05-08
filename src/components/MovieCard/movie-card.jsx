import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, token, user }) => {
    const addToFavorites = () => {
        fetch(`https://my-flix-database-movie-app-5157085d44be.herokuapp.com/users/${user.username}/movies/${movie._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add to favorites');
            }
            alert('Added to favorites successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add to favorites. Please try again.');
        });
    };

    return (
        <Card className="h-100 mt-5 card-shadow">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <div className="button-container">
                  <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                      <Button variant="primary">Open</Button>
                  </Link>
                  <Button variant="primary" onClick={addToFavorites}>Add to Favorites</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

// Define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    token: PropTypes.string.isRequired,
    user: PropTypes.shape({
        username: PropTypes.string.isRequired
    }).isRequired
};
