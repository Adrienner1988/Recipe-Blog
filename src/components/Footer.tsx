import { SlSocialLinkedin } from "react-icons/sl";
import { SlSocialGithub } from "react-icons/sl";
import { SlSocialGoogle } from "react-icons/sl";

const Footer = () => {
  return (
    <>
      <footer className="bg-darkPlum text-green text-lg p-2 mt-10">
        <div className="flex flex-col items-center space-y-2">
          <p className="text-center mb-1">&copy;
            {new Date().getFullYear()} Recipe Rainbow. All rights reserved.
          </p>
          <p className="text-center mb-1">Get in touch</p>
          {/* Social icons */}
          <div className="flex space-x-4 mt-2">
            <a
              href="https://www.linkedin.com/in/adriennerdaniels/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-grayDark focus:text-blue-500"
            >
              <SlSocialLinkedin size={30} className="transition-colors duration-300"/>
            </a>
            <a
              href="https://github.com/Adrienner1988"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-grayDark"
            >
              <SlSocialGithub size={30} className="transition-colors duration-300"/>
            </a>
            <a
              href="mailto:adriennerdaniels@gmail.com"
              target="_blank"
              className="hover:text-grayDark"
            >
              <SlSocialGoogle size={30} className="transition-colors duration-300"/>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
