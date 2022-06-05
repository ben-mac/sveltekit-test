<script context="module">
	export const load = async ({ fetch }) => {
		// Load is a SK server side function which runs before the component is loaded,
		// add that "context" to make it happen
		const posts = await fetch('/api/posts.json');
		const allPosts = await posts.json();

		return {
			props: {
				posts: allPosts
			}
		};
	};
</script>

<script>
	export let posts;
</script>

<ul>
	{#each posts as post}
		<li>
			<h2>
				<a href={post.path}>
					{post.meta.title}
				</a>
			</h2>
			Published: {post.meta.date}
		</li>
	{/each}
</ul>
