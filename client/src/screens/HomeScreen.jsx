import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PostCard from '../components/PostCard'
import axios from 'axios'
import { SERVER_URL } from '../App'

const HomeScreen = () => {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState('')

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(filter.toLowerCase()) ||
        post.company.toLowerCase().includes(filter.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
    )

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${SERVER_URL}/posts/`, {
                    withCredentials: true,
                });

                const formattedPosts = res.data.posts.map(post => ({
                    id: post._id,
                    title: post.title,
                    company: post.companyName,
                    tags: post.tags.length && post.tags[0] ? post.tags : [],
                }));
                setPosts(formattedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();

    }, []);

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