import React from "react";

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col relative text-white justify-center items-center bg-[#111827] w-full h-[100vh]">
      <div className="home-background absolute w-full h-full"></div>
      <div className="flex flex-col w-4/5 md:w-1/3 items-center gap-y-12 z-10">
        <h1 className="font-bold text-5xl font-primary">RoJoiner</h1>
        {children}
      </div>
    </div>
  );
}

export default PageLayout;
