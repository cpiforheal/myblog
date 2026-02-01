import React, { useEffect } from 'react';
import { useHomeModules } from '@/modules/ModuleRegistry';
import { registerHomeModules } from '@/modules';

export function HomePage() {
  const { getModulesByArea } = useHomeModules();

  // 注册模块
  useEffect(() => {
    registerHomeModules();
  }, []);

  // 获取不同区域的模块
  const heroModules = getModulesByArea('hero');
  const mainModules = getModulesByArea('main');
  const sidebarModules = getModulesByArea('sidebar');

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
        {/* Hero Section */}
        {heroModules.map(renderModule)}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {mainModules.map(renderModule)}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {sidebarModules.map(renderModule)}
          </div>
        </div>
      </div>
    </div>
  );
}