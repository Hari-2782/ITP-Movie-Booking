import React, { useState } from 'react';
import { Card, Col, Container, Nav, Row } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
// import TopNavbar from './TopNavbar.jsx';
import AddFoodItem from './page/food/food.jsx';
import AddCelebToMovie from './page/movie/addceleberity.jsx';
import CreateMoviePage from './page/movie/movie.jsx';
import PackageManagement from './page/offer/offer.jsx';
import Payments from './page/paymeent/payment.jsx';
import Schedule from './page/schedule/scedule.jsx';
import ScreenCrud from './page/seat/seat.jsx';

const AdminDashboard = ({ theme }) => {
    const [activeTab, setActiveTab] = useState();
    const [chart, setChart] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // Reset the chart when a tab is changed
        if (chart && tab !== 'payments') {
            chart.destroy();
            setChart(null);
        }
        if (tab === 'payments' && !chart) {
            const chartData = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Total Payments',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                    },
                ],
            };
            const newChart = new Chart(document.getElementById('myChart'), {
                type: 'line',
                data: chartData,
                options: options,
            });
            setChart(newChart);
        }
    }
    const handleLogin = () => {
        // Perform login logic
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // Perform logout logic
        setIsLoggedIn(false);
    };

    const handleLoginFormToggle = () => {
        setShowLoginForm(!showLoginForm);
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Month',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Sales',
                },
            },
        },
    };

    return (
        <Container>
            {/* <TopNavbar isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} showLoginForm={showLoginForm} onToggleLoginForm={handleLoginFormToggle} /> */}
            <Row>
                <Col md={3}>
                    <Nav className="flex-column">
                        <Nav.Link onClick={() => handleTabChange('createMovie')}>Create Movie</Nav.Link>
                        <Nav.Link onClick={() => handleTabChange('addFoodItem')}>Add Food Item</Nav.Link>
                        <Nav.Link onClick={() => handleTabChange('screenCrud')}>Screen CRUD</Nav.Link>
                        <Nav.Link onClick={() => handleTabChange('schedule')}>Schedule</Nav.Link>
                        <Nav.Link onClick={() => handleTabChange('addCelebToMovie')}>Add Celeb to Movie</Nav.Link>
                        <Nav.Link onClick={() => handleTabChange('packageManagement')}>Package Management</Nav.Link>
                        <Nav.Link onClick={() => handleTabChange('payments')}>Payments</Nav.Link>
                    </Nav>
                </Col>
                </Row>
                <Row>
                <Col md={9}>
                    <Card>
                        <Card.Body>
                            {activeTab === 'createMovie' && <CreateMoviePage theme={theme} />}
                            {activeTab === 'addFoodItem' && <AddFoodItem />}
                            {activeTab === 'screenCrud' && <ScreenCrud />}
                            {activeTab === 'schedule' && <Schedule />}
                            {activeTab === 'addCelebToMovie' && <AddCelebToMovie />}
                            {activeTab === 'packageManagement' && <PackageManagement />}
                            {activeTab === 'payments' && <Payments />}
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <h2>Graph</h2>
                            <canvas id="myChart"></canvas>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;
