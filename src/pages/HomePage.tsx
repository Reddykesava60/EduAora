import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, DollarSign, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: DollarSign,
      title: 'Financial Aid',
      description: 'Find scholarships, grants, and funding opportunities tailored to your needs.',
      color: 'text-green-600'
    },
    {
      icon: BookOpen,
      title: 'Free Courses',
      description: 'Access high-quality educational content from top universities and institutions.',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with fellow students and share experiences and advice.',
      color: 'text-purple-600'
    },
    {
      icon: Award,
      title: 'Success Tracking',
      description: 'Track your applications and celebrate your educational achievements.',
      color: 'text-orange-600'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Students Helped' },
    { number: '$50M+', label: 'In Scholarships Found' },
    { number: '500+', label: 'Free Courses Available' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 hero-pattern py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Unlock Your <span className="text-blue-600">Educational Dreams</span>
              <span className="block"> Without</span> Financial Barriers
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              Discover thousands of scholarships, grants, and free courses designed to support your academic journey. We're here to help you succeed, regardless of your financial situation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link to="/dashboard" className="btn-primary text-lg px-8 py-3">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 inline" />
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="btn-primary text-lg px-8 py-3">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 inline" />
                  </Link>
                  <Link to="/login" className="btn-outline text-lg px-8 py-3">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive support for your educational journey, 
              from finding funding to gaining new skills.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                    <IconComponent className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Making a Real Impact
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose EDUTALK?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">100% Free to Use</h3>
                    <p className="text-gray-600">No hidden fees or premium subscriptions required.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Personalized Recommendations</h3>
                    <p className="text-gray-600">Get scholarship and course suggestions based on your profile.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Expert Guidance</h3>
                    <p className="text-gray-600">Access tips and guidance from education professionals.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Community Support</h3>
                    <p className="text-gray-600">Connect with thousands of students on similar journeys.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start?</h3>
                <p className="text-gray-600 mb-6">
                  Join thousands of students who have found their path to educational success.
                </p>
                {!user && (
                  <Link to="/signup" className="btn-primary text-lg px-8 py-3">
                    Create Your Free Account
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;