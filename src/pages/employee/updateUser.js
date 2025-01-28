import { useEffect, useState } from 'react';
import './updateUser.css';
import { Button, Form, FormControl } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/getbyid/${id}`);
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error("Error fetching employee", error.message);
            }
        };
        fetchEmployee();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8081/api/update/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            const textResponse = await response.text(); // Get raw response text
            console.log("Response Data:", textResponse);

            if (response.ok) {
                navigate("/");
            } else {
                console.error("Failed to update user:", textResponse);
            }
        } catch (error) {
            console.error("Error updating employee", error.message);
        }
    };

    return (
        <div className="center-form">
            <h1>Update The Employee Details</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <FormControl
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <FormControl
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <FormControl
                        type="text"
                        name="phone"
                        placeholder="Enter Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicDepartment">
                    <FormControl
                        type="text"
                        name="department"
                        placeholder="Enter Department"
                        value={formData.department}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </div>
    );
};

export default UpdateUser;
