import banner from "../assets/banner.jpg";

export default function Banner() {
  return (
    <div className="banner">
      <img alt="К весне готовы!" className="img-fluid" src={banner} />
      <h2 className="banner-header">К весне готовы!</h2>
    </div>
  );
}
