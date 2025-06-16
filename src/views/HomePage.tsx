import About from "../components/About";
import CategoryListContainer from "../components/CategoryListContainer";

const HomePage = () => {
  return (
    <>
      <section>
        <div className="relative w-full h-screen">
          {/* Image Background for smaller screens */}
          <img
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="/feastStill.jpg"
            alt="Background"
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-center">
            <h1 className="text-6xl font-bold underline m-0 p-8 max-w-80px text-center text-lightPlum">
              Recipe Rainbow
            </h1>
          </div>
        </div>
      </section>

      <section>
        <div>
          <About />
          <CategoryListContainer />
        </div>
      </section>
    </>
  );
};

export default HomePage;
