import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Datatable = () => {
  const [data, setData] = useState([]);
  let [refres, setRefres]=useState(true)
  useEffect(() => {
    fetch(`http://localhost:3001/users/user-list`)
        .then((response) => response.json())
        .then((json) => {
            let map_id =json.map(user=>{
              return{...user, id:user._id}
            })
            setData(map_id)
        })
        .catch((e) => console.log(e))
}, [refres]);

  async function handleBan (user){
     await fetch(`http://localhost:3001/users/ban-user/${user._id}`,{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({isActive:!user.isActive})
    })

    setRefres(!refres)
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        console.log(params)
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className={`${params.row.isActive?"deleteButton":"activeButton"}`}
              onClick={() => handleBan(params.row)}
            >
              {
                params.row.isActive?"Ban":"Active"
              }
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Users
        
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        // checkboxSelection
      />
    </div>
  );
};

export default Datatable;
