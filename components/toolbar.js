//libraries
import { useRouter } from "next/router";
import Link from "next/link";
//styles
import styles from "../styles/Toolbar.module.css";

export const Toolbar = () => {
	const router = useRouter();

	return (
		<div className={styles.main}>
			{/* <div onClick={() => router.push("/")}>Home</div> */}
			<Link href="/">Home</Link>
			<div onClick={() => (window.location.href = "https://www.google.com/")}>
				Google
			</div>
			<div onClick={() => (window.location.href = "https://www.github.com/")}>
				GitHub
			</div>
		</div>
	);
};
