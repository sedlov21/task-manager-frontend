export default {
  props: ['tasks'],
  template: `
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900">Мои задачи</h2>
        <div class="flex space-x-2">
          <button class="px-3 py-1 text-sm bg-primary-500 text-white rounded-lg">Все</button>
          <button class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg">Активные</button>
          <button class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg">Завершенные</button>
        </div>
      </div>
      
      <div v-if="tasks.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        <p class="text-gray-500 mb-2">У вас пока нет задач</p>
        <p class="text-sm text-gray-400">Создайте первую задачу и начните свой путь к продуктивности!</p>
      </div>
      
      <div v-else class="space-y-3">
        <div v-for="task in tasks" :key="task.id" 
             class="bg-white rounded-lg p-4 shadow-sm border">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="font-medium text-gray-900">{{ task.title }}</h3>
              <p class="text-sm text-gray-500 mt-1">{{ task.description || 'Без описания' }}</p>
              <div class="flex items-center mt-2 space-x-2">
                <span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">{{ task.priority }}</span>
                <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">{{ task.status }}</span>
              </div>
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
📄 src/components/CreateTask.js
export default {
  emits: ['task-created'],
  setup(props, { emit }) {
    const task = {
      title: '',
      description: '',
      priority: 'medium',
      deadline: ''
    }

    const createTask = () => {
      // Здесь будет API запрос к backend
      console.log('Создание задачи:', task)
      emit('task-created')
    }

    return {
      task,
      createTask
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
        <h2 class="text-xl font-semibold text-gray-900">Создать задачу</h2>
      </div>
      
      <div class="bg-white rounded-lg p-4 shadow-sm border space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Название задачи</label>
          <input v-model="task.title" 
                 type="text" 
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                 placeholder="Введите название задачи">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Описание</label>
          <textarea v-model="task.description" 
                    rows="3" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Дополнительное описание (необязательно)"></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Приоритет</label>
          <select v-model="task.priority" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Срок выполнения</label>
          <input v-model="task.deadline" 
                 type="date" 
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
        </div>
        
        <button @click="createTask" 
                class="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors">
          Создать задачу
        </button>
      </div>
    </div>
  `
}
