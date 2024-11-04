import PropTypes from "prop-types";

function Preloader({ show }) {
  if (!show) {
    return null;
  }

  return (
    <div className="preloader">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

Preloader.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Preloader;
