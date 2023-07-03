import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';

// Importing them with Promise.all (by using HTTP/2 multiplexing) we can load them in parallel
// and achieve the best possible performance
Promise.all([import('@/Main'), import('@/App')])
  .then(([{ default: Main }, { default: App }]) => {
    const container = document.getElementById('root') as HTMLElement;
    createRoot(container).render(Main(App));
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// ts(1208)
export {};
