import Home from "./Home";

const DashboardNav = ({ section }: { section: string }) => {
  if(section === 'home') return <Home />
  else return <div></div>
};

export default DashboardNav;
