// import { SlSocialLinkedin } from "react-icons/sl";
// import { SlSocialGithub } from "react-icons/sl";
// import { SlSocialGoogle } from "react-icons/sl";

const Footer = () => {
  return (
    <>
      <footer className="bg-green bg-secondary text-secondary-foreground">
        {/* This div is your main grid container */}
        <div className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1: Recipe Rainbow Info */}
          <div>
            <a href="/" className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              {/* If you have the CookingPot icon, uncomment this line */}
              {/* <CookingPot className="h-8 w-8 text-primary" /> */}
              <span className="text-xl font-bold">Recipe Rainbow</span>
            </a>
            <p className="text-sm">&copy; 2024 Recipe Rainbow. All rights reserved.</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#categories" className="hover:text-primary transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Submit a Recipe</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Follow Us (Uncommented for full layout) */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              {/* If you have these icons, uncomment them */}
              {/* <a href="#" className="hover:text-primary transition-colors"><Twitter /></a>
              <a href="#" className="hover:text-primary transition-colors"><Facebook /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram /></a> */}
              {/* Placeholder text for icons if not imported */}
              <span>Twitter</span>
              <span>Facebook</span>
              <span>Instagram</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="bg-primary text-primary-foreground py-4 text-center">
          <p className="text-sm">Made with ❤️ by <a href="" className="text-secondary hover:text-secondary-foreground transition-colors">Adrienne</a></p>
        </div>
      </footer>
   
    </>
  );
};

export default Footer;
