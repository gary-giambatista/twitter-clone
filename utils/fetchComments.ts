import { Comment } from "../typings";

export const fetchComments = async (tweetId: string) => {
	//make a call to backend to handle request
	const res = await fetch(`/api/getComments?tweetId=${tweetId}`);

	const comments: Comment[] = await res.json();

	return comments;
};
