import './App.css';
import HomeDashboard from './pages/homeDashboard';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setError } from './components/redux/dataSlice';
import { useWebSocket } from './components/hooks/useWebSocket';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const dispatch = useDispatch();
  
  // Fetch real-time data using WebSocket
  const url = 'ws://localhost:8080';  // WebSocket URL
  useWebSocket(url);  // Custom hook for WebSocket handling

  const { loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    // Error handling and loading state logic
    if (error) {
      console.error('Error:', error);
    }
  }, [error]);

  return (
    <div className="App">
      {loading && <div>Loading...</div>} {/* Show loading state */}
      {error && <div className="error">{error}</div>} {/* Show error state */}

      <HomeDashboard />
    </div>
  );
}

export default App;
