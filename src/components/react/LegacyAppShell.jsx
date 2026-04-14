import { useState } from 'react';

export default function LegacyAppShell() {
	const [count, setCount] = useState(0);

	return (
		<section>
			<h3>React in Astro is ready</h3>
			<p>
				Use this area to migrate interactive parts of your existing app while keeping Astro pages and blog
				content static.
			</p>
			<button type="button" onClick={() => setCount((prev) => prev + 1)}>
				Clicked {count} times
			</button>
		</section>
	);
}
