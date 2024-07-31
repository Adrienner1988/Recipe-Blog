const HomePage = () => {
  return (
    <>
      <div className="relative w-full h-screen">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="src/video/groupFeast.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 text-center">
          <h1 className="text-3xl font-bold underline m-0 p-8 max-w-80px text-center text-gray-200">
            Welcome to Recipe Rainbow
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Explore and enjoy a variety of recipes from traditional and modern
            culinary worlds.
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
