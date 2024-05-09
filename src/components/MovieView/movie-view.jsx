import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    
    const { movieId } = useParams();

    const movie = movies.find((movie) => movie._id === movieId);
    

    return (
        <Container className="content">
            <Row className="my-5 justify-content-center">
                <Col md={4} >
                    <img src={movie.ImagePath} alt="movie cover" className="img-fluid"/>
                </Col>
                <Col md={5}>
                    <div className="my-3">
                        <span >Title: </span>
                        <span>{movie.Title}</span>
                    </div>
                    <div className="my-3">
                        <span>Description: </span>
                        <span>{movie.Description}</span>
                    </div>
                    <div className="my-3">
                        <span>Director: </span>
                        <span>{movie.Director.Name}</span>
                    </div>
                    <div className="my-3">
                        <span>Genre: </span>
                        <span>{movie.Genre.Name}</span>
                    </div>
                    <Link to={`/`}>
                        <Button>Back</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};