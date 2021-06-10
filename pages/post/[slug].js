//libraries
import { useEffect, useState } from "react";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
//components
import { Toolbar } from "../../components/toolbar";
//styles
import styles from "../../styles/Post.module.css";

export const Post = ({ title, body, image }) => {
	const [imageUrl, setImageUrl] = useState("");

	useEffect(() => {
		//converting image to url
		const imageBuilder = imageUrlBuilder({
			projectId: "r2mqx1u3",
			dataset: "production",
		});

		setImageUrl(imageBuilder.image(image));
	}, [image]);

	return (
		<div>
			<Toolbar />
			<div className={styles.main}>
				<h1>{title}</h1>
				{imageUrl && <img src={imageUrl} className={styles.mainImage} />}

				<div className={styles.body}>
					<BlockContent blocks={body} />
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = async pageContext => {
	const pageSlug = pageContext.query.slug;
	console.log(pageSlug);

	if (!pageSlug) {
		return {
			notFound: true,
		};
	}

	const query = encodeURIComponent(
		`*[ _type == "post" && slug.current == "${pageSlug}" ]`
	);
	const url = `https://r2mqx1u3.api.sanity.io/v1/data/query/production?query=${query}`;

	const result = await fetch(url).then(res => res.json());
	const post = result.result[0];

	if (!post) {
		return {
			notFound: true,
		};
	} else {
		return {
			props: {
				body: post.body,
				title: post.title,
				image: post.mainImage,
			},
		};
	}
};

export default Post;
