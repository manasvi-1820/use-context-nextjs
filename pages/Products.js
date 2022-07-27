import React from "react";
import { useContext, useState, useEffect } from "react";
import { OrderContext } from "../components/OrderContext";
import { Col, Row, Container } from "react-bootstrap";
import { useRouter } from "next/router";

const Products = () => {
  const route = useRouter();
  const { setOrder } = useContext(OrderContext);
  const [myOrder, setMyOrder] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      setMyOrder(await response.clone().json());
    };
    getProducts();
  }, []);

  const SubmitOrder = (product) => {
    route.push("/Details");
    setOrder([product]);
  };

  return (
    <div>
      <Container style={{ marginTop: "30px" }}>
        <Row>
          <h2 className="text-center">Products</h2>
          {myOrder.map((product, index) => {
            return (
              <Col
                xl={3}
                lg={4}
                md={6}
                sm={6}
                style={{ marginBottom: "10px" }}
                key={index + "products"}
              >
                <div
                  className="card h-100 text-center p-4"
                  onClick={() => SubmitOrder(product)}
                >
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    height="250px"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">{product.title}</h5>
                    <p className="card-text lead fw-bold">${product.price}</p>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Products;
