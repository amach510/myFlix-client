import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movies = movies.find((m) => m.id === movieId);
    
    return (
        <Row className="mt-5 justify-content-center">
            <Col md={5} >
                <img src={movies.ImagePath} alt="movie cover" className="img-fluid"/>
            </Col>
            <Col md={3}>
                <div className="my-2">
                    <span>Title: </span>
                    <span>{movies.Title}</span>
                </div>
                <div className="my-2">
                    <span>Description: </span>
                    <span>{movies.Description}</span>
                </div>
                <div className="my-2">
                    <span>Director: </span>
                    <span>{movies.Director}</span>
                </div>
                <div className="my-2">
                    <span>Genre: </span>
                    <span>{movies.Genre}</span>
                </div>
                <Link to={`/`}>
                    <Button>Back</Button>
                </Link>
            </Col>
        </Row>
    );
};