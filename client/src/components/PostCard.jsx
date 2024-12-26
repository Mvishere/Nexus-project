const PostCard = ({ post }) => {
    return (
      <div className="bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2 text-white">{post.title}</h2>
        <p className="text-gray-600 mb-2">{post.company}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag,index) => (
            <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    )
  }
  
  export default PostCard
  
