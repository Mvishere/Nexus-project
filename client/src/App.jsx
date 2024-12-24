import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import CompanyDetailsScreen from './screens/CompanyDetailsScreen'
import CompaniesScreen from './screens/CompaniesScreen'
import CreatePostScreen from './screens/CreatePostScreen'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/companies" element={<CompaniesScreen />} />
            <Route path="/company/:id" element={<CompanyDetailsScreen />} />
            <Route path="/create-post" element={<CreatePostScreen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

