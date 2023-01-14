import {
	BellIcon,
	BookmarkIcon,
	EllipsisHorizontalCircleIcon,
	EnvelopeIcon,
	HashtagIcon,
	HomeIcon,
	RectangleStackIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import TwitterLogo from "../public/twitter-logo.png";
import SidebarRow from "./SidebarRow";

export default function Sidebar() {
	const { data: session } = useSession();

	return (
		<div className="flex flex-col col-span-2 items-center px-4 md:items-start">
			<Image src={TwitterLogo} alt="twitter" width="40" className="m-3" />
			<SidebarRow Icon={HomeIcon} title="Home" />
			<SidebarRow Icon={HashtagIcon} title="Explore" />
			<SidebarRow Icon={BellIcon} title="Notifications" />
			<SidebarRow Icon={EnvelopeIcon} title="Messages" />
			<SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
			<SidebarRow Icon={RectangleStackIcon} title="Lists" />
			<SidebarRow
				onClick={session ? signOut : signIn}
				Icon={UserIcon}
				title={session ? "Sign Out" : "Sign In"}
			/>
			<SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More" />
		</div>
	);
}

//all icons
// BellIcon,
// BookmarkIcon,
// CollectionIcon,
// DotsCircleHorizontalIcon,
// HashtagIcon,
// HomeIcon,
// MailIcon,
// UserIcon,
