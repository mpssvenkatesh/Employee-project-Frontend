import { useState, useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Dashboard = () =>{

    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();

    useEffect ( () =>{
            const fetchEmployees = async ()=>{
                try {
                    const response = await fetch("http://localhost:8081/api/allemployees");
                    const data = await response.json();

                    setEmployees(data);
                } catch (error) {
                    console.error("Error Showing Employees", error.message)
                }

            }

            fetchEmployees();
     }, []) ;

     const handledelete = async (employeeId) => {
        try {
            const response = await fetch(`http://localhost:8081/api/deleteemployee/${employeeId}`, {
                method: "DELETE",
            });

            if(response.ok){
                setEmployees((prevEmployees) =>
                prevEmployees.filter((employee)=> employee.id !==employeeId)
            )
            }
            console.log(`Employee with id ${employeeId} deleted successfully`);
        } catch (error) {
            console.log("Error deleting employee", error.message);
        }
    };

    const handleUpdate = (employeeId) => {
        navigate(`/employee/${employeeId}`);
    };
    

    return (
        <>
        <Container className="mt-5">
            <Row>
                <Col>
                <h1 className="text-center">Employees</h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) =>(
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.department}</td>
                                <td> 
                                <Button variant="outline-primary"  onClick={()=>handleUpdate(employee.id)}>Update</Button>{" "}
                                <Button variant="outline-danger" onClick={() => handledelete(employee.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
                </Col>
            </Row>

        </Container>
        </>


    )

}

export default Dashboard;