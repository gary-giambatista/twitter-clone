import {
	ArrowsRightLeftIcon,
	ArrowUpTrayIcon,
	ChatBubbleLeftRightIcon,
	HeartIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import TimeAgo from "react-timeago";
import { Comment, CommentBody, Tweet } from "../typings";
import { fetchComments } from "../utils/fetchComments";

interface Props {
	tweet: Tweet;
}

export default function TweetComponent({ tweet }: Props) {
	const { data: session } = useSession();

	const [comments, setComments] = useState<Comment[]>([]);
	const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
	const [input, setInput] = useState<string>("");

	const refreshComments = async () => {
		const comments: Comment[] = await fetchComments(tweet._id);
		setComments(comments);
	};

	useEffect(() => {
		refreshComments();
	}, []);

	// Function to post comments
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const commentToast = toast.loading("Posting Comment...");

		// Comment logic
		const comment: CommentBody = {
			comment: input,
			tweetId: tweet._id,
			username: session?.user?.name || "Unknown User",
			profileImg:
				session?.user?.image ||
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeITixUzn4MnrRY18AWpjsQYlIURob4e1-oJ7tKkaAiWdWvbekoaJ1ewx__b5RNefxdo8&usqp=CAU",
		};
		//sending comment body to the API endpoint
		const result = await fetch(`/api/addComment`, {
			body: JSON.stringify(comment),
			method: "POST",
		});

		// console.log("WOOHOO we made it", result);
		toast.success("Comment Posted!", {
			id: commentToast,
		});

		setInput("");
		setCommentBoxVisible(false);
		refreshComments();
	};

	// console.log(comments);
	return (
		// Displaying the tweet
		<div className="flex flex-col space-x-3 border-y p-5 border-gray-100">
			<div className="flex space-x-3">
				<img
					className="h-10 w-10 rounded-full object-cover"
					src={tweet.profileImg}
					alt="profile"
				/>
				<div>
					<div className="flex items-center space-x-1">
						<p className="mr-1 font-bold">{tweet.username}</p>
						<p className="hidden text-sm text-gray-500 sm:inline">
							@{tweet.username.replace(/\s+/g, "").toLowerCase()} ??
						</p>
						<TimeAgo
							className="text-sm text-gray-500"
							date={tweet._createdAt}
						/>
					</div>
					<p className="pt-1 "> {tweet.text} </p>

					{tweet.image && (
						<img
							className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
							src={tweet.image}
							alt="tweet"
						/>
					)}
				</div>
			</div>
			<div className="flex justify-between mt-5">
				<div
					onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
					className="flex cursor-pointer items-center space-x-3 text-gray-400"
				>
					<ChatBubbleLeftRightIcon className="h-5 w-5" />
					<p> {comments.length} </p>
				</div>
				<div className="flex cursor-pointer items-center space-x-3 text-gray-400">
					<ArrowsRightLeftIcon className="h-5 w-5" />
				</div>
				<div className="flex cursor-pointer items-center space-x-3 text-gray-400">
					<HeartIcon className="h-5 w-5" />
				</div>
				<div className="flex cursor-pointer items-center space-x-3 text-gray-400">
					<ArrowUpTrayIcon className="h-5 w-5" />
				</div>
			</div>
			{/* comment box logic - for writing comments */}
			{commentBoxVisible && (
				<form className="mt-3 flex space-x-3" onSubmit={(e) => handleSubmit(e)}>
					<input
						onChange={(e) => setInput(e.target.value)}
						value={input}
						className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
						type="text"
						placeholder="Write a comment..."
					/>
					<button
						disabled={!input}
						type="submit"
						className="text-twitter disabled:text-gray-200"
					>
						Post
					</button>
				</form>
			)}
			{/* Comments */}
			{comments?.length > 0 && (
				<div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5 scrollbar">
					{comments.map((comment) => (
						<div key={comment._id} className="relative flex space-x-2">
							<hr className="absolute left-5 top-10 h-8 border-x border-twitter/20" />
							<img
								src={comment.profileImg}
								alt="profile"
								className="mt-2 h-7 w-7 object-cover rounded-full"
							/>
							<div className="">
								<div className="flex items-center space-x-1">
									<p className="mr-1 font-bold">{comment.username}</p>
									<p className="hidden text-sm text-gray-500 lg:inline">
										@{comment.username.replace(/\s+/g, "").toLowerCase()} ??
									</p>
									<TimeAgo
										className="text-sm text-gray-500"
										date={comment._createdAt}
									/>
								</div>
								<p> {comment.comment} </p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
