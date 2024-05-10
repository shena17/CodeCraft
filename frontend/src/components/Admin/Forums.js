import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import { PDFDownloadLink, Document, Page, View, Text } from '@react-pdf/renderer';
import { Link } from "react-router-dom";
import DeleteButtonForum from "./DeleteButtonForum";

export default function Forums() {
  const [forums, setForums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    function getForums() {
      axios.get("http://localhost:8071/forums").then((res) => {
        setForums(res.data);
      }).catch((err) => {
        alert(err.message);
      });
    }
    getForums();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8071/forums/${id}`)
      .then(res => {
        // Update forums list after deletion
        setForums(forums.filter(forum => forum._id !== id));
      })
      .catch(err => {
        console.error(err);
        alert('Error deleting forum.');
      });
  };

  const filteredForums = forums.filter((forum) =>
  forum.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // PDF Document Component
  const PdfDocument = ({ data }) => (
    <Document>
      <Page>
        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 10 }}>Forum Details</Text>
          {data.map((forum, index) => (
            <View key={forum._id} style={{ marginBottom: index < data.length - 1 ? 20 : 0 }}>
              <Text>{forum.forumid}</Text>
              <Text>{forum.subject}</Text>
              <Text>{forum.body}</Text>
              <Text>{forum.tags}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <>
      <h1>Community Forum</h1>
      <Input
        placeholder="Search by forum subject"
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "20px", width: "300px", marginLeft: "400px", marginTop: "10px" }}
      />
      <Button type="primary" icon={<DownloadOutlined />} style={{marginLeft:"30px"}}>
        <PDFDownloadLink document={<PdfDocument data={filteredForums} />} fileName="forum_details.pdf">
          Download PDF
        </PDFDownloadLink>
      </Button>
      <Link to={"/admin/forums/add"}><Button type="primary" style={{marginLeft:"200px"}}>Add</Button></Link>
      <table className="table table-success table-striped">
        <thead>
          <tr className="table-dark">
            <th scope="col">Forum ID</th>
            <th scope="col">Forum Details</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredForums.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>No forums found.</td>
            </tr>
          ) : (
            filteredForums.map(forum => (
              <tr key={forum._id}>
                <td>{forum.forumid}</td>
                <td><ul>
                    <h4 style={{color:"blue",fontWeight:"bold"}}>{forum.subject}</h4>
                    <h6>{forum.body}</h6>
                    <h6>{forum.tags}</h6>
                    </ul></td>
                <td><Link to={"edit/"+forum._id}><Button type="button" className="btn btn-danger" style={{ backgroundColor: 'green', border: 'none', width: '100px' }} >Edit</Button></Link></td>
                <td><DeleteButtonForum id={forum._id} onDelete={() => handleDelete(forum._id)} /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
