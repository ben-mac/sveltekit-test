export const get = async () => {
  const allPostFiles = import.meta.glob('../blog/*.md') // Vite function
  const iterablePostFiles = Object.entries(allPostFiles)

  // shape the returned data
  // Vite returns each item in a promise
  // So we wrap it up in await Promise.all ... ? 

  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver()
      const postPath = path.slice(2, -3)

      return {
        meta: metadata,
        path: postPath,
      }
    })
  )

  // Sort the posts in descendig order
  const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.meta.date) - new Date(a.meta.date)
  })

  return {
    body: sortedPosts
  }
}