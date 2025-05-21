"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoHomeOutline, IoHomeSharp, IoHeartOutline, IoHeart, IoTimeOutline, IoTime, IoPersonOutline, IoPerson } from "react-icons/io5";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "ホーム",
      href: "/explore",
      iconOutline: <IoHomeOutline size={24} />,
      iconFilled: <IoHomeSharp size={24} />
    },
    {
      label: "お気に入り",
      href: "/likes",
      iconOutline: <IoHeartOutline size={24} />,
      iconFilled: <IoHeart size={24} />
    },
    {
      label: "履歴",
      href: "/history",
      iconOutline: <IoTimeOutline size={24} />,
      iconFilled: <IoTime size={24} />
    },
    {
      label: "プロフィール",
      href: "/profile",
      iconOutline: <IoPersonOutline size={24} />,
      iconFilled: <IoPerson size={24} />
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t flex justify-around items-center z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center w-1/4 h-full ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div>
              {isActive ? item.iconFilled : item.iconOutline}
            </div>
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
} 