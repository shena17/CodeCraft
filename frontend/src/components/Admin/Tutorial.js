import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Pagination, Input, Button } from "antd";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import { Popconfirm } from "antd";
import { DeleteFilled, EditOutlined, SearchOutlined } from "@ant-design/icons";
import YouTube from "react-youtube";

export default function Tutorial() {
    const [page, setPage] = useState(1);
    const [tutorials, setTutorials] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8071/tutorials')
            .then(response => setTutorials(response.data))
            .catch(error => console.error(error));
    }, []);

    const extractVideoId = (videoUrl) => {
        const urlParams = new URLSearchParams(new URL(videoUrl).search);
        return urlParams.get('v');
    };

    const getYouTubeThumbnail = (videoUrl) => {
        const videoId = extractVideoId(videoUrl);
        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    };

    const handlePaginationChange = (value) => {
        if (value === 1) {
            setPage(1);
        } else {
            setPage(value);
        }
    };

    const handleDelete = (tutorialId) => {
        axios.delete(`http://localhost:8071/tutorials/${tutorialId}`)
            .then(() => {
                setTutorials(tutorials.filter(tutorial => tutorial._id !== tutorialId));
            })
            .catch(err => {
                alert(err.message);
            });
    };

    return (
        <>
            <h1>All Tutorials</h1>
            <Input
                placeholder="Search by Tutorial Heading"
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: "20px", width: "300px", marginLeft: "650px", marginTop: "50px" }}
            />
            <Link to={"/admin/tutorials/add"}><Button type="primary" style={{ marginLeft: "200px" }}>Add</Button></Link>

            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: "50px",
            }}>
                {tutorials
                    .filter((tutorial) =>
                        tutorial.heading.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .slice((page - 1) * 4, page * 4)
                    .map((tutorial) => (
                        <div key={tutorial._id}>
                            <Card
                                style={{
                                    width: 300,
                                    boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px"
                                }}
                                cover={
                                    <img
                                        alt={tutorial.heading}
                                        src={getYouTubeThumbnail(tutorial.url)} // Use getYouTubeThumbnail function here
                                        style={{
                                            objectFit: "cover",
                                            height: "200px",
                                            width: "100%",
                                        }}
                                    />
                                }
                                actions={[
                                    <Link to={"edit/"+tutorial._id}>
                                        <EditOutlined
                                            key="edit"
                                            style={{
                                                color: "green",
                                            }}
                                        />
                                    </Link>,
                                    <Popconfirm
                                        title="Are you sure to delete this product?"
                                        onConfirm={() => handleDelete(tutorial._id)}
                                        onCancel={() => { }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteFilled
                                            key="delete"
                                            style={{
                                                color: "red",
                                            }}
                                        />
                                    </Popconfirm>
                                ]}
                            >
                                <Meta style={{ textAlign: "center" }}
                                    title={tutorial.heading}
                                    description={
                                        <div>
                                            <p>Video Url: <a href={tutorial.url} target="_blank" rel="noopener noreferrer">
                                                {tutorial.url}
                                            </a></p>
                                            <p>Resources access link: <a href={tutorial.attach} target="_blank" rel="noopener noreferrer">
                                                {tutorial.attach}
                                            </a></p>
                                            <p>Tags: {tutorial.tags} </p>
                                        </div>
                                    }
                                />
                            </Card>
                        </div>
                    ))}
            </div>
            <Pagination
                style={{
                    marginTop: "50px",
                    textAlign: "center",
                    marginBottom: "50px",
                }}
                defaultCurrent={1}
                total={tutorials.length}
                defaultPageSize={4}
                onChange={handlePaginationChange}
            />
        </>
    );
}
