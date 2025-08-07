import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Edit3, Save, X, Camera, Award, BookOpen, Calendar } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    userType: user?.userType || 'College',
    fieldOfStudy: user?.fieldOfStudy || '',
    graduationYear: user?.graduationYear || new Date().getFullYear(),
    bio: user?.bio || ''
  });

  if (!user) return null;

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      userType: user.userType,
      fieldOfStudy: user.fieldOfStudy || '',
      graduationYear: user.graduationYear || new Date().getFullYear(),
      bio: user.bio || ''
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'graduationYear' ? parseInt(value, 10) : value
    }));
  };

  const achievements = [
    { icon: BookOpen, title: 'Course Completion', count: 3, color: 'text-blue-600 bg-blue-100' },
    { icon: Award, title: 'Scholarships Applied', count: 5, color: 'text-green-600 bg-green-100' },
    { icon: User, title: 'Community Posts', count: 2, color: 'text-purple-600 bg-purple-100' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              {/* Basic Info */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600 mt-1">{user.userType} Student</p>
                <p className="text-gray-500 text-sm mt-1">{user.email}</p>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="btn-primary">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </button>
                  <button onClick={handleCancel} className="btn-outline">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="btn-outline">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
            <div>
              <label className="text-sm font-medium text-gray-700">Field of Study</label>
              {isEditing ? (
                <input
                  type="text"
                  name="fieldOfStudy"
                  className="mt-1 form-input"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                  placeholder="e.g., Computer Science"
                />
              ) : (
                <p className="mt-1 text-gray-900">{user.fieldOfStudy || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Expected Graduation</label>
              {isEditing ? (
                <input
                  type="number"
                  name="graduationYear"
                  min="2024"
                  max="2035"
                  className="mt-1 form-input"
                  value={formData.graduationYear}
                  onChange={handleChange}
                />
              ) : (
                <p className="mt-1 text-gray-900 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {user.graduationYear || 'Not specified'}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Student Type</label>
              {isEditing ? (
                <select
                  name="userType"
                  className="mt-1 form-input"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <option value="High School">High School Student</option>
                  <option value="College">College Student</option>
                  <option value="Adult Learner">Adult Learner</option>
                </select>
              ) : (
                <p className="mt-1 text-gray-900">{user.userType}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
          {isEditing ? (
            <textarea
              name="bio"
              rows={4}
              className="form-input"
              placeholder="Tell others about yourself, your goals, and what you're studying..."
              value={formData.bio}
              onChange={handleChange}
            />
          ) : (
            <p className="text-gray-700">
              {user.bio || 'No bio available yet. Click "Edit Profile" to add information about yourself!'}
            </p>
          )}
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="text-center p-6 rounded-lg bg-gray-50">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${achievement.color} mb-3`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{achievement.count}</div>
                  <div className="text-sm text-gray-600">{achievement.title}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Educational Goals */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Educational Goals</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Complete 5 Free Courses</h3>
                <p className="text-sm text-gray-600">Progress: 3/5 courses completed</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">60%</div>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Apply to 10 Scholarships</h3>
                <p className="text-sm text-gray-600">Progress: 5/10 applications submitted</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">50%</div>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Active Community Participation</h3>
                <p className="text-sm text-gray-600">Goal: Help 10 fellow students this month</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-purple-600">20%</div>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;