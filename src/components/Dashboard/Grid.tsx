import React from "react";
import { StatCards } from "./StatCards";
import { ActivityGraph } from "./ActivityGraph";
import { UsageRadar } from "./UsageRadar";
import { UserList } from "./RecentTransactions";

export const Grid = () => {
  return (
    <div className="px-4 w-full">
      {/* <StatCards /> */}
      {/* <ActivityGraph /> */}
      {/* <UsageRadar /> */}
      <UserList/>
    </div>
  );
};
