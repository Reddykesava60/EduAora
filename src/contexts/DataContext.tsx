import React, { createContext, useContext, useState, useEffect } from 'react';

interface Scholarship {
  id: string;
  title: string;
  provider: 'Government' | 'Company' | 'Non-Profit';
  description: string;
  eligibilityCriteria: string[];
  amount: string;
  applicationLink: string;
  deadline: string;
  category: string;
}

interface Course {
  id: string;
  courseTitle: string;
  provider: string;
  description: string;
  category: string;
  accessLink: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
}

interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  timestamp: Date;
  replies: CommunityReply[];
  likes: number;
}

interface CommunityReply {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
}

interface DataContextType {
  scholarships: Scholarship[];
  courses: Course[];
  communityPosts: CommunityPost[];
  addCommunityPost: (post: Omit<CommunityPost, 'id' | 'timestamp' | 'replies' | 'likes'>) => void;
  addReply: (postId: string, reply: Omit<CommunityReply, 'id' | 'timestamp'>) => void;
  likePost: (postId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const mockScholarships: Scholarship[] = [
  {
    id: '1',
    title: 'Federal Pell Grant',
    provider: 'Government',
    description: 'Need-based grant for undergraduate students to help pay for college or career school.',
    eligibilityCriteria: ['U.S. citizen or eligible non-citizen', 'Demonstrate financial need', 'Enrolled in eligible program'],
    amount: 'Up to $7,395',
    applicationLink: 'https://studentaid.gov/h/apply-for-aid/fafsa',
    deadline: '2024-06-30',
    category: 'General'
  },
  {
    id: '2',
    title: 'Google Career Certificates Scholarship',
    provider: 'Company',
    description: 'Scholarships for students pursuing Google Career Certificates in high-growth fields.',
    eligibilityCriteria: ['Currently enrolled in a Google Career Certificate', 'Demonstrate financial need'],
    amount: 'Full tuition coverage',
    applicationLink: 'https://grow.google/certificates/scholarships/',
    deadline: '2024-12-15',
    category: 'Technology'
  },
  {
    id: '3',
    title: 'Gates Millennium Scholars Program',
    provider: 'Non-Profit',
    description: 'Scholarship for outstanding minority students with significant financial need.',
    eligibilityCriteria: ['Minority student', 'High academic achievement', 'Leadership experience'],
    amount: 'Full cost of attendance',
    applicationLink: 'https://www.gmsp.org/',
    deadline: '2024-01-15',
    category: 'Minority'
  },
  {
    id: '4',
    title: 'STEM Education Scholarship',
    provider: 'Government',
    description: 'Supporting students pursuing degrees in Science, Technology, Engineering, and Mathematics.',
    eligibilityCriteria: ['STEM major', 'GPA 3.0 or higher', 'Full-time enrollment'],
    amount: '$5,000',
    applicationLink: 'https://www.stem.gov/scholarships',
    deadline: '2024-03-31',
    category: 'STEM'
  }
];

const mockCourses: Course[] = [
  {
    id: '1',
    courseTitle: 'Introduction to Computer Science',
    provider: 'Harvard University (edX)',
    description: 'Learn the basics of computer science and programming with this comprehensive introductory course.',
    category: 'Technology',
    accessLink: 'https://www.edx.org/course/introduction-computer-science-harvardx-cs50x',
    duration: '12 weeks',
    level: 'Beginner',
    rating: 4.8
  },
  {
    id: '2',
    courseTitle: 'Financial Markets',
    provider: 'Yale University (Coursera)',
    description: 'Understand the ideas, methods, and institutions that permit human society to manage risks.',
    category: 'Finance',
    accessLink: 'https://www.coursera.org/learn/financial-markets-global',
    duration: '7 weeks',
    level: 'Intermediate',
    rating: 4.6
  },
  {
    id: '3',
    courseTitle: 'Digital Marketing Fundamentals',
    provider: 'Google (Coursera)',
    description: 'Learn the fundamentals of digital marketing to help grow your business or career.',
    category: 'Marketing',
    accessLink: 'https://www.coursera.org/learn/digital-marketing',
    duration: '6 weeks',
    level: 'Beginner',
    rating: 4.7
  },
  {
    id: '4',
    courseTitle: 'Machine Learning Course',
    provider: 'Stanford University (Coursera)',
    description: 'Learn about machine learning techniques and how to apply them to real-world problems.',
    category: 'Technology',
    accessLink: 'https://www.coursera.org/learn/machine-learning',
    duration: '11 weeks',
    level: 'Advanced',
    rating: 4.9
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scholarships] = useState<Scholarship[]>(mockScholarships);
  const [courses] = useState<Course[]>(mockCourses);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);

  useEffect(() => {
    const storedPosts = localStorage.getItem('edutalk_community_posts');
    if (storedPosts) {
      setCommunityPosts(JSON.parse(storedPosts));
    } else {
      // Initialize with some sample posts
      const samplePosts: CommunityPost[] = [
        {
          id: '1',
          userId: 'sample',
          userName: 'Alex Student',
          title: 'Tips for scholarship applications',
          content: 'Just wanted to share some tips that helped me secure multiple scholarships. Always start early, tailor your essays, and don\'t be afraid to apply to many!',
          timestamp: new Date('2024-01-15'),
          replies: [],
          likes: 5
        },
        {
          id: '2',
          userId: 'sample2',
          userName: 'Maria Rodriguez',
          title: 'Free coding bootcamps - has anyone tried them?',
          content: 'I\'ve been looking into free coding bootcamps to supplement my CS degree. Has anyone here tried any? Would love to hear your experiences!',
          timestamp: new Date('2024-01-14'),
          replies: [],
          likes: 3
        }
      ];
      setCommunityPosts(samplePosts);
      localStorage.setItem('edutalk_community_posts', JSON.stringify(samplePosts));
    }
  }, []);

  const addCommunityPost = (post: Omit<CommunityPost, 'id' | 'timestamp' | 'replies' | 'likes'>) => {
    const newPost: CommunityPost = {
      ...post,
      id: Date.now().toString(),
      timestamp: new Date(),
      replies: [],
      likes: 0
    };
    
    const updatedPosts = [newPost, ...communityPosts];
    setCommunityPosts(updatedPosts);
    localStorage.setItem('edutalk_community_posts', JSON.stringify(updatedPosts));
  };

  const addReply = (postId: string, reply: Omit<CommunityReply, 'id' | 'timestamp'>) => {
    const newReply: CommunityReply = {
      ...reply,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    const updatedPosts = communityPosts.map(post => 
      post.id === postId 
        ? { ...post, replies: [...post.replies, newReply] }
        : post
    );
    
    setCommunityPosts(updatedPosts);
    localStorage.setItem('edutalk_community_posts', JSON.stringify(updatedPosts));
  };

  const likePost = (postId: string) => {
    const updatedPosts = communityPosts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    );
    
    setCommunityPosts(updatedPosts);
    localStorage.setItem('edutalk_community_posts', JSON.stringify(updatedPosts));
  };

  return (
    <DataContext.Provider value={{ 
      scholarships, 
      courses, 
      communityPosts,
      addCommunityPost,
      addReply,
      likePost
    }}>
      {children}
    </DataContext.Provider>
  );
};