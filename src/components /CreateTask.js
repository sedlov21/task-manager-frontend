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
