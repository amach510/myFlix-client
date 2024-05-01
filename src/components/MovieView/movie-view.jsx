import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <Row className="mt-5 justify-content-center">
            <Col md={5} >
                <img src={movie.image} alt="movie cover"/>
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
                <Button onClick={onBackClick}>Back</Button>
            </Col>
        </Row>
    );
};