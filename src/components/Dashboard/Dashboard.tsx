import React from "react";
import { TopBar } from "./TopBar";
import { Grid } from "./Grid";

export const Dashboard = () => {
  return (
    <div className="bg-white rounded-lg pt-4 pb-4 shadow">
      <TopBar />
      <Grid />
    </div>
  );
};
