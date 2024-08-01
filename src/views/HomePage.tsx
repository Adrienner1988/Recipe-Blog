const HomePage = () => {
  return (
    <>
      <section>
        <div className="relative w-full h-screen">
          {/* Video Background */}
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
          >
            <source src="src/video/feast.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-center">
            <h1 className="text-4xl font-bold underline m-0 p-8 max-w-80px text-center text-grayLight">
              Welcome to Recipe Rainbow
            </h1>
            <p className="text-lg md:text-xl text-grayLight">
              Explore and enjoy a variety of recipes from traditional and modern
              culinary worlds.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h1 className="text-3xl font-bold p-8 text-lightPlum ">
          Latest Recipes
        </h1>
        <div>
          <img src="" />
          <img src="" />
          <img src="" />
        </div>
      </section>
    </>
  );
};

export default HomePage;
