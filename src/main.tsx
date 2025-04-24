import { StrictMode } from 'react'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import ItsTooBad from './ItsTooBad.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<App />} />
        <Route path="/ItsTobadYoureLeaving" element={<ItsTooBad />} />
        {/* <Route path="/about" element={<Info />} /> */}
      </Routes>
     
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
