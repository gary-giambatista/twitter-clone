import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import toast from "react-hot-toast";
import tweet from "../sanity/schemas/tweet";
import { Tweet } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";
import TweetBox from "./TweetBox";
import TweetComponent from "./TweetComponent";

interface Props {
	tweets: Tweet[];
}
export default function Feed({ tweets: tweetsProp }: Props) {
	const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);
	// console.log(tweets);

	const handleRefresh = async () => {
		const refreshToast = toast.loading("Refreshing...");

		const tweets = await fetchTweets();
		setTweets(tweets);

		toast.success("Feed updated!", {
			id: refreshToast,
		});
	};

	return (
		<div className="col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll scrollbar-hide">
			{/* max-h-screen overflow-scroll make this separately scrollable */}
			<div className="flex items-center justify-between">
				<h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
				<ArrowPathIcon
					onClick={handleRefresh}
					className="h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125 mr-2"
				/>
			</div>

			<div>
				<TweetBox setTweets={setTweets} />
			</div>

			{/* Feed */}
			<div>
				{tweets.map((tweet: Tweet) => (
					<TweetComponent key={tweet._id} tweet={tweet} />
				))}
			</div>
		</div>
	);
}
