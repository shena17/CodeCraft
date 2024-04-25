import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import { PDFDownloadLink, Document, Page, View, Text } from '@react-pdf/renderer';
import { Link } from "react-router-dom";
import DeleteButtonResource from "./DeleteButtonResource";
export default function Resource() {
  const [resources, setResource] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    function getResource() {
      axios.get("http://localhost:8071/resources").then((res) => {
        setResource(res.data);
      }).catch((err) => {
        alert(err.message);
      });
    }
    getResource();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8071/resources/${id}`)
      .then(res => {
        // Update resources list after deletion
        setResource(resources.filter(resource => resource._id !== id));
      })
      .catch(err => {
        console.error(err);
        alert('Error deleting resource.');
      });
  };

  const filteredResource = resources.filter((resource) =>
  resource.heading.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // PDF Document Component
  const PdfDocument = ({ data }) => (
    <Document>
      <Page>
        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 10 }}>Resource Details</Text>
          {data.map((resource, index) => (
            <View key={resource._id} style={{ marginBottom: index < data.length - 1 ? 20 : 0 }}>
              <Text>{resource.resourceid}</Text>
              <Text>{resource.type}</Text>
              <Text>{resource.attach}</Text>
              <Text>{resource.heading}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <>
      <h1>All Resources</h1>
      <Input
        placeholder="Search by resource heading"
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "20px", width: "300px", marginLeft: "400px", marginTop: "10px" }}
      />
      <Button type="primary" icon={<DownloadOutlined />} style={{marginLeft:"30px"}}>
        <PDFDownloadLink document={<PdfDocument data={filteredResource} />} fileName="resource_details.pdf">
          Download PDF
        </PDFDownloadLink>
      </Button>
      <Link to={"/admin/resources/add"}><Button type="primary" style={{marginLeft:"200px"}}>Add</Button></Link>
      <table className="table table-success table-striped">
        <thead>
          <tr className="table-dark">
            <th scope="col">Resource ID</th>
            <th scope="col">Resource Details</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredResource.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>No resource found.</td>
            </tr>
          ) : (
            filteredResource.map(resource => (
              <tr key={resource._id}>
                <td>{resource.resourceid}</td>
                <td><ul>
                    <h4 style={{color:"green",fontWeight:"bold"}}>{resource.heading}</h4>
                    <h6>{resource.type}</h6>
                    <h6><a href={resource.attach} target="_blank" rel="noopener noreferrer">
        {resource.attach}
      </a></h6>
                    </ul></td>
                <td><Link to={"edit/"+resource._id}><Button type="button" className="btn btn-danger" style={{ backgroundColor: 'green', border: 'none', width: '100px' }} >Edit</Button></Link></td>
                <td><DeleteButtonResource id={resource._id} onDelete={() => handleDelete(resource._id)} /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
