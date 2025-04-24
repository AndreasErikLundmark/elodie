import { StrictMode } from 'react'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Routes>
      </Routes>
      <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
