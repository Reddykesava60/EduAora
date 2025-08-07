import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { DollarSign, BookOpen, Users, TrendingUp, Calendar, Award } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { scholarships, courses, communityPosts } = useData();

  const quickStats = [
    {
      title: 'Available Scholarships',
      value: scholarships.length.toString(),
      icon: DollarSign,
      color: 'text-green-600 bg-green-100',
      link: '/scholarships'
    },
    {
      title: 'Free Courses',
      value: courses.length.toString(),
      icon: BookOpen,
      color: 'text-blue-600 bg-blue-100',
      link: '/courses'
    },
    {
      title: 'Community Posts',
      value: communityPosts.length.toString(),
      icon: Users,
      color: 'text-purple-600 bg-purple-100',
      link: '/community'
    },
    {
      title: 'Success Rate',
      value: '95%',
      icon: TrendingUp,
      color: 'text-orange-600 bg-orange-100',
      link: '/profile'
    }
  ];

  const recentScholarships = scholarships.slice(0, 3);
  const recentCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="mt-2 text-gray-600">
            Here's your personalized dashboard to track your educational journey.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Link
                key={index}
                to={stat.link}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow card-hover"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{stat.value}</h3>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Scholarships */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <DollarSign className="h-6 w-6 text-green-600 mr-2" />
                Featured Scholarships
              </h2>
              <Link to="/scholarships" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View all →
              </Link>
            </div>
            <div className="space-y-4">
              {recentScholarships.map(scholarship => (
                <div key={scholarship.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{scholarship.title}</h3>
                    <span className="text-sm text-green-600 font-medium">{scholarship.amount}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{scholarship.description.slice(0, 100)}...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {scholarship.provider}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Due: {new Date(scholarship.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Courses */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
                Recommended Courses
              </h2>
              <Link to="/courses" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View all →
              </Link>
            </div>
            <div className="space-y-4">
              {recentCourses.map(course => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">{course.courseTitle}</h3>
                  <p className="text-sm text-gray-600 mb-2">{course.description.slice(0, 100)}...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {course.provider}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{course.duration}</span>
                      <div className="flex items-center">
                        <Award className="h-3 w-3 text-yellow-500 mr-1" />
                        <span className="text-xs text-gray-500">{course.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/scholarships" className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 hover:from-green-100 hover:to-green-200 transition-all card-hover">
            <DollarSign className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Scholarships</h3>
            <p className="text-gray-600 text-sm">
              Discover funding opportunities that match your profile and academic goals.
            </p>
          </Link>

          <Link to="/courses" className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 hover:from-blue-100 hover:to-blue-200 transition-all card-hover">
            <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Take Free Courses</h3>
            <p className="text-gray-600 text-sm">
              Access high-quality educational content from top universities and institutions.
            </p>
          </Link>

          <Link to="/community" className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 hover:from-purple-100 hover:to-purple-200 transition-all card-hover">
            <Users className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Join Community</h3>
            <p className="text-gray-600 text-sm">
              Connect with fellow students, share experiences, and get support.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;