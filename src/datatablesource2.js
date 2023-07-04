import React from "react";
import axios from "axios";







export const userColumns = [
    { field: "emp_id", 
    headerName: "Emp ID", 
    width: 70 },

    {
      field: "emp_name",
      headerName: "Employee Name",
      width: 230,
    },
    {
      field: "allocation_type",
      headerName: "AllocationType",
      width: 230,
    },
  
    {
      field: "band_latest",
      headerName: "BandLatest",
      width: 100,
    },
    {
        field: "joining_date_ss",
        headerName: "JoiningDate",
        width: 100,
    },
    {
        field: "joning_date_tesco_account",
        headerName: "Tesco JoiningDate",
        width: 100,
    },
    {
        field: "engagement",
        headerName: "Engagement",
        width: 100,
    },
    {
        field: "team",
        headerName: "Team Name",
        width: 100,
    },
    {
        field: "line_manager",
        headerName: "Line Manager",
        width: 100,
    },
    {
        field: "office_location",
        headerName: "Base Location",
        width: 100,
    },
    {
        field: "gender",
        headerName: "Gender",
        width: 100,
    },
    {
        field: "employee_otl_code",
        headerName: "OTL Code",
        width: 100,
    },
    {
        field: "experience_in_ssg",
        headerName: "SSG Exp",
        width: 100,
    },
    {
        field: "experience_in_tesco",
        headerName: "Tesco Exp",
        width: 100,
    },
    
    {
        field: "contact_number",
        headerName: "Contact Number",
        width: 100,
    },
    {
        field: "role_1",
        headerName: "Role",
        width: 100,
    },

    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.Status}`}>
            {params.row.Status}
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
  },
  {
    field: "pam_project_name",
    headerName: "PamProjectName",
    width: 100,
},
{
  field: "role_type",
  headerName: "Role",
  width: 100,
},

  ];
  
  //temporary data
  
  