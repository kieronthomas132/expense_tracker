import SidebarLinks from "@/components/sidebar/sidebarLinks.tsx";
import SidebarSignOutButton from "@/components/sidebar/sidebarSignOutButton.tsx";

const Sidebar = () => {

  return (
    <nav className="text-white p-4 hidden lg:flex lg:flex-col w-[300px] h-full">
      <h1 className="text-[30px]">MONOUT</h1>
      <div className="mt-[20px]">
        <ul className="flex flex-col gap-3">
          <SidebarLinks />
          <SidebarSignOutButton/>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
