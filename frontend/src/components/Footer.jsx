import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        <div className="footer-brand">
          <h2>Wonest</h2>
          <p>
            Connecting skilled local workers with customers.
            Fast, reliable and trusted services near you.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="#">Services</a>
          <a href="#">Workers</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>

        <div className="footer-services">
          <h3>Services</h3>

          <a href="#">Carpenter</a>
          <a href="#">Plumber</a>
          <a href="#">Electrician</a>
          <a href="#">Painter</a>
          <a href="#">AC Technician</a>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>

          <p>📍 Kerala, India</p>
          <p>📞 +91 9876543210</p>
          <p>✉️ support@wonest.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Wonest. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;