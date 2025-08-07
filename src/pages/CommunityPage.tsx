import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Plus, Heart, MessageCircle, User, Calendar, Send } from 'lucide-react';

const CommunityPage: React.FC = () => {
  const { user } = useAuth();
  const { communityPosts, addCommunityPost, addReply, likePost } = useData();
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({});

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.title.trim() && newPost.content.trim() && user) {
      addCommunityPost({
        userId: user.id,
        userName: user.name,
        title: newPost.title,
        content: newPost.content
      });
      setNewPost({ title: '', content: '' });
      setShowNewPostForm(false);
    }
  };

  const handleAddReply = (postId: string) => {
    const content = replyContent[postId]?.trim();
    if (content && user) {
      addReply(postId, {
        userId: user.id,
        userName: user.name,
        content
      });
      setReplyContent(prev => ({ ...prev, [postId]: '' }));
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Forum</h1>
          <p className="text-gray-600">
            Connect with fellow students, share experiences, and support each other's educational journey.
          </p>
        </div>

        {/* Create Post Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowNewPostForm(!showNewPostForm)}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Post
          </button>
        </div>

        {/* New Post Form */}
        {showNewPostForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Create a New Post</h2>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="form-input"
                  placeholder="What's your post about?"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <textarea
                  id="content"
                  rows={4}
                  className="form-input"
                  placeholder="Share your thoughts, questions, or experiences..."
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  required
                />
              </div>
              <div className="flex space-x-3">
                <button type="submit" className="btn-primary">
                  Post
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewPostForm(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Community Guidelines */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Community Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">✨ Be Supportive</h3>
              <p>Encourage and help fellow students in their educational journey.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">🤝 Be Respectful</h3>
              <p>Treat everyone with kindness and respect, regardless of their background.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">📚 Share Knowledge</h3>
              <p>Share tips, resources, and experiences that can help others succeed.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">🚫 No Spam</h3>
              <p>Keep posts relevant and valuable to the community.</p>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {communityPosts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600">Be the first to start a conversation!</p>
            </div>
          ) : (
            communityPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{post.userName}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(post.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h2>
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>

                {/* Post Actions */}
                <div className="flex items-center space-x-4 mb-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => likePost(post.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    <span>{post.likes}</span>
                  </button>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <MessageCircle className="h-5 w-5" />
                    <span>{post.replies.length}</span>
                  </div>
                </div>

                {/* Replies */}
                {post.replies.length > 0 && (
                  <div className="space-y-3 mb-4">
                    <h4 className="font-medium text-gray-900">Replies:</h4>
                    {post.replies.map(reply => (
                      <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{reply.userName}</span>
                          <span className="text-xs text-gray-500">{formatDate(reply.timestamp)}</span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={replyContent[post.id] || ''}
                    onChange={(e) => setReplyContent(prev => ({ ...prev, [post.id]: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddReply(post.id)}
                  />
                  <button
                    onClick={() => handleAddReply(post.id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    disabled={!replyContent[post.id]?.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;