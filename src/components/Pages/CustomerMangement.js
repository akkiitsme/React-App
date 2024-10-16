import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import axios from '../../axios';
import { Button } from '@mui/material';

const CustomerManagementPage = ({ onEdit }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittingRows, setSubmittingRows] = useState({}); 

  const handleEdit = (id) => {
    console.log("Edit ID:", id);
    onEdit(id);
  };

  const handleDelete = (id) => {
    setSubmittingRows((prev) => ({ ...prev, [id]: true })); 
    console.log("Delete ID:", id);
    
    axios.delete(`/test/delete-user/${id}`)
      .then((response) => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
        console.log("User deleted successfully");
      })
      .catch((error) => {
        alert(error);
        console.error("Error deleting user:", error);
      })
      .finally(() => {
        setSubmittingRows((prev) => ({ ...prev, [id]: false })); 
      });
  };

  useEffect(() => {
    axios.get("/test/user-list")
      .then((response) => {
        const transformedData = response.data.map((item) => ({
          ...item,
          id: item.id,
          status: item.status ===true ? 'Active' : 'Inactive'
        }));
        setData(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phoneNo", headerName: "Mobile No", width: 150 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "actions", headerName: "Action", width: 180,
      renderCell: (params) => (
        <div>
          <Button variant="contained" color="success" onClick={() => handleEdit(params.row.id)}>Edit</Button>
          <Button
            variant="contained"
            color="error"
            disabled={submittingRows[params.row.id]} // Disable only if this row is submitting
            startIcon={submittingRows[params.row.id] ? <CircularProgress size={20} /> : null}
            onClick={() => handleDelete(params.row.id)}
            style={{ marginLeft: 8 }}
          >
            {submittingRows[params.row.id] ? "Deleting..." : "Delete"}
          </Button>
        </div>
      )
    }
  ];

  return (
    <Box>
      <Typography variant="h4">Customer Management</Typography>
      <Box sx={{ height: 400, width: '95%' }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
            checkboxSelection
          />
        )}
      </Box>
    </Box>
  );
};

export default CustomerManagementPage;
