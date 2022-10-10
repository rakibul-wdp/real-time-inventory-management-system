import React from 'react'
import { Routes, Route } from 'react-router-dom';
import InventoryCard from '../components/InventoryCard/InventoryCard';
import InventoryDetails from '../components/InventoryDetails/InventoryDetails';

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<InventoryCard />} />
      <Route path="/inventory/:id" element={<InventoryDetails />} />
      <Route path="*" element={<InventoryCard />} />
    </Routes>
  )
}
