import { NavLink, Link } from "react-router-dom";
import logo from "../assets/fil-plus.svg";
import { BugIcon, CubeIcon, UserIcon, StatusIcon } from "../icons";

const navigationItems = [
  {
    name: "Blockchain",
    to: "",
    svg: <CubeIcon />
  },
  {
    name: "User",
    to: "user",
    svg: <UserIcon />
  },
  {
    name: "Bugs",
    to: "bugs",
    svg: <BugIcon />
  },
  {
    name: "Status",
    to: "status",
    svg: <StatusIcon />
  }
];

const SideBar = () => {
  return (
    <nav className="w-64 min-h-screen shadow-md fixed left-0 top-0 flex flex-col">
      <NavLink to="/">
        <img
          src={logo}
          alt="logo"
          className="h-16 w-full cursor-pointer my-5"
        />
      </NavLink>

      <div className="flex flex-col flex-1 px-5">
        {navigationItems.map(item => {
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-4 py-3 pl-4 cursor-pointer rounded-lg hover:bg-gray-100 ${
                  isActive &&
                  "bg-gradient-to-r  from-cyan-500  to-blue-500 text-white transition duration-300 shadow-md"
                }`
              }
            >
              <span>{item.svg}</span>
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      <Link to="/about" className="border-t text-center py-4">
        <span>About Fil+ Metrics</span>
      </Link>
    </nav>
  );
};

export default SideBar;
