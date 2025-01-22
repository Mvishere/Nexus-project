const PostCard = ({ post }) => {
	return (
		<div className="bg-white shadow-md rounded-lg p-6">
			<h2 className="text-xl font-semibold mb-2">{post.title}</h2>
			<p className="text-gray-600 mb-2">{post.company}</p>
			<div className="flex flex-wrap gap-2">
				{post.tags.map(tag => (
					<span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
						{tag}
					</span>
				))}
			</div>
		</div>
	)
}

export default PostCard
