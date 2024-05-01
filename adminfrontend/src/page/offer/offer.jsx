import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PackageManagement = () => {
    const [packages, setPackages] = useState([]);

    const [formData, setFormData] = useState({
        image: '',
        name: '',
        discount: 0,
        description: '',
        price: 0,
        type: ''
    });
    const [selectedPackage, setSelectedPackage] = useState(null);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        fetch(`http://localhost:8000/offer/getall`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.ok) {
                setPackages(data.data);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let url = 'http://localhost:8000/offer/pack';
            let method = 'POST';
            if (selectedPackage) {
                url += `/${selectedPackage._id}`;
                method = 'PUT';
            }
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = await response.json();
                if (selectedPackage) {
                    setPackages(packages.map(p => p._id === data._id ? data : p));
                    toast.success('Package updated successfully');
                } else {
                    setPackages([...packages, data]);
                    toast.success('Package added successfully');
                }
                setFormData({
                    image: '',
                    name: '',
                    discount: 0,
                    description: '',
                    price: 0,
                    type:''
                });
                setSelectedPackage(null);
            } else {
                throw new Error('Failed to add/update package');
            }
        } catch (error) {
            console.error('Error adding/updating package:', error);
            toast.error('Failed to add/update package');
        }
    };

    const handleEdit = (pkg) => {
        setSelectedPackage(pkg);
        setFormData({
            image: pkg.image,
            name: pkg.name,
            discount: pkg.discount,
            description: pkg.description,
            price: pkg.price,
            type: pkg.type
        });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/offer/delete/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setPackages(packages.filter(pkg => pkg._id !== id));
                toast.success('Package deleted successfully');
            } else {
                throw new Error('Failed to delete package');
            }
        } catch (error) {
            console.error('Error deleting package:', error);
            toast.error('Failed to delete package');
        }
    };

    return (
        <Container>
            <h1>Package Management</h1>
            <Form onSubmit={handleSubmit} clas>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" name="image" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="discount">
                    <Form.Label>Discount</Form.Label>
                    <Form.Control type="number" name="discount" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="type">
    <Form.Label>Type</Form.Label>
    <Form.Control type="text" name="type" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} />
</Form.Group>
                <Button variant="primary" type="submit">{selectedPackage ? 'Update' : 'Add'} Package</Button>
            </Form>
            <hr />
            <h2>Packages</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Discount</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {packages.map(pkg => (
                        <tr key={pkg._id}>
                            <td>{pkg.name}</td>
                            <td>{pkg.discount}</td>
                            <td>{pkg.description}</td>
                            <td>{pkg.price}</td>
                            <td>{pkg.type}</td>
                            <td>
                                <Button onClick={() => handleEdit(pkg)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(pkg._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ToastContainer position="top-right" />
        </Container>
    );
};

export default PackageManagement;
