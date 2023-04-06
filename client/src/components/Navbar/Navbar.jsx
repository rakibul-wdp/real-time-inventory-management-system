import React, { useState } from 'react'
import './Navbar.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { postInventoryData } from '../../Redux/action';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, useDisclosure, Input, Button } from "@chakra-ui/react";
import { AiOutlinePlusCircle } from "react-icons/ai"

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [input, setInput] = useState({
    title: "",
    image: "",
    description: "",
    category: "",
    price: "",
  });

  const postItem = async (data) => {
    try {
      const res = await axios.post("https://digital-crew-assignment-a8ld.vercel.app/inventory",
        data,
      );
      dispatch(postInventoryData(res.data.data));
      onClose()
      setInput({
        title: "",
        image: "",
        description: "",
        category: "",
        price: "",
      })
    } catch (error) {
      alert("check all your inputs");
    }
  }

  const handleSubmit = () => {
    postItem(input);
  }

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <nav>
        <h1 className="nav-title" onClick={() => { navigate(`/`); }}>Inventory System</h1>

        <div>
          <button id="add-product-btn" onClick={onOpen}>
            <AiOutlinePlusCircle style={{ display: "inline", fontSize: "20px" }} /> <span>ADD PRODUCT</span>
          </button>
        </div>
      </nav>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={5}>
              <Input
                type="text"
                name="title"
                placeholder='Add Title'
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={5}>
              <Input
                type="text"
                name="image"
                placeholder='Add Image Link'
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={5}>
              <Input
                type="text"
                name="category"
                placeholder='Add Category'
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={5}>
              <Input
                type="text"
                name="description"
                placeholder='Add Description'
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={5} >
              <Input
                type="number"
                name="price"
                placeholder='Add Price'
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='whatsapp' onClick={handleSubmit}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}