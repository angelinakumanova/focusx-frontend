"use client";
import {
  IconAlarm,
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
} from "@tabler/icons-react";
import Logo from "./Logo";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { useAuthStore } from "@/context/useAuthStore";

interface Props {
  children: React.ReactNode;
}
export function UserSidebar({ children }: Props) {
  const logout = useAuthStore(s => s.logout);

  const links = [
    {
      label: "Dashboard",
      href: "/home",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-200" />,
    },
    {
      label: "Focus",
      href: "/focus",
      icon: <IconAlarm className="h-5 w-5 shrink-0 text-neutral-200" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-200" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-200" />,
    },
  ];

  return (
    <div
      className="bg-neutral-950 mx-auto flex w-full h-screen flex-1 flex-col overflow-hidden rounded-md
          md:flex-row"
    >
      <Sidebar animate={false}>
        <SidebarBody className="rounded-2xl border border-zinc-900 ">
          <div
            className="
          rounded-2xl p-4 flex flex-1 flex-col overflow-x-hidden"
          >
            <Logo />
            <div className="mt-8 flex flex-col gap-2 ">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} onClick={() => link.label === 'Logout' ? logout() : undefined } />
              ))}
              
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}
