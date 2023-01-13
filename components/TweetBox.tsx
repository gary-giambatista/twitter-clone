import {
	CalendarIcon,
	FaceSmileIcon,
	MagnifyingGlassCircleIcon,
	MapPinIcon,
	PhotoIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useState } from "react";
import Sil from "../public/sil.png";

export default function TweetBox() {
	const [input, setInput] = useState<string>("");

	return (
		<div className="flex space-x-2 p-5">
			<Image
				className="object-cover rounded-full mt-4 opacity-30 h-14 w-auto"
				src={Sil}
				alt="profile"
				height="40"
				width="40"
			/>

			<div className="flex flex-1 items-center pl-2">
				<form className="flex flex-col flex-1">
					{/* CSS of the 2 parents above with flex is confusing */}
					<input
						value={input}
						onChange={(event) => setInput(event.target.value)}
						className="h-24 w-full text-xl outline-none placeholder:text-xl"
						type="text"
						placeholder="What's happening?"
					/>
					<div className="flex items-center">
						<div className="flex space-x-2 text-twitter flex-1">
							<PhotoIcon className="cursor-pointer transition-transform duration-150 ease-out hover:scale-150 h-5 w-5" />
							<MagnifyingGlassCircleIcon className="h-5 w-5" />
							<FaceSmileIcon className="h-5 w-5" />
							<CalendarIcon className="h-5 w-5" />
							<MapPinIcon className="h-5 w-5" />
						</div>
						<button
							disabled={!input}
							className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40"
						>
							Tweet
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
