import React, { useEffect } from 'react';
import { useHomeModules } from '@/modules/ModuleRegistry';
import { registerHomeModules } from '@/modules';
import { HeroSidebar } from '@/components/layout/HeroSidebar';
import { HeroMainPanel } from '@/components/layout/HeroMainPanel';

export function HomePage() {
  const { getModulesByArea } = useHomeModules();

  // 注册模块
  useEffect(() => {
    registerHomeModules();
  }, []);

  // 获取不同区域的模块
  const siteModules = getModulesByArea('site');

  // 渲染模块
  const renderModule = (module: any) => {
    const Component = module.component;
    return (
      <Component
        key={module.id}
        {...(module.props || {})}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Hero Section - Two Column Layout */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Sidebar - Avatar, Tags, Timeline */}
            <div className="lg:col-span-4 xl:col-span-3">
              <HeroSidebar />
            </div>

            {/* Right Main Panel - Title, Description, Social */}
            <div className="lg:col-span-8 xl:col-span-9">
              <HeroMainPanel />
            </div>
          </div>
        </section>

        {/* Site Section - Feature Cards */}
        <section>
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
              探索我的
              <span className="text-gradient ml-2">数字世界</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">
              在这里，你可以浏览我的文章、照片和创作统计，了解我的数字生活轨迹
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteModules.map(renderModule)}
          </div>
        </section>
      </div>
    </div>
  );
}