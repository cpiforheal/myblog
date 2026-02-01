import React from 'react';

// 模块接口定义
export interface HomeModule {
  id: string;
  name: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  gridArea?: {
    colSpan?: number;
    rowSpan?: number;
    order?: number;
  };
  enabled?: boolean;
  priority?: number;
}

// 模块注册表
class ModuleRegistry {
  private modules: Map<string, HomeModule> = new Map();

  register(module: HomeModule) {
    this.modules.set(module.id, module);
  }

  unregister(moduleId: string) {
    this.modules.delete(moduleId);
  }

  getModule(moduleId: string): HomeModule | undefined {
    return this.modules.get(moduleId);
  }

  getAllModules(): HomeModule[] {
    return Array.from(this.modules.values())
      .filter(module => module.enabled !== false)
      .sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  getModulesByArea(area: 'hero' | 'main' | 'sidebar'): HomeModule[] {
    return this.getAllModules().filter(module => {
      // 根据模块配置决定显示区域
      if (area === 'hero' && module.id === 'hero') return true;
      if (area === 'sidebar' && module.gridArea?.colSpan === 1) return true;
      if (area === 'main' && module.id !== 'hero' && module.gridArea?.colSpan !== 1) return true;
      return false;
    });
  }

  updateModule(moduleId: string, updates: Partial<HomeModule>) {
    const module = this.modules.get(moduleId);
    if (module) {
      this.modules.set(moduleId, { ...module, ...updates });
    }
  }
}

// 全局模块注册表实例
export const moduleRegistry = new ModuleRegistry();

// React Hook 用于获取模块
export function useHomeModules() {
  const [modules, setModules] = React.useState<HomeModule[]>([]);

  React.useEffect(() => {
    const updateModules = () => {
      setModules(moduleRegistry.getAllModules());
    };

    updateModules();

    // 可以添加事件监听器来响应模块变化
    return () => {
      // 清理逻辑
    };
  }, []);

  return {
    modules,
    getModulesByArea: (area: 'hero' | 'main' | 'sidebar') =>
      moduleRegistry.getModulesByArea(area),
    updateModule: (moduleId: string, updates: Partial<HomeModule>) => {
      moduleRegistry.updateModule(moduleId, updates);
      setModules(moduleRegistry.getAllModules());
    }
  };
}