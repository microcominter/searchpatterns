import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import store from './store/store.js';
import {Provider} from 'react-redux';
import SearchContext from './contextApi/SearchContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
const clientId="453103766731-nhv5i8kjeav683iue38sdis5vqfnmogj.apps.googleusercontent.com"

// Add this appearance configuration
const clerkAppearance = {
  elements: {
    footer: 'hidden'
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      afterSignOutUrl="/"
      appearance={clerkAppearance}  // Add this line
    >
      <Provider store={store}>
        <SearchContext>
          <GoogleOAuthProvider clientId={clientId}>
            <App />
          </GoogleOAuthProvider>
        </SearchContext>
      </Provider>
    </ClerkProvider>
    </BrowserRouter>
  
);

