import Head from "next/head";

const Layout = props => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no"
        />
        <meta httpEquiv="content-type" content="text/html;charset=UTF-8" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/fav.png" type="image/png" sizes="16x16" />
        <title>{props.title}</title>
      </Head>

      <>{props.children}</>

      {/* <footer className="container mx-auto bg-red-500">
        <p>
          Developed by <a>{"<CodeKagei />"}</a>
        </p>
      </footer> */}

      <style jsx global>
        {`
          // html {
          //   font-size: 62.5% !important;
          // }

          // @media only screen and (max-width: 600px) {
          //   html {
          //     font-size: 31.25% !important;
          //   }
          // }
        `}
      </style>
    </>
  );
};

export default Layout;
