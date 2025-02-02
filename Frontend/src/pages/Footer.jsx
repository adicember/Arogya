import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className=" bg-pink-900 text-white py-6">
      <div className="container mx-auto px-4">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-white text-xl"
          >
            <FaFacebook />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-white text-xl"
          >
            <FaInstagram />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-white text-xl">
            <FaTwitter />
          </a>
          <a href="#" aria-label="TikTok" className="hover:text-white text-xl">
            <FaTiktok />
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-4"></div>

        {/* Logo and Links */}
        <div className="text-center">
          <p className="text-sm mb-4 text-[#E1C7D0]">Arogya: PCOS Detection</p>

          {/* Footer Links */}
          {/* <div className="flex justify-center space-x-6">

            <a href="#" className="hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white text-sm">
              Security
            </a>
            <a href="#" className="hover:text-white text-sm">
              Website Accessibility
            </a>
            <a href="#" className="hover:text-white text-sm">
              Manage Cookies
            </a>
          </div> */}

          {/* Disclaimer Text */}
          <p className="text-xs text-gray-400 mt-4">
            Arogya is an informational tool designed to help users understand
            the potential presence of PCOS based on ultrasound images and other
            inputs. The results provided by this application are not intended to
            replace professional medical advice, diagnosis, or treatment. Always
            consult with a qualified healthcare professional for medical
            concerns and diagnosis. Arogya does not take into account individual
            medical history, symptoms, or other factors that may be relevant to
            your health.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
