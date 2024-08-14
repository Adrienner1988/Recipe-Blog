import CategoryList from "../components/CategoryList";

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
            <h1 className="text-6xl font-bold underline m-0 p-8 max-w-80px text-center text-grayLight">
              Recipe Rainbow
            </h1>
            <p className="text-lg md:text-xl p-2 text-green bg-darkPlum bg-opacity-60 font-semibold">
              Explore and enjoy a variety of recipes from traditional and modern
              culinary worlds.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-lightPlum p-8">
          <h2 className="text-3xl font-bold m-0 text-center text-green uppercase">
            About
          </h2>
          <p className="text-lg md:text-xl p-8 text-center text-grayLight">
            Recipe Rainbow is a vibrant and inclusive platform that celebrates
            the diversity of culinary traditions from around the world. It
            allows users to discover new recipes, share their own culinary
            creations, and connect with a community of food enthusiasts. The
            platform is designed to be a colorful and engaging space where every
            dish is a part of a beautiful culinary spectrum.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold p-8 text-lightPlum ">
          Recipe Categories
        </h2>
        <div>
          {/* <CategoryList /> */}
        </div>
      </section>
    </>
  );
};

export default HomePage;
