//libraries
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
//components
import { Toolbar } from "../components/toolbar";
import imageUrlBuilder from "@sanity/image-url";
//styles
import styles from "../styles/Home.module.css";

export default function Home({ posts }) {
	const [mappedPosts, setMappedPosts] = useState([]);

	const router = useRouter();

	useEffect(() => {
		if (posts.length) {
			const imageBuilder = imageUrlBuilder({
				projectId: "r2mqx1u3",
				dataset: "production",
			});

			setMappedPosts(
				posts.map(p => {
					return {
						...p,
						mainImage: imageBuilder.image(p.mainImage).width(500).height(250),
					};
				})
			);
		} else {
			setMappedPosts([]);
		}
	}, [posts]);

	console.log(posts);
	return (
		<div>
			<Toolbar />
			<div className={styles.main}>
				<h1>Welcome To My Blog</h1>
				<h3>Recent Posts:</h3>

				<div className={styles.feed}>
					{mappedPosts.length ? (
						mappedPosts.map((p, index) => (
							<div
								key={index}
								className={styles.post}
								onClick={() => router.push(`/post/${p.slug.current}`)}
							>
								<h3>{p.title}</h3>
								<img className={styles.mainImage} src={p.mainImage} />
							</div>
						))
					) : (
						<>No Posts</>
					)}
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps = async pageContext => {
	const query = encodeURIComponent(`*[ _type == "post" ]`);
	const url = `https://r2mqx1u3.api.sanity.io/v1/data/query/production?query=${query}`;
	const result = await fetch(url).then(res => res.json());

	if (!result.result || !result.result.length) {
		return {
			props: {
				posts: [],
			},
		};
	} else {
		return {
			props: {
				posts: result.result,
			},
		};
	}
};
