
// Define the URL for fetching a random quote
const url = 'https://api.quotable.io/random';

// Define the main React component
function App() {
  // State to hold the quote and background color
  const [quote, setQuote] = React.useState({});
  const [backgroundColor, setBackgroundColor] = React.useState('#1e9f83'); // Initial background color

  // Function to fetch data from the API
  const fetchData = async () => {
    // Fetch data from the API
    const response = await fetch(url);
    // Parse the JSON response
    const data = await response.json();
    // Update the state with the fetched quote data
    setQuote(data);
  };

  // Effect hook to fetch data when the component mounts
  React.useEffect(() => {
    fetchData();
  }, []);

  // Function to get a new quote
  const getNewQuote = () => {
    // Generate a random color
    const randomColor = getRandomColor();
    // Set the new background color
    setBackgroundColor(randomColor);

    // Fetch a new quote after a brief delay
    setTimeout(() => {
      fetchData();
    }, 500);
  };

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // JSX for the component
  return (
    <div
      // Container with fluid layout, centered vertically and horizontally
      className="container-fluid d-flex align-items-center justify-content-center vh-100"
      // Inline style to set the background color with a transition effect
      style={{ backgroundColor: backgroundColor, transition: 'background-color .8s' }}
    >
      {/* Main Quote Box */}
      <div id="quote-box" className="bg-light p-4 text-center rounded-lg position-relative flex-column ">
        {/* Quote Content */}
        <blockquote>
          <p id="text">"{quote.content}"</p>
        </blockquote>

        {/* Author */}
        <p id="author" className="font-italic">-{quote.author}</p>

        {/* Button to Get New Quote */}
        <button id="new-quote" onClick={getNewQuote}>
          Get New Quote
        </button>

        {/* Twitter Button */}
        <div className="mt-auto text-left">
          <button id="tweet">
            {/* Twitter Icon */}
            <a id="tweet-quote" href="https://twitter.com/intent/tweet">
              <i class="fa-brands fa-twitter"></i>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

// Render the component to the 'app' element
ReactDOM.render(<App />, document.getElementById('app'));
