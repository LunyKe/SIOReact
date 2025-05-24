const home = () => {
    function FetchAPI() {
        fetch("http://localhost:3000/sett")
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => FetchAPI()}>Go API</button>
        </div>
    );}

    export default home;
