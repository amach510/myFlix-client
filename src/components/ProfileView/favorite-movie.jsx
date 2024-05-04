import { MovieCard } from "../MovieCard/movie-card";
import { Row, Col, Button } from "react-bootstrap";

export const FavoriteMovies = ({ favoriteMovieList, removeFav }) => {
    return (
        <>
            <h2>Favorite Movies</h2>
                <Row className="justify-content-right justify-content-md-center">
                    {
                    favoriteMovieList?.length !== 0 ?
                    favoriteMovieList?.map((movie) => (
                        <Col sm={6} md={4} lg={3} xl={2} className="mx-2 my-3 col-7 similar-movies-img" key={movie._id}>
                            <MovieCard
                                movie={movie}
                            />
                            <Button variant="secondary" onClick={() => removeFav(movies._id)}>Remove from list</Button>
                            <Button variant="secondary" className="my-4" onClick={() => removeFav(movie._id)}>Remove from list</Button>
                        </Col>
                    ))
                    : <Col>
                    <p>There are no favorites Movies</p>
                    </Col>
                    }
                </Row>
        </>
    );
}