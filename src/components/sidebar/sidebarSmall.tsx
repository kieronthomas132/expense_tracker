import { RiMenu3Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import SidebarLinks from "@/components/sidebar/sidebarLinks.tsx";
import AddWalletDialog from "@/components/dashboard/AddWalletDialog/AddWalletDialog.tsx";

const SidebarSmall = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  return (
    <nav className="lg:hidden z-10 relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="border-2 border-[#27272A] p-2 rounded-full"
      >
        <RiMenu3Line className="text-[25px]" />
      </button>
      {isMenuOpen && (
        <div className="absolute flex flex-col gap-3 justify-center top-[50px] bg-black border-2 border-[#27272A] p-2.5 rounded-lg w-[150px] right-0">
          <SidebarLinks />
          <AddWalletDialog />
        </div>
      )}
    </nav>
  );
};

export default SidebarSmall;
