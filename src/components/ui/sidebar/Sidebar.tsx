'use client';

import { useUiStore } from '@/store';
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleCircleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';
import { SidebarOption } from './SidebarOption';

export const Sidebar = () => {
  //* Define menu options for clients
  const clientMenuOptions = [
    { optionName: 'Profile', icon: <IoPersonOutline size={30} /> },
    { optionName: 'Orders', icon: <IoTicketOutline size={30} /> },
    { optionName: 'Login', icon: <IoLogInOutline size={30} /> },
    { optionName: 'Logout', icon: <IoLogOutOutline size={30} /> },
  ];

  //* Define menu options for admins
  const adminMenuOptions = [
    { optionName: 'Products', icon: <IoShirtOutline size={30} /> },
    { optionName: 'Orders', icon: <IoTicketOutline size={30} /> },
    { optionName: 'Clients', icon: <IoPeopleCircleOutline size={30} /> },
  ];

  //*Define store
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeMenu = useUiStore((state) => state.closeSideMenu);

  return (
    <div>
      {/* Black background */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30 "></div>
      )}
      {/* Blur */}
      {isSideMenuOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-[2px]"
          onClick={closeMenu}
        ></div>
      )}
      {/* Side Menu */}

      <nav
        //todo: efecto slide
        className={`fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 ${
          isSideMenuOpen ? '' : 'translate-x-full'
        }`}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeMenu}
        />
        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500 "
          />
        </div>

        {/* Menu Options */}

        {clientMenuOptions.map((option) => {
          return (
            <SidebarOption
              optionName={option.optionName}
              icon={option.icon}
              key={option.optionName}
            />
          );
        })}

        {/* Line Separator */}
        <div className="w-full h-px bg-gray-200 my-10 "></div>
        {adminMenuOptions.map((option) => {
          return (
            <SidebarOption
              optionName={option.optionName}
              icon={option.icon}
              key={option.optionName}
            />
          );
        })}
      </nav>
    </div>
  );
};
