import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";

const Home: NextPage = () => {
	return (
		<div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
			{/* NOTES for container style: mx-auto centeres the max-w contraint, also max-h-screen and overflow-hidden are for making the components separately scrollable */}
			<Head>
				<title>Twitter</title>
			</Head>

			<main className="grid grid-cols-9">
				<Sidebar />

				<Feed />

				<Widgets />
			</main>
		</div>
	);
};

export default Home;
