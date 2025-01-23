import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from '../App'
import axios from 'axios'

const CreatePostScreen = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    content: '',
    tags: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const uploadPost = async () => {
        console.log(formData)
        const res = await axios.post(`${SERVER_URL}/posts/create`, formData, {
          withCredentials: true
        })
        console.log(res)
      }
      uploadPost()
    } catch (error) {
      console.log(error)
    }
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-gray-900 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 via-teal-500 to-orange-500 bg-clip-text text-transparent">
            Share Your Interview Experience
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="E.g., My Google Software Engineer Interview Experience"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Company</label>
              <input
                type="text"
                name="companyName"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="E.g., Google"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Experience Details</label>
              <textarea
                name="content"
                rows="10"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your interview experience in detail..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="E.g., technical round, system design, coding challenge"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md transition-colors"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePostScreen

