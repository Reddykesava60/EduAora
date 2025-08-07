import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { Search, Filter, ExternalLink, Calendar, DollarSign, Building } from 'lucide-react';

const ScholarshipsPage: React.FC = () => {
  const { scholarships } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const providers = ['All', ...Array.from(new Set(scholarships.map(s => s.provider)))];
  const categories = ['All', ...Array.from(new Set(scholarships.map(s => s.category)))];

  const filteredScholarships = useMemo(() => {
    return scholarships.filter(scholarship => {
      const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProvider = selectedProvider === 'All' || scholarship.provider === selectedProvider;
      const matchesCategory = selectedCategory === 'All' || scholarship.category === selectedCategory;
      
      return matchesSearch && matchesProvider && matchesCategory;
    });
  }, [scholarships, searchTerm, selectedProvider, selectedCategory]);

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'Government':
        return 'bg-blue-100 text-blue-800';
      case 'Company':
        return 'bg-green-100 text-green-800';
      case 'Non-Profit':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Scholarships & Grants</h1>
          <p className="text-gray-600">
            Find financial aid opportunities to support your education. We've found {filteredScholarships.length} scholarships for you.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search scholarships..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Provider Filter */}
            <div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                >
                  {providers.map(provider => (
                    <option key={provider} value={provider}>{provider}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map(scholarship => (
            <div key={scholarship.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{scholarship.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProviderColor(scholarship.provider)}`}>
                    {scholarship.provider}
                  </span>
                </div>

                {/* Amount */}
                <div className="flex items-center mb-3">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-xl font-bold text-green-600">{scholarship.amount}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{scholarship.description}</p>

                {/* Eligibility Criteria */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Eligibility:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {scholarship.eligibilityCriteria.slice(0, 2).map((criteria, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {criteria}
                      </li>
                    ))}
                    {scholarship.eligibilityCriteria.length > 2 && (
                      <li className="text-blue-600">+ {scholarship.eligibilityCriteria.length - 2} more criteria</li>
                    )}
                  </ul>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Due: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                  </div>
                  <a
                    href={scholarship.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Apply Now
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredScholarships.length === 0 && (
          <div className="text-center py-12">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No scholarships found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters to find more opportunities.
            </p>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">💡 Scholarship Application Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Before Applying:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Read all eligibility requirements carefully</li>
                <li>• Gather required documents in advance</li>
                <li>• Note application deadlines and set reminders</li>
                <li>• Research the organization offering the scholarship</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Application Best Practices:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Tailor your essays to each scholarship</li>
                <li>• Proofread everything multiple times</li>
                <li>• Submit applications well before deadlines</li>
                <li>• Keep copies of all submitted materials</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipsPage;