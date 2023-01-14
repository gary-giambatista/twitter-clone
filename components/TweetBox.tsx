import {
	CalendarIcon,
	FaceSmileIcon,
	MagnifyingGlassCircleIcon,
	MapPinIcon,
	PhotoIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Tweet, TweetBody } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";

interface Props {
	setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>;
}

export default function TweetBox({ setTweets }: Props) {
	const [input, setInput] = useState<string>("");
	const [image, setImage] = useState<string>("");
	const imageInputRef = useRef<HTMLInputElement>(null);
	const { data: session } = useSession();
	const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);

	//helper function for adding pictures via URL
	const addImageToTweet = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		if (!imageInputRef.current?.value) return;
		setImage(imageInputRef.current.value);
		imageInputRef.current.value = "";
		setImageUrlBoxIsOpen(false);
	};

	//collect info for tweet and put into body and make request to addTweet endpoint
	const postTweet = async () => {
		const tweetInfo: TweetBody = {
			text: input,
			username: session?.user?.name || "Unknown User",
			profileImg:
				session?.user?.image ||
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeITixUzn4MnrRY18AWpjsQYlIURob4e1-oJ7tKkaAiWdWvbekoaJ1ewx__b5RNefxdo8&usqp=CAU",
			image: image,
		};
		//mutate tweet
		const result = await fetch(`/api/addTweet`, {
			body: JSON.stringify(tweetInfo),
			method: "POST",
		});
		const json = await result.json();

		const newTweets = await fetchTweets();
		setTweets(newTweets);

		toast("Tweet Posted", {
			icon: "✔",
		});
		return json;
	};
	//create tweet and mutate on server
	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		postTweet();

		setInput("");
		setImage("");
		setImageUrlBoxIsOpen(false);
	};
	return (
		<div className="flex space-x-2 p-5">
			<img
				className="object-cover rounded-full mt-4 h-14 w-auto"
				src={
					session?.user?.image ||
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeITixUzn4MnrRY18AWpjsQYlIURob4e1-oJ7tKkaAiWdWvbekoaJ1ewx__b5RNefxdo8&usqp=CAU"
				}
				alt="profile"
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
							<PhotoIcon
								onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
								className="cursor-pointer transition-transform duration-150 ease-out hover:scale-150 h-5 w-5"
							/>
							<MagnifyingGlassCircleIcon className="h-5 w-5" />
							<FaceSmileIcon className="h-5 w-5" />
							<CalendarIcon className="h-5 w-5" />
							<MapPinIcon className="h-5 w-5" />
						</div>
						<button
							onClick={(e) => handleSubmit(e)}
							disabled={!input || !session}
							className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40"
						>
							Tweet
						</button>
					</div>
					{imageUrlBoxIsOpen && (
						<form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
							<input
								ref={imageInputRef}
								className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
								type="text"
								placeholder="Enter Image URL..."
							/>
							<button
								type="submit"
								onClick={(e) => addImageToTweet(e)}
								className="font-bold text-white "
							>
								Add Image
							</button>
						</form>
					)}
					{image && (
						<img
							src={image}
							className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
							alt="uploaded"
						/>
					)}
				</form>
			</div>
		</div>
	);
}
