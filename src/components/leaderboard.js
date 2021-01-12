import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import userService from "../services/user.service";
function LeaderBoard() {
  const columns = [
    {
      name: "UserName",
      selector: "Username",
      sortable: true,
    },
    {
      name: "Score",
      selector: "Score",
      sortable: true,
    },
    {
      name: "Victory",
      selector: "WinBattle",
      sortable: true,
    },
    {
      name: "Defeat",
      selector: "DefeatBattle",
      sortable: true,
    },
    {
      name: "Draw",
      selector: "DrawBattle",
      sortable: true,
    },
  ];
  const [users, SetUsers] = useState([]);
  const [clone, SetClones] = useState([]);
  const [input, SetInput] = useState("");
  const handleClick = (row) => {
    console.log(row);
    window.location.href = `users/${row.ID}`;
  };
  useEffect(async () => {
    const usrs = await userService.getAllUser();
    const res = await usrs.json();
    console.log(res);
    if (res) {
      SetUsers(res);
      SetClones(res);
    }
  }, []);

  const conditionalRowStyles = [
    {
      when: (row) => row.IsBanned == 1,
      style: {
        backgroundColor: "red",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];
  return (
    <div className="content">
      <div className="container">
        <div className="row" >
          <DataTable
            conditionalRowStyles={conditionalRowStyles}

            title="Leaderboard"
            columns={columns}
            data={clone}
            defaultSortField="Score"
            defaultSortAsc={false}
            pagination
          />
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
