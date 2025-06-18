import About from "../components/About";
import CategoryListContainer from "../components/CategoryListContainer";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  return (
    <>
      {/* NEW SECTION: Discover a world of flavors */}
      <section className="container mx-auto grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
        <div className="text-center lg:text-left space-y-6">
          <main className="text-5xl md:text-6xl font-bold font-serif">
            <h1 className="inline">
              <span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
                Discover
              </span>{" "}
              a world of flavors
            </h1>
          </main>
          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            Explore thousands of recipes from around the globe. Your next
            favorite dish is just a search away.
          </p>
          
          <div className="relative flex flex-col sm:flex-row sm:space-x-4 justify-center lg:justify-start">
            <div className="relative w-full sm:w-auto">
              <SearchBar onSearch={() => {}} categories={[]} />
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2960&auto=format&fit=crop"
            alt="A vibrant salad in a bowl"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
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
