import { useState } from 'react'
import { Link } from 'react-router-dom'
import PostCard from '../components/PostCard'

// Temporary mock data
const mockPosts = [
  { id: 1, title: "My Google Interview Experience", company: "Google", tags: ["technical round", "interview tips"] },
  { id: 2, title: "Facebook Onsite Interview", company: "Facebook", tags: ["onsite", "system design"] },
  { id: 3, title: "Amazon Internship Interview", company: "Amazon", tags: ["internship", "coding challenge"] },
]

const HomeScreen = () => {
  const [posts, setPosts] = useState(mockPosts)
  const [filter, setFilter] = useState('')

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(filter.toLowerCase()) ||
    post.company.toLowerCase().includes(filter.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Recent Interview Experiences</h1>
      <input
        type="text"
        placeholder="Filter by company, title, or tag"
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Link 
        to="/create-post"
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        + New Post
      </Link>
    </div>
  )
}

export default HomeScreen

