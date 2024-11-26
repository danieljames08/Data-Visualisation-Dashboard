import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateRealTimeData, setError } from '../redux/dataSlice';

export const useWebSocket = (url) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new WebSocket(url);

    // Handle WebSocket connection
    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    // Handle incoming messages
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('WebSocket message received:', data);
        dispatch(updateRealTimeData(data));
      } catch (error) {
        console.error('WebSocket message parsing error:', error);
        dispatch(setError('Error parsing WebSocket message.'));
      }
    };

    // Handle WebSocket errors
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      dispatch(setError('WebSocket error occurred.'));
    };

    // Handle WebSocket disconnection
    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, [url, dispatch]);
};
