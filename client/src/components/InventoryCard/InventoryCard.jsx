import React, { useEffect } from 'react'
import "./InventoryCard.css"
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios'
import { fetchInventoryData } from '../Redux/action';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteInventoryData } from '../Redux/action';

export default function InventoryCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(data => data)
  const display = async () => {
    try {
      const res = await axios.get("https://digital-crew-assignment-a8ld.vercel.app/inventory");
      dispatch(fetchInventoryData(res.data.data));

    } catch (error) {
      console.log(error);
    }
  }
  const handleClick = (id) => {
    navigate(`/inventory/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`https://digital-crew-assignment-a8ld.vercel.app/inventory/${id}`);
      dispatch(deleteInventoryData(id));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    display();
  }, [])
  return (
    <div>
      <div className="container">
        {state.inventoryData && state.inventoryData.length > 0 ? state.inventoryData.map((el, i) => {
          return (
            <div className="card" key={i.toString()} >
              <img
                onClick={() => handleClick(el._id)}
                src={el.image}
                alt="Inventory"
              />
              <div className="card-body">
                <h2 className="card-title" onClick={() => handleClick(el._id)}>{el.title}</h2>
                <p className="card-price">${el.price}</p>
                <div className="card-buttons">
                  <button className="edit-button" >
                    <FaEdit />
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(el._id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          )
        })
          : "Loading..."
        }
      </div>
    </div>
  )
}
