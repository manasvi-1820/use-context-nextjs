import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Col, Row, Container } from "react-bootstrap";
import Link from "next/link";
import { Config } from "../config";

export async function getStaticProps() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  return {
    props: {
      products,
    },
  };
}

function Home({ products }) {
  // console.log("data", products);
  return (
    <div className={styles.container}>
      <Head>
        <title>LocalStorage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container style={{ marginTop: "30px" }}>
        <Row>
          <h2 className="text-center">Products</h2>
          {products.map((product, index) => {
            return (
              <Link href={`/products/${product.id}`} key={index + "products"}>
                <Col
                  xl={3}
                  lg={4}
                  md={6}
                  sm={6}
                  style={{ marginBottom: "10px" }}
                  key={product.id}
                >
                  <div
                    className="card h-100 text-center p-4"
                    // onClick={() => SubmitOrder(product)}
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
              </Link>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

// Home.getInitialProps = async () => {
//   const response = await fetch(Config.BaseUrl + "/products");
//   // const response = await fetch(`https://fakestoreapi.com/products`);
//   const products = await response.json();
//   console.log("data1", products);
//   return {
//     props: {
//       products,
//     },
//   };
// };

export default Home;
