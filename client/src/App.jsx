import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import CompanyDetailsScreen from './screens/CompanyDetailsScreen'
import CompaniesScreen from './screens/CompaniesScreen'
import CreatePostScreen from './screens/CreatePostScreen'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import PostDetailsScreen from './screens/PostDetailsScreen'


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/companies" element={<CompaniesScreen />} />
            <Route path="/company/:id" element={<CompanyDetailsScreen />} />
            <Route path="/create-post" element={<CreatePostScreen />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/post/:id" element={<PostDetailsScreen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

export const SERVER_URL = 'http://localhost:5000/api/p1'