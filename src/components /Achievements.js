export default {
  setup() {
    const achievements = [
      { id: 1, title: 'Первые шаги', description: 'Выполните 10 задач', icon: '🌟', isUnlocked: true },
      { id: 2, title: 'Опытный исполнитель', description: 'Выполните 50 задач', icon: '🏆', isUnlocked: false },
      { id: 3, title: 'Неделя продуктивности', description: '7 дней подряд', icon: '🔥', isUnlocked: true }
    ]

    return {
      achievements
    }
  },
  template: `
    <div class="space-y-6">
      <div class="flex items-center">
        <button @click="$emit('navigate', 'dashboard')" class="mr-3">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h2 class="text-xl font-semibold text-gray-900">Достижения</h2>
      </div>
      
      <div class="bg-white rounded-lg p-4 shadow-sm border">
        <div class="grid grid-cols-1 gap-4">
          <div v-for="achievement in achievements" :key="achievement.id" 
               :class="achievement.isUnlocked ? 'opacity-100' : 'opacity-50'"
               class="flex items-center p-4 bg-gray-50 rounded-lg">
            <div class="text-3xl mr-4">{{ achievement.icon }}</div>
            <div class="flex-1">
              <h4 class="font-medium text-gray-900">{{ achievement.title }}</h4>
              <p class="text-sm text-gray-500">{{ achievement.description }}</p>
            </div>
            <div v-if="achievement.isUnlocked" class="text-green-500">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}
