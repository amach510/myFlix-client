import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);
    
    return (
        <Row className="mt-5 justify-content-center">
            <Col md={5} >
                <img src={movie.ImagePath} alt="movie cover" className="img-fluid"/>
            </Col>
            <Col md={3}>
                <div className="my-2">
                    <span>Title: </span>
                    <span>{movie.Title}</span>
                </div>
                <div className="my-2">
                    <span>Description: </span>
                    <span>{movie.Description}</span>
                </div>
                <div className="my-2">
                    <span>Director: </span>
                    <span>{movie.Director}</span>
                </div>
                <div className="my-2">
                    <span>Genre: </span>
                    <span>{movie.Genre}</span>
                </div>
                <Link to={`/`}>
                    <Button>Back</Button>
                </Link>
            </Col>
        </Row>
    );
};