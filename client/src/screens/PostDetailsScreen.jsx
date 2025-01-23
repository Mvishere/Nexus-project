import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { SERVER_URL } from '../App'

const PostDetailsScreen = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/posts/${id}`, {
          withCredentials: true,
        })
        setPost(res.data.post)
        setComments(res.data.post.comments || [])
      } catch (error) {
        console.error('Error fetching post:', error)
      }
    }
    fetchPost()
  }, [id])

  const handleAddComment = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `${SERVER_URL}/posts/${id}/comments`,
        { content: comment },
        { withCredentials: true }
      )
      setComments([...comments, res.data.comment])
      setComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  if (!post) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-400 mb-2">Company: {post.company}</p>
        <div className="flex gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span key={index} className="bg-gray-700 px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
        <div className="prose prose-invert max-w-none">
          {post.content}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <form onSubmit={handleAddComment} className="mb-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded mb-2"
            placeholder="Add a comment..."
            rows="3"
          />
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Comment
          </button>
        </form>
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded">
              <p>{comment.content}</p>
              <p className="text-sm text-gray-400 mt-2">
                By {comment.user} on {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostDetailsScreen