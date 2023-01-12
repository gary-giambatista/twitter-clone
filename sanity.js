import { createClient, groq } from "next-sanity";

export const config = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2022-11-16",
	useCdn: proces.env.NODE_ENV === "production",
};

export const SanityClient = createClient(config);
