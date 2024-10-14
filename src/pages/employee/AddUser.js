import { useState } from "react";
import "./AddUser.css";
import { Button, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
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

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(formData)

        try {
            const response = await fetch("http://localhost:8081/api/addemployee",{
                method : "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(formData)
            })

            const data = await response.json
            console.log("Employee Created:", data)
            navigate("/")
        } catch (error) {
            console.log("Error in Employee Creation :", error.message);
        }
    }

    return (
        <>
            <div className="center-form">
                <Form onSubmit={handleSubmit}>
                <h1>Add A New Employee</h1>
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
                        Add User
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default AddUser;
