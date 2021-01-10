import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import BattltService from "../services/battle.service";
import { Redirect } from "react-router";
function Battle(props) {
  const columns = [
    {
      name: "GUID",
      selector: "GUID",
      sortable: false,
    },
    {
      name: "Winner",
      selector: "Winner",
      sortable: true,
    },
    {
      name: "Loser",
      selector: "Loser",
      sortable: true,
    },
    {
      name: "CreatedAt",
      selector: "CreatedAt",
      sortable: true,
      format: (row) => formatter.format(Date.parse(row.CreatedAt)),
    },
    {
      name: "IsDraw",
      selector: "IsDraw",
      sortable: false,
    },
  ];
  let formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const [battles, setBattles] = useState([]);
  const handleClick = (row) => {
    console.log(window.location.origin);
    window.location.href = `${window.location.origin}/battles/${row.ID}`;
  };
  useEffect(async () => {
    const usrs = await BattltService.getBattles(props.userid);
    const res = await usrs.json();
    if (res) {
      setBattles(res);
    }
  }, []);
  return battles == null ? (
    <p>Loading</p>
  ) : (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <DataTable
            title="Battles"
            columns={columns}
            data={battles}
            defaultSortField="CreatedAt"
            defaultSortAsc={false}
            pagination
            selectableRows
            onRowClicked={handleClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Battle;
