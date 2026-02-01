// 博客文章类型
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: Date;
  updatedAt?: Date;
  category: string;
  tags: string[];
  readTime: number;
  coverImage?: string;
  mood?: 'happy' | 'thoughtful' | 'excited' | 'calm' | 'melancholy';
  location?: string;
  featured?: boolean;
}

// 相册照片类型
export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl: string;
  album: string;
  capturedAt: Date;
  location?: string;
  tags: string[];
  cameraMeta?: {
    camera: string;
    lens?: string;
    settings?: string;
  };
  featured?: boolean;
}

// 用户资料类型
export interface UserProfile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  location?: string;
  social: SocialLinks;
  stats: UserStats;
}

// 社交链接类型
export interface SocialLinks {
  github?: string;
  twitter?: string;
  instagram?: string;
  email?: string;
  website?: string;
}

// 用户统计类型
export interface UserStats {
  totalPosts: number;
  totalPhotos: number;
  yearsActive: number;
  totalViews?: number;
}

// 活动时间线类型
export interface ActivityItem {
  id: string;
  type: 'post' | 'photo' | 'milestone';
  title: string;
  description?: string;
  date: Date;
  url?: string;
  thumbnail?: string;
}

// 主题类型
export type Theme = 'light' | 'dark' | 'system';

// API 响应类型
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// 分页类型
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 搜索过滤器类型
export interface SearchFilters {
  query?: string;
  category?: string;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// 导航菜单项类型
export interface NavItem {
  name: string;
  href: string;
  icon?: string;
  badge?: number;
}