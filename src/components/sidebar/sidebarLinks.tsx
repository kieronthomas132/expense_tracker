import { MdOutlineDashboard } from "react-icons/md";
import { LuWallet } from "react-icons/lu";
import { useEffect, useState } from "react";

export const sidebarLinks = [
  {
    title: "Dashboard",
    link: "/",
    icon: <MdOutlineDashboard />,
  },
  {
    title: "Wallets",
    link: "/wallets",
    icon: <LuWallet />,
  },
];

const SidebarLinks = () => {
  const [selectedLink, setSelectedLink] = useState<string>("");

  const handleSelectedLink = (link: string) => {
    setSelectedLink(link);
  };

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/wallet")) {
      setSelectedLink("/wallets");
    } else {
      setSelectedLink("/");
    }
  }, [selectedLink]);
  return (
    <>
      {sidebarLinks.map(({ title, link, icon }, index) => (
        <a
          key={index}
          onClick={() => handleSelectedLink(link)}
          href={link}
          className={` ${selectedLink === link ? "text-white bg-[#27272A] rounded-lg" : "text-[#8D8D8D]"} flex p-2.5 items-center gap-3`}
        >
          <p>{icon}</p>
          <p>{title}</p>
        </a>
      ))}
    </>
  );
};

export default SidebarLinks;
