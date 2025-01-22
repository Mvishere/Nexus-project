import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostCard from '../components/PostCard'

// Temporary mock data
const mockCompany = {
  id: 1,
  name: "Google",
  industry: "Technology",
  logo: "https://logo.clearbit.com/google.com",
  website: "https://www.google.com"
}

const mockPosts = [
  { id: 1, title: "My Google Interview Experience", company: "Google", tags: ["technical round", "interview tips"] },
  { id: 2, title: "Google Internship Interview", company: "Google", tags: ["internship", "coding challenge"] },
]

const CompanyDetailsScreen = () => {
  const { id } = useParams()
  const [company, setCompany] = useState(mockCompany)
  const [posts, setPosts] = useState(mockPosts)

  useEffect(() => {
    // Here you would fetch the company details and related posts based on the id
  }, [id])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <img src={company.logo} alt={company.name} className="w-16 h-16 mr-4" />
          <div>
            <h1 className="text-3xl font-bold">{company.name}</h1>
            <p className="text-gray-600">{company.industry}</p>
          </div>
        </div>
        <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Visit Website
        </a>
        <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Follow Company
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Interview Experiences</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default CompanyDetailsScreen