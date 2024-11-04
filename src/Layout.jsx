import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PropTypes from "prop-types";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Layout;
