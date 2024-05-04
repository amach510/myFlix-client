import { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Button, Card, Form } from "react-bootstrap";

export const ProfileView = ({ user, token, movies, setUser }) => {
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.password);
    const [email, setEmail] = useState(user.email);
    const [birthday, setBirthday] = useState(user.birthday);

    const handleUpdate = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://my-flix-database-movie-app-5157085d44be.herokuapp.com/users/${user.username}", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then( async (response) => {
                if (response.ok) {
                    response.json();
                    alert("Update was successful");
                    window.location.reload();
                } else {
                    alert("Update failed")
                }
            });
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            fetch("https://my-flix-database-movie-app-5157085d44be.herokuapp.com/users/${user.username}", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(async (response) => {
                    if (response.ok) {
                        alert("Account deleted successfully");
                        setUser(null);
                    } else {
                        alert("Failed to delete account");
                    }
                })
                .catch((error) => console.error("Error deleting account:", error));
        }
    };

    return (
        <Container className="my-5">
            <Row>
                <Col md={5}>
                    <Card>
                        <Card.Body>
                            <Card.Title>My Profile</Card.Title>
                            <Card.Text>Username: {user.username}</Card.Text>
                            <Card.Text>Email: {user.email}</Card.Text>
                            <Card.Text>Birthday: {user.birthday}</Card.Text>
                            <Button variant="danger" onClick={handleDelete}>Delete Account</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={7}>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            minLength="3"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="enter password"
                            required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit" onClick={handleUpdate} className="mt-2">Update</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};