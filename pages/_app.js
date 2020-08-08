import App from "next/app";
// import NProgress from "nprogress";
// import Router from "next/router";

import "bootstrap/dist/css/bootstrap.min.css";
import "../public/sass/main.scss";
import "react-widgets/dist/css/react-widgets.css";
// import "nprogress/nprogress.css";

// Router.events.on("routeChangeStart", url => {
//   // console.log(`Loading: ${url}`);
//   NProgress.start();
// });
// Router.events.on("routeChangeComplete", () => NProgress.done());
// Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps}></Component>;
  }
}

export default MyApp;
