import { Tweet } from "../typings";

export const fetchTweets = async () => {
	//rest api call to our backend (pages/api/getTweets.ts)
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`);

	const data = await res.json();
	const tweets: Tweet[] = data.tweets;

	return tweets;
};
