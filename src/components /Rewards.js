export default {
  setup() {
    const rewards = [
      { id: 1, title: 'Пицца на ужин', starsCost: 50, isClaimed: false },
      { id: 2, title: 'Поход в кино', starsCost: 100, isClaimed: false },
      { id: 3, title: 'Новая книга', starsCost: 30, isClaimed: true }
    ]

    const claimReward = (rewardId) => {
      console.log('Получение награды:', rewardId)
    }

    return {
      rewards,
      claimReward
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
        <h2 class="text-xl font-semibold text-gray-900">Мои награды</h2>
      </div>
      
      <div class="bg-white rounded-lg p-4 shadow-sm border">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Доступные награды</h3>
          <span class="text-sm text-gray-500">42 звезды</span>
        </div>
        
        <div class="space-y-3">
          <div v-for="reward in rewards" :key="reward.id" 
               class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 class="font-medium text-gray-900">{{ reward.title }}</h4>
              <p class="text-sm text-gray-500">{{ reward.starsCost }} звезд</p>
            </div>
            <button v-if="!reward.isClaimed" 
                    @click="claimReward(reward.id)"
                    class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
              Получить
            </button>
            <span v-else class="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm">
              Получено
            </span>
          </div>
        </div>
      </div>
    </div>
  `
}
