import { moduleRegistry, HomeModule } from './ModuleRegistry';
import { LatestJournalModule } from './LatestJournalModule';
import { StatsModule } from './StatsModule';
import { GalleryPreviewModule } from './GalleryPreviewModule';
import { GuestbookPreviewModule } from './GuestbookPreviewModule';

// 注册所有首页模块
export function registerHomeModules() {
  // 最新日记模块 - 作为站点功能卡片
  const latestJournalModule: HomeModule = {
    id: 'latest-journal',
    name: 'Latest Journal',
    component: LatestJournalModule,
    area: 'site',
    props: {
      title: '关于慢生活的思考',
      category: '生活感悟',
      excerpt: '在这个快节奏的时代，我们总是被各种事务推着向前跑，很少有时间停下来思考生活的意义。今天在公园里看到一位老人悠闲地喂鸽子，突然意识到...',
      readTime: '5 分钟阅读',
      location: '北京',
      publishedAt: '2 小时前',
      onReadMore: () => {
        // 导航到博客页面
        window.location.href = '/blog';
      }
    },
    priority: 90,
    enabled: true
  };

  // 统计模块 - 作为站点功能卡片
  const statsModule: HomeModule = {
    id: 'stats',
    name: 'Statistics',
    component: StatsModule,
    area: 'site',
    props: {
      stats: {
        articles: 24,
        photos: 156,
        years: 2,
        views: 10000
      }
    },
    priority: 80,
    enabled: true
  };

  // 相册预览模块 - 作为站点功能卡片
  const galleryPreviewModule: HomeModule = {
    id: 'gallery-preview',
    name: 'Gallery Preview',
    component: GalleryPreviewModule,
    area: 'site',
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
    priority: 70,
    enabled: true
  };

  // 注册所有模块
  moduleRegistry.register(latestJournalModule);
  moduleRegistry.register(statsModule);
  moduleRegistry.register(galleryPreviewModule);

  // 留言墙预览模块 - 作为站点功能卡片
  const guestbookPreviewModule: HomeModule = {
    id: 'guestbook-preview',
    name: 'Guestbook Preview',
    component: GuestbookPreviewModule,
    area: 'site',
    props: {},
    priority: 60,
    enabled: true,
  };
  moduleRegistry.register(guestbookPreviewModule);
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
  minimal: ['latest-journal', 'stats'],
  full: ['latest-journal', 'stats', 'gallery-preview', 'guestbook-preview'],
  creative: ['gallery-preview', 'latest-journal', 'guestbook-preview'],
  professional: ['stats', 'latest-journal']
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