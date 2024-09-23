import React from "react";
import { FaUserCircle } from "react-icons/fa";

export const Navlinks = [
  {
    id: 1,
    name: "HOME",
    link: "/#",
  },
  {
    id: 2,
    name: "UPLOAD",
    link: "/upload",
  },
  {
    id: 1,
    name: "Chat",
    link: "/chat",
  },
  {
    id: 1,
    name: "SIGIN",
    link: "/sigin",
  },
];

const ResponsiveMenu = ({ showMenu }) => {
  console.log("showMenu", showMenu);
  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-900 dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md z-40`}
    >
      <div className="card">
        <div className="flex items-center justify-start gap-3">
          <FaUserCircle size={50} />
          <div>
            <h1>Hello User</h1>
            <h1 className="text-sm text-slate-500">Premium user</h1>
          </div>
        </div>
        <nav className="mt-12">
          <ul className="space-y-4 text-xl">
            {Navlinks.map((data) => (
              <li>
                <a href={data.link} className="inline-block mb-5">
                  {data.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="footer">
        <h1>
          Made with by{" "}
          <a
            href="https://github.com/Amos-Bista/text-recognition-FE-"
            target="_blank"
            rel="noopener noreferrer"
          >
            Amos
          </a>{" "}
        </h1>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
