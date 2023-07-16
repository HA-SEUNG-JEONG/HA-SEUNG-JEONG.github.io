export const getUniqueCategories = (posts) => {
  const categorySet = new Set();
  posts.forEach((post) => {
    if (post.category) categorySet.add(post.category);
  });
  return [...categorySet].sort((a, b) => {
    if (a === 'featured') return -1;
    if (b === 'featured') return 1;
    return 0;
  });
};
