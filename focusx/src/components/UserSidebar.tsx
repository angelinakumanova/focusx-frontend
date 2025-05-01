"use client";
import { cn } from "@/lib/utils";
import {
  IconAlarm,
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
} from "@tabler/icons-react";
import Logo from "./Logo";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import SectionDivider from "./sections/SectionDivider";

interface Props {
  children: React.ReactNode;
}
export function UserSidebar({ children }: Props) {
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
      href: "/logout",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-200" />,
    },
  ];

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border md:flex-row border-neutral-700 bg-neutral-950",
        "h-screen"
      )}
    >
      <Sidebar animate={false}>
        <SidebarBody className="justify-between gap-10 bg-[#111111]">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2 ">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <SectionDivider />
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}
