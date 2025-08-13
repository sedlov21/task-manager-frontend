export default {
  props: ['user', 'tasks'],
  emits: ['navigate'],
  setup(props, { emit }) {
    const stats = {
      totalTasks: props.tasks.length,
      completedTasks: props.tasks.filter(t => t.status === 'completed').length,
      totalStars: 42,
      currentStreak: 7
    }

    return {
      stats,
      emit
    }
  },
  template: `
    <div class="space-y-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white rounded-lg p-4 shadow-sm border">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">{{ stats.totalStars }}</p>
              <p class="text-xs text-gray-500">Звезды</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg p-4 shadow-sm border">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">{{ stats.completedTasks }}</p>
              <p class="text-xs text-gray-500">Выполнено</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-lg p-4 shadow-sm border">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Быстрые действия</h3>
        <div class="grid grid-cols-2 gap-3">
          <button @click="$emit('navigate', 'create')" 
                  class="flex items-center justify-center p-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Создать задачу
          </button>
          
          <button @click="$emit('navigate', 'voice')" 
                  class="flex items-center justify-center p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
            </svg>
            Голосовой ввод
          </button>
        </div>
      </div>

      <!-- Active Tasks -->
      <div class="bg-white rounded-lg p-4 shadow-sm border">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Активные задачи</h3>
          <button @click="$emit('navigate', 'tasks')" 
                  class="text-sm text-primary-500 hover:text-primary-600">
            Все задачи →
          </button>
        </div>
        
        <div v-if="tasks.length === 0" class="text-center py-8">
          <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <p class="text-gray-500">Нет активных задач</p>
          <button @click="$emit('navigate', 'create')" 
                  class="mt-2 text-sm text-primary-500 hover:text-primary-600">
            Создать первую задачу
          </button>
        </div>
        
        <div v-else class="space-y-3">
          <div v-for="task in tasks.slice(0, 3)" :key="task.id" 
               class="flex items-center p-3 bg-gray-50 rounded-lg">
            <div class="flex-1">
              <p class="font-medium text-gray-900">{{ task.title }}</p>
              <p class="text-sm text-gray-500">{{ task.priority }}</p>
            </div>
            <button class="p-2 text-green-600 hover:bg-green-100 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
}
