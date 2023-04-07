import React from 'react';
import { useQuery } from 'react-query';
import './App.css';

function App() {

  //fetch data
  const apiFetch = () =>
    fetch(`https://api.datamuse.com/words?rel_syn=${debouncedWord}`)
      .then((res) => res.json()
      );

  // Set up the state for the input value and the API query result
  const [word, setWord] = React.useState('');
  const [debouncedWord, setDebouncedWord] = React.useState('');
  const { isLoading, error, data } = useQuery(['thesaurus', debouncedWord], apiFetch);

  // Delay the API request until the user has finished typing
  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedWord(word);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [word]);

  // Define a function to handle the input change
  function handleInputChange(event) {
    setWord(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Thesaurus</h1>
          <input type="text" value={word} onChange={handleInputChange} />
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && (
            <ul>
              {data.map((result) => (
                <li key={result.word} >{result.word}</li>
              ))}
            </ul>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
