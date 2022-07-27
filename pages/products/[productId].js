import styles from "../../styles/Home.module.css";
import Head from "next/head";

export default function Product({ productId, title }) {
  // console.log("id", productId);
  // console.log("title", title);
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}- My Clothing Store</title>
        <meta name="description" content={`Learn more about ${title}`} />
        <meta property="og:title" content={` ${title}- My Clothing Store}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Product Name: {title}</h1>
        <p>Product ID:{productId}</p>
      </main>
    </div>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  console.log("params", params);
  console.log("params1", params.productId);
  console.log("params2", params.productName);
  return {
    props: {
      productId: params.productId,
      // title: String(params.productName),
      title: `Product ${params.productId}`,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch("https://fakestoreapi.com/products");
  const responseJson = await response.clone().json();
  // console.log("responseJson", responseJson);
  const paths = responseJson.map((i, index) => {
    // console.log("index", i.id);
    // console.log("i", i.title);
    return {
      params: {
        productId: `${i.id}`,
        productName: `${i.title}`,
      },
    };
  });
  // console.log("paths", paths);
  return {
    paths,
    fallback: false,
  };
}
