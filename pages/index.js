import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Vietnamese Associations At Seneca College</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="https://nextjs.org">VAS Homepage!</a>
				</h1>

				<p className={styles.description}>Getting started</p>

				<div className={styles.grid}>
					<a href="https://nextjs.org/docs" className={styles.card}>
						<h3>Events &rarr;</h3>
						<p>Upcoming events and plans</p>
					</a>

					<a href="https://nextjs.org/learn" className={styles.card}>
						<h3>Connect &rarr;</h3>
						<p>Find your clubs and friends</p>
					</a>

					<a
						href="https://github.com/vercel/next.js/tree/master/examples"
						className={styles.card}
					>
						<h3>Voluntter &rarr;</h3>
						<p>Join VAS and grow the community</p>
					</a>

					<a
						href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
						className={styles.card}
					>
						<h3>Contact &rarr;</h3>
						<p>Contact us at vas.seneca@gmail.com</p>
					</a>
				</div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by Andrew
				</a>
			</footer>
		</div>
	);
}
