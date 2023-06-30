import React from "react";
import "./App.css";
import Row from "./components/Row";
import requests from "./requests";
import Banner from "./components/Banner";
import Nav from "./components/Nav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient({});
  const requestsList = [
    {
      title: "Trending Now",
      fetchUrl: requests.fetchTopRated,
      isLargeRow: true,
    },
    { title: "Top Rated", fetchUrl: requests.fetchTopRated },
    { title: "Action Movies", fetchUrl: requests.fetchActionMovies },
    { title: "Comedy Movies", fetchUrl: requests.fetchComedyMovies },
    { title: "Horror Movies", fetchUrl: requests.fetchHorrorMovies },
    { title: "Romance Movies", fetchUrl: requests.fetchRomanceMovies },
    { title: "Documentaries", fetchUrl: requests.fetchDocumentaries },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Nav />
        <Banner />
        {requestsList.map((request, index) => (
          <Row key={index} {...request} />
        ))}
      </div>
    </QueryClientProvider>
  );
}

export default App;
