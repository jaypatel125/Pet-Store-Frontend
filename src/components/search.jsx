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

function Pets() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter pets based on search term
  const filteredPets = pets.filter((pet) =>
    pet.animal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search">
      <h2>Pets</h2>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={handleSearch}
        variant="outlined"
        size="small"
        margin="normal"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "grey" }}>
              <TableCell>Animal</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPets.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell sx={{ width: "25%" }}>{pet.animal}</TableCell>
                <TableCell sx={{ width: "25%" }}>{pet.description}</TableCell>
                <TableCell sx={{ width: "25%" }}>{pet.age}</TableCell>
                <TableCell sx={{ width: "25%" }}>{pet.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Pets;
