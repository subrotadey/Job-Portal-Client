import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FaApple, FaGooglePlay } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../../../assets/job-logo.png";

const Footer = () => {
  return (
    <footer className="bg-base-100 text-base-content border-t">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-10 md:grid-cols-5">
        {/* Logo + Description */}
        <div>
          <div className="flex items-center gap-2">
            <img className="w-20" src={logo} alt="" />
            <span className="text-2xl font-bold text-primary uppercase">JobBox</span>
          </div>
          <p className="mt-4 text-sm">
            JobBox is the heart of the design community and the best resource to discover and connect with designers and jobs worldwide.
          </p>
          <div className="flex gap-4 mt-4 text-xl text-primary">
            <Link to="/"><FaFacebookF className="cursor-pointer hover:text-blue-500" /></Link>
            <Link to="/"><FaTwitter className="cursor-pointer hover:text-sky-400" /></Link>
            <Link to="/"><FaLinkedinIn className="cursor-pointer hover:text-blue-700" /></Link>
          </div>
        </div>

        {/* Resources */}
        <ul>
          <span className="footer-title">Resources</span>
          <li><Link className="link link-hover">About us</Link></li>
          <li><Link className="link link-hover">Our Team</Link></li>
          <li><Link className="link link-hover">Products</Link></li>
          <li><Link className="link link-hover">Contact</Link></li>
        </ul>

        {/* Community */}
        <ul>
          <span className="footer-title">Community</span>
          <li><Link className="link link-hover">Feature</Link></li>
          <li><Link className="link link-hover">Pricing</Link></li>
          <li><Link className="link link-hover">Credit</Link></li>
          <li><Link className="link link-hover">FAQ</Link></li>
        </ul>

        {/* Quick Links */}
        <ul>
          <span className="footer-title">Quick links</span>
          <li><Link className="link link-hover">iOS</Link></li>
          <li><Link className="link link-hover">Android</Link></li>
          <li><Link className="link link-hover">Microsoft</Link></li>
          <li><Link className="link link-hover">Desktop</Link></li>
        </ul>

        {/* Download App */}
        <div>
          <span className="footer-title">Download App</span>
          <p className="text-sm mb-4">Download our Apps and get extra 15% Discount on your first Order...!</p>
          <div className="flex gap-2">
            <button className="btn btn-primary btn-sm gap-2">
              <FaApple className="text-lg" />
              App Store
            </button>
            <button className="btn btn-primary btn-sm gap-2">
              <FaGooglePlay className="text-lg" />
              Google Play
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t py-4 text-sm flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-4">
        <p>Copyright © 2025. JobBox all right reserved</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link to="/privacy-policy" className="link link-hover">Privacy Policy</Link>
          <Link to="/terms-conditions" className="link link-hover">Terms & Conditions</Link>
          <Link to="/security" className="link link-hover">Security</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;