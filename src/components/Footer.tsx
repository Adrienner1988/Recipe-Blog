const Footer = () => {
  return (
    <>
      <footer className="bg-darkPlum text-green text-lg p-2">
        <div className="flex justify-center space-x-6">
          <p className="text-center mb-1">
            {new Date().getFullYear()} Recipe Rainbow. All rights reserved.
          </p>
          <p className="text-center">Get in touch</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
