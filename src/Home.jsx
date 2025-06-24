const Home = () => {
  function FetchAPI() {
    fetch("http://localhost:3000/sett")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 sm:p-8">
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6">
        Bienvenue sur ma première Application sous React
      </h1>
      <button
        onClick={FetchAPI}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition text-base sm:text-lg"
      >
        Go API
      </button>
    </div>
  );
};

export default Home;