import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import { PDFDownloadLink, Document, Page, View, Text } from '@react-pdf/renderer';
import { Link } from "react-router-dom";
import DeleteButtonTag from "./DeleteButtonTag";

export default function Tag() {
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    function getTags() {
      axios.get("http://localhost:8071/tags").then((res) => {
        setTags(res.data);
      }).catch((err) => {
        alert(err.message);
      });
    }
    getTags();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8071/tags/${id}`)
      .then(res => {
        // Update tags list after deletion
        setTags(tags.filter(tag => tag._id !== id));
      })
      .catch(err => {
        console.error(err);
        alert('Error deleting tag.');
      });
  };

  const filteredTags = tags.filter((tag) =>
    tag.tagname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // PDF Document Component
  const PdfDocument = ({ data }) => (
    <Document>
      <Page>
        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 10 }}>Tag Details</Text>
          {data.map((tag, index) => (
            <View key={tag._id} style={{ marginBottom: index < data.length - 1 ? 20 : 0 }}>
              <Text>{tag.tagid}</Text>
              <Text>{tag.tagname}</Text>
              <Text>{tag.tag}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <>
      <h1>All Tags</h1>
      <Input
        placeholder="Search by Tag Name"
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "20px", width: "300px", marginLeft: "400px", marginTop: "10px" }}
      />
      <Button type="primary" icon={<DownloadOutlined />} style={{marginLeft:"30px"}}>
        <PDFDownloadLink document={<PdfDocument data={filteredTags} />} fileName="tag_details.pdf">
          Download PDF
        </PDFDownloadLink>
      </Button>
      <Link to={"add"}><Button type="primary" style={{marginLeft:"200px"}}>Add</Button></Link>
      <table className="table table-success table-striped">
        <thead>
          <tr className="table-dark">
            <th scope="col">Tag ID</th>
            <th scope="col">Tag Name</th>
            <th scope="col">Tag</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredTags.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>No tags found.</td>
            </tr>
          ) : (
            filteredTags.map(tag => (
              <tr key={tag._id}>
                <td>{tag.tagid}</td>
                <td>{tag.tagname}</td>
                <td>{tag.tag}</td>
                <td><Link to={"edit/"+tag._id}><Button type="button" className="btn btn-danger" style={{ backgroundColor: 'green', border: 'none', width: '100px' }} >Edit</Button></Link></td>
                <td><DeleteButtonTag id={tag._id} onDelete={() => handleDelete(tag._id)} /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
