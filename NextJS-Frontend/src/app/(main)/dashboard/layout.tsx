import React, { Suspense } from "react";

import { BarLoader } from "react-spinners";

import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const Dashboardlayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#8aea33" />}
      >
        <main>{children}</main>

        
      </Suspense>
    </div>
  );
};

export default Dashboardlayout;
