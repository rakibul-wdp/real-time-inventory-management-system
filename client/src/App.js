import React, { useEffect } from "react";
import AllRoutes from "./Routes/AllRoutes";
import Navbar from "./components/Navbar/Navbar";
import socket from "socket.io-client";

function App() {
  useEffect(() => {
    const io = socket('https://digital-crew-assignment-a8ld.vercel.app');
    io.on('connect', () => {
      console.log('Connected to server');
    })

    io.on('product_create', (data) => {
      console.log(data)
      const { title } = data
      alert(`New Product Created Title: ${title}`)
    })

    io.on('product_delete', (data) => {
      console.log(data)
      const { title } = data
      alert(`One Product Deleted Title: ${title}`)
    })

    io.on('disconnect', () => {
      console.log('Disconnected from server');
    })

    return () => io.disconnect();

  }, [])

  return (
    <div>
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
