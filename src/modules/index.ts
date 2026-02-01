import { moduleRegistry, HomeModule } from './ModuleRegistry';
import { HeroModule } from './HeroModule';
import { LatestJournalModule } from './LatestJournalModule';
import { StatsModule } from './StatsModule';
import { GalleryPreviewModule } from './GalleryPreviewModule';
import { RecentActivityModule } from './RecentActivityModule';

// 注册所有首页模块
export function registerHomeModules() {
  // Hero 模块
  const heroModule: HomeModule = {
    id: 'hero',
    name: 'Hero Section',
    component: HeroModule,
    props: {
      name: '我的',
      title: '数字花园',
      description: '记录生活点滴，分享思考感悟，用文字和影像编织属于自己的故事',
      showStatus: true
    },
    priority: 100,
    enabled: true
  };

  // 最新日记模块
  const latestJournalModule: HomeModule = {
    id: 'latest-journal',
    name: 'Latest Journal',
    component: LatestJournalModule,
    props: {
      title: '关于慢生活的思考',
      category: '生活感悟',
      excerpt: '在这个快节奏的时代，我们总是被各种事务推着向前跑，很少有时间停下来思考生活的意义。今天在公园里看到一位老人悠闲地喂鸽子，突然意识到...',
      readTime: '5 分钟阅读',
      location: '北京',
      publishedAt: '2 小时前',
      onReadMore: () => {
        // 导航到日记页面
        window.location.href = '/journal';
      }
    },
    gridArea: {
      colSpan: 2,
      order: 1
    },
    priority: 90,
    enabled: true
  };

  // 统计模块
  const statsModule: HomeModule = {
    id: 'stats',
    name: 'Statistics',
    component: StatsModule,
    props: {
      stats: {
        articles: 24,
        photos: 156,
        years: 2,
        views: 10000
      }
    },
    gridArea: {
      colSpan: 1,
      order: 2
    },
    priority: 80,
    enabled: true
  };

  // 相册预览模块
  const galleryPreviewModule: HomeModule = {
    id: 'gallery-preview',
    name: 'Gallery Preview',
    component: GalleryPreviewModule,
    props: {
      photos: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=300&fit=crop'
      ],
      onViewMore: () => {
        // 导航到相册页面
        window.location.href = '/gallery';
      }
    },
    gridArea: {
      colSpan: 1,
      order: 3
    },
    priority: 70,
    enabled: true
  };

  // 最近动态模块
  const recentActivityModule: HomeModule = {
    id: 'recent-activity',
    name: 'Recent Activity',
    component: RecentActivityModule,
    props: {
      activities: [
        {
          id: '1',
          type: 'post' as const,
          title: '发布了新文章《关于慢生活的思考》',
          time: '2 小时前',
          description: '分享了对现代生活节奏的思考'
        },
        {
          id: '2',
          type: 'photo' as const,
          title: '上传了 5 张秋日街拍照片',
          time: '1 天前',
          description: '记录城市中的秋日美景'
        },
        {
          id: '3',
          type: 'milestone' as const,
          title: '博客访问量突破 10,000 次',
          time: '3 天前',
          description: '感谢每一位读者的支持'
        },
        {
          id: '4',
          type: 'update' as const,
          title: '更新了个人简介',
          time: '1 周前',
          description: '完善了关于页面的内容'
        }
      ]
    },
    gridArea: {
      colSpan: 2,
      order: 4
    },
    priority: 60,
    enabled: true
  };

  // 注册所有模块
  moduleRegistry.register(heroModule);
  moduleRegistry.register(latestJournalModule);
  moduleRegistry.register(statsModule);
  moduleRegistry.register(galleryPreviewModule);
  moduleRegistry.register(recentActivityModule);
}

// 模块配置工具函数
export function getModuleConfig(moduleId: string) {
  return moduleRegistry.getModule(moduleId);
}

export function updateModuleConfig(moduleId: string, updates: Partial<HomeModule>) {
  moduleRegistry.updateModule(moduleId, updates);
}

export function toggleModule(moduleId: string, enabled: boolean) {
  moduleRegistry.updateModule(moduleId, { enabled });
}

// 预设配置
export const MODULE_PRESETS = {
  minimal: ['hero', 'latest-journal', 'stats'],
  full: ['hero', 'latest-journal', 'stats', 'gallery-preview', 'recent-activity'],
  creative: ['hero', 'gallery-preview', 'latest-journal', 'recent-activity'],
  professional: ['hero', 'stats', 'latest-journal', 'recent-activity']
};

export function applyPreset(presetName: keyof typeof MODULE_PRESETS) {
  const enabledModules = MODULE_PRESETS[presetName];
  const allModules = moduleRegistry.getAllModules();

  allModules.forEach(module => {
    moduleRegistry.updateModule(module.id, {
      enabled: enabledModules.includes(module.id)
    });
  });
}