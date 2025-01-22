import { useState } from 'react'
import { Link } from 'react-router-dom'

// Mock companies data
const mockCompanies = [
    {
        id: 1,
        name: "Google",
        industry: "Technology",
        logo: "https://logo.clearbit.com/google.com",
        website: "https://www.google.com"
    },
    {
        id: 2,
        name: "Microsoft",
        industry: "Technology",
        logo: "https://logo.clearbit.com/microsoft.com",
        website: "https://www.microsoft.com"
    },
    {
        id: 3,
        name: "Amazon",
        industry: "Technology & E-commerce",
        logo: "https://logo.clearbit.com/amazon.com",
        website: "https://www.amazon.com"
    }
]

const CompaniesScreen = () => {
    const [companies, setCompanies] = useState(mockCompanies)
    const [searchTerm, setSearchTerm] = useState('')

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Companies</h1>
            <input
                type="text"
                placeholder="Search companies..."
                className="w-full p-2 mb-8 border rounded"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map(company => (
                    <Link
                        key={company.id}
                        to={`/company/${company.id}`}
                        className="block bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center mb-4">
                            <img src={company.logo} alt={company.name} className="w-16 h-16 mr-4 rounded" />
                            <div>
                                <h2 className="text-xl font-semibold">{company.name}</h2>
                                <p className="text-gray-600">{company.industry}</p>
                            </div>
                        </div>
                        <div className="text-blue-600 hover:underline">View interview experiences →</div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CompaniesScreen