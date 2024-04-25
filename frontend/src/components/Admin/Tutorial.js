import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Pagination, Input, Button } from "antd";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import { Popconfirm } from "antd";
import { DeleteFilled, EditOutlined, SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { PDFDownloadLink, PDFViewer, Document, Page, View, Text } from '@react-pdf/renderer';


export default function Tutorial() {

  const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    const handlePaginationChange = (value) => {
        if (value === 1) {
            setPage(1);
        } else {
            setPage(value);
        }
    };

    const handleDelete = (productId) => {
        axios.delete(`http://localhost:5000/products/${productId}`)
            .then(() => {
                setProducts(products.filter(product => product._id !== productId));
            })
            .catch(err => {
                alert(err.message);
            });
    };


  return(
    <>
          <h1>All Tutorials</h1>

     <Input
                placeholder="Search by Tutorial Heading"
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: "20px", width: "300px", marginLeft: "650px", marginTop: "50px" }}
            />
                  <Link to={"/admin/resources/add"}><Button type="primary" style={{marginLeft:"200px"}}>Add</Button></Link>

            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: "50px",
            }}>
                {products
                    .filter((product) =>
                        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .slice((page - 1) * 4, page * 4)
                    .map((product) => (
                        <div key={product._id}>
                            <Card
                                style={{
                                    width: 300,
                                    boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px"
                                }}
                                cover={
                                    <img
                                        alt={product.productName}
                                        src={product.imageUrl}
                                        style={{
                                            objectFit: "cover",
                                            height: "200px",
                                            width: "100%",
                                        }}
                                    />
                                }
                                actions={[
                                    <Link to={`/edit/${product._id}`}>
                                        <EditOutlined
                                            key="edit"
                                            style={{
                                                color: "green",
                                            }}
                                        />
                                    </Link>,
                                    <Popconfirm
                                        title="Are you sure to delete this product?"
                                        onConfirm={() => handleDelete(product._id)}
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
                                    title={product.productName}
                                    description={
                                        <div>
                                            <p>Price: {product.productPrice} LKR </p>
                                            <p>New Discount: {product.discount} LKR </p>
                                            <p>New Price: {product.productPrice} LKR </p>
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
                total={products.length}
                defaultPageSize={4}
                onChange={handlePaginationChange}
            />
            <div style={{ textAlign: "center" }}>
                <PDFDownloadLink document={<PdfDocument data={products} />} fileName="discount_details.pdf">
                    <Button type="primary" icon={<DownloadOutlined />}>Download PDF</Button>
                </PDFDownloadLink>
            </div>
    </>
  )
}


// PDF Document Component
const PdfDocument = ({ data }) => (
  <Document>
      <Page>
          <View style={{ padding: 10 }}>
              <Text style={{ marginBottom: 10 }}>Discount Details</Text>
              {data.map((product, index) => (
                  <View key={product._id} style={{ marginBottom: index < data.length - 1 ? 20 : 0 }}>
                      <Text>{product.productName}</Text>
                      <Text>Price: {product.productPrice} LKR</Text>
                      <Text>Discount: {product.discount} LKR</Text>
                  </View>
              ))}
          </View>
      </Page>
  </Document>
);

