import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HttpClient } from './apis/HttpClient';
import { SearchService } from './services/SearchService';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

const initialUrl: string = process.env.REACT_APP_INITIAL_URL || 'http://localhost:4000';

export const httpClient = new HttpClient(initialUrl);

export const searchService = new SearchService(httpClient);
