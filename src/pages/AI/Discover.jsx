import React, { useEffect, useState } from 'react';
import '../../assets/css/discover.css';
import { useDispatch, useSelector } from 'react-redux';
import { setArticles, setSelectedTopic } from '../../slices/search.js';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Nav, Spinner } from 'react-bootstrap';

export default function Discover() {
    const articles = useSelector((state) => state.searchdata.articles);
    const selectedTopic = useSelector((state) => state.searchdata.selectedTopic);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'e0c49af1a6mshb090f44452c2c82p1e2340jsnf61e4a71e0b9',
            'x-rapidapi-host': 'news-api14.p.rapidapi.com'
        }
    };

    useEffect(() => {
        if (articles.length === 0) {
            setLoading(true);
            fetchNews(selectedTopic);
        }
    }, [selectedTopic, articles]);

    const fetchNews = async (topic) => {
        try {
            const response = await fetch(`https://news-api14.p.rapidapi.com/v2/trendings?topic=${topic}&language=en&country=in`, options);
            const result = await response.json();
            console.log(result);
            dispatch(setArticles(result.data));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (eventKey) => {
        dispatch(setSelectedTopic(eventKey));
        if (articles.length === 0 || selectedTopic !== eventKey) {
            setLoading(true);
            fetchNews(eventKey);
        }
    };

    return (
        <div className="discover-container" style={{height:"100vh", overflow:"auto"}}>
            <Nav variant="tabs" defaultActiveKey="General" onSelect={handleSelect} style={{color:"white"}}>
                <Nav.Item>
                    <Nav.Link eventKey="General" className="nav-link">General</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Sports" className="nav-link">Sports</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Business" className="nav-link">Business</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Technology" className="nav-link">Technology</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Entertainment" className="nav-link">Entertainment</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Health" className="nav-link">Health</Nav.Link>
                </Nav.Item>
            </Nav>
            {loading ? (
                <div className="loader" style={{display:"flex", justifyContent:"center"}}>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <section className="articles">
                    {articles.map((value, index) => (
                        <Card key={index} style={{ width: '22rem', backgroundColor:"rgb(20, 20, 20)", color:"whitesmoke" }}>
                            <Card.Img variant="top" src={value.thumbnail} />
                            <Card.Body style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                                <div>
                                    <Card.Title style={{fontVariant: 'all-petite-caps'}}>{value.title?.slice(0,70)}...</Card.Title>
                                    <Card.Text style={{font:"menu"}}>
                                        {value.excerpt?.slice(0,100)}...
                                    </Card.Text>
                                </div>
                                <Button variant="light" href={value.url} style={{marginTop:"15px"}}>Read more</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </section>
            )}
        </div>
    );
}
