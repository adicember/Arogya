import { Link } from "react-router-dom";

const linkClass = "text-sm text-rose-100 underline hover:text-white";

const Footer = () => {
  return (
    <footer className="bg-[#451B28] px-4 py-10 font-sans text-white sm:px-8">
      <div className="mx-auto flex max-w-[1152px] flex-col gap-6">
        <p className="font-display text-2xl font-semibold text-rose-100">
          Arogya
        </p>

        {/* <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          <a href="#" className={linkClass}>
            Privacy policy
          </a>
          <a href="#" className={linkClass}>
            Terms
          </a>
          <Link to="/" className={linkClass}>
            How this works
          </Link>
          <Link to="/AboutPCOS" className={linkClass}>
            About PCOS
          </Link>
        </nav> */}

        <div className="border-t border-white/15 pt-5">
          {/* <p className="mb-2 text-sm font-semibold text-rose-200">
            Arogya: PCOS Detection
          </p> */}
          <p className="max-w-[900px] text-xs leading-relaxed text-ink-300">
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
