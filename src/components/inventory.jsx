// I Jay Patel, 000881881 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancleIcon from "@mui/icons-material/Cancel";
import "../App.css";

function Pets() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [pets, setPets] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [formData, setFormData] = useState({
    animal: "",
    description: "",
    age: "",
    price: "",
  });
  const [editingPetId, setEditingPetId] = useState(null);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = () => {
    fetch("http://localhost:3001/api?act=getall")
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setPets(result);
      });
  };

  const addPet = () => {
    fetch(
      `http://localhost:3001/api?act=add&animal=${formData.animal}&description=${formData.description}&age=${formData.age}&price=${formData.price}`
    )
      .then((res) => res.json())
      .then(() => {
        fetchPets();
        setFormData({
          animal: "",
          description: "",
          age: "",
          price: "",
        });
      });
  };

  const deletePet = (id) => {
    fetch(`http://localhost:3001/api?act=delete&id=${id}`)
      .then((res) => res.json())
      .then(() => {
        fetchPets();
      });
  };

  const updatePet = (id, newData) => {
    fetch(
      `http://localhost:3001/api?act=update&id=${id}&animal=${newData.animal}&description=${newData.description}&age=${newData.age}&price=${newData.price}`
    )
      .then((res) => res.json())
      .then(() => {
        fetchPets();
      });
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setPets((prevPets) =>
      prevPets.map((pet) => (pet.id === id ? { ...pet, [name]: value } : pet))
    );
  };

  const handleEdit = (id) => {
    setEditingPetId(id);
  };

  const handleSave = (id) => {
    const updatedPet = pets.find((pet) => pet.id === id);
    updatePet(id, updatedPet);
    setEditingPetId(null);
  };

  const handleCancel = () => {
    setEditingPetId(null);
  };

  return (
    <div className="inventory">
      <h2>Pets</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "gray" }}>
              <TableCell sx={{ width: "20%" }}>Animal</TableCell>
              <TableCell sx={{ width: "20%" }}>Description</TableCell>
              <TableCell sx={{ width: "10%" }}>Age</TableCell>
              <TableCell sx={{ width: "10%" }}>Price</TableCell>
              <TableCell sx={{ width: "20%" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pets.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell>
                  {editingPetId === pet.id ? (
                    <TextField
                      name="animal"
                      value={pet.animal}
                      onChange={(e) => handleInputChange(e, pet.id)}
                      size="small"
                    />
                  ) : (
                    pet.animal
                  )}
                </TableCell>
                <TableCell>
                  {editingPetId === pet.id ? (
                    <TextField
                      name="description"
                      value={pet.description}
                      onChange={(e) => handleInputChange(e, pet.id)}
                      size="small"
                    />
                  ) : (
                    pet.description
                  )}
                </TableCell>
                <TableCell>
                  {editingPetId === pet.id ? (
                    <TextField
                      name="age"
                      value={pet.age}
                      onChange={(e) => handleInputChange(e, pet.id)}
                      size="small"
                    />
                  ) : (
                    pet.age
                  )}
                </TableCell>
                <TableCell>
                  {editingPetId === pet.id ? (
                    <TextField
                      name="price"
                      value={pet.price}
                      onChange={(e) => handleInputChange(e, pet.id)}
                      size="small"
                    />
                  ) : (
                    pet.price
                  )}
                </TableCell>
                <TableCell>
                  {editingPetId === pet.id ? (
                    <>
                      <Button
                        variant="outlined"
                        startIcon={<SaveIcon />}
                        onClick={() => handleSave(pet.id)}
                        sx={{ mr: 1 }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<CancleIcon />}
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(pet.id)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                  )}
                  {editingPetId !== pet.id && (
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => deletePet(pet.id)}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <h2>Add Pet</h2>
      <TextField
        label="Animal"
        name="animal"
        value={formData.animal}
        onChange={(e) => setFormData({ ...formData, animal: e.target.value })}
        sx={{ mr: 1 }}
        size="small"
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        sx={{ mr: 1 }}
        size="small"
      />
      <TextField
        label="Age"
        name="age"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        sx={{ mr: 1 }}
        size="small"
      />
      <TextField
        label="Price"
        name="price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        sx={{ mr: 1 }}
        size="small"
      />
      <Button variant="contained" onClick={addPet}>
        Add Pet
      </Button>
    </div>
  );
}

export default Pets;
