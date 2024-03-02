"use client";

import {Card, List, ListItem, ListItemPrefix, Typography} from "@material-tailwind/react";
import {Cog6ToothIcon, ListBulletIcon,} from "@heroicons/react/24/solid";
import React from "react";
import {Bars4Icon} from "@heroicons/react/24/outline";
import {useQuery} from "@tanstack/react-query";
import {utilGetVersion} from "@/lib/bindings";

export function SideBar({className}: { className?: string }) {
	"use client"

	const currentVersionResult = useQuery({
		queryKey: ["utilGetVersion"],
		queryFn: utilGetVersion,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		refetchInterval: false,
	});

	const currentVersion = currentVersionResult.status == "success" ? currentVersionResult.data : "Loading...";

	return (
		<Card
			className={`${className} w-auto max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 h-screen shrink-0`}>
			<List className="min-w-[10rem] flex-grow">
				<SideBarItem href={"/projects"} text={"Projects"} icon={ListBulletIcon}/>
				<SideBarItem href={"/settings"} text={"Settings"} icon={Cog6ToothIcon}/>
				<SideBarItem href={"/log"} text={"Logs"} icon={Bars4Icon}/>
				<div className={'flex-grow'}/>
				<ListItem className={"text-sm"}>v{currentVersion}</ListItem>
			</List>
		</Card>
	);
}

function SideBarItem(
	{href, text, icon}: { href: string, text: string, icon: React.ComponentType<{ className?: string }> }
) {
	const IconElenment = icon;
	return (
		<ListItem onClick={() => location.href = href}>
			<ListItemPrefix>
				<IconElenment className="h-5 w-5"/>
			</ListItemPrefix>
			{text}
		</ListItem>
	);
}
