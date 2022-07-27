import React, { useContext, useState, useEffect } from "react";
import { OrderContext } from "../components/OrderContext";
import { Col } from "react-bootstrap";
import Head from "next/head";

const Details = () => {
  const { order, setOrder } = useContext(OrderContext);
  console.log("cart", order);
  const [demo, setDemo] = useState([]);

  const ClearStorage = () => {
    if (typeof window !== "undefined") {
      setOrder([]);
      setDemo([]);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDemo(order);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Product Details</title>
        <meta name="description" content="About at my store !" />
        <meta property="og:title" content="About Us - My Clothing Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{ display: "flex", justifyContent: "center", height: "100vh" }}
      >
        <div className="text-center">
          <>
            {demo.length > 0 ? (
              <div>
                <h4>You can refresh page</h4>
                <button onClick={ClearStorage}>Clear Order Storage</button>
              </div>
            ) : (
              <h4 className="mt-5 text-danger">Local Storage is now null</h4>
            )}
            {demo.map((product, index) => {
              return (
                <Col xl={12} lg={12} key={index + "product"}>
                  <h1 className="text-center text-info text-decoration-underline">
                    LocalStorage with useContext
                  </h1>
                  ;
                  <div
                    className="card h-100 text-center p-4"
                    onClick={() => Click(product)}
                  >
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.title}
                      height="250px"
                    />
                    <div className="card-body">
                      <h5 className="card-title mb-0">
                        {product.title.substring(0, 15)}...
                      </h5>
                      <p className="card-text lead fw-bold">${product.price}</p>
                    </div>
                  </div>
                </Col>
              );
            })}
          </>
        </div>
      </div>
    </>
  );
};

export default Details;
