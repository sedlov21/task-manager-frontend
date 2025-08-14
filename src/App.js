import { ref, onMounted, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export default {
  name: 'App',
  setup() {
    const isLoading = ref(true)
    const currentView = ref('dashboard')
    const tasks = ref([])
    const user = ref(null)

    // Инициализация приложения
    onMounted(async () => {
      try {
        // Симуляция загрузки данных
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Загружаем тестовые данные
        tasks.value = [
          { id: 1, title: 'Изучить Vue.js', completed: false, priority: 'high' },
          { id: 2, title: 'Создать Telegram бота', completed: true, priority: 'medium' },
          { id: 3, title: 'Написать документацию', completed: false, priority: 'low' }
        ]
        
        user.value = {
          name: 'Пользователь',
          points: 150,
          level: 3
        }
        
        isLoading.value = false
      } catch (error) {
        console.error('Error initializing app:', error)
        isLoading.value = false
      }
    })

    const completedTasks = computed(() => tasks.value.filter(task => task.completed))
    const pendingTasks = computed(() => tasks.value.filter(task => !task.completed))

    const addTask = (task) => {
      const newTask = {
        id: Date.now(),
        title: task.title,
        completed: false,
        priority: task.priority || 'medium'
      }
      tasks.value.push(newTask)
    }

    const toggleTask = (taskId) => {
      const task = tasks.value.find(t => t.id === taskId)
      if (task) {
        task.completed = !task.completed
      }
    }

    const deleteTask = (taskId) => {
      tasks.value = tasks.value.filter(t => t.id !== taskId)
    }

    if (isLoading.value) {
      return {
        template: `
          <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div class="text-center">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p class="text-gray-600">Загрузка...</p>
            </div>
          </div>
        `
      }
    }

    return {
      currentView,
      tasks,
      user,
      completedTasks,
      pendingTasks,
      addTask,
      toggleTask,
      deleteTask,
      template: `
        <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <!-- Header -->
          <header class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-4xl mx-auto px-4 py-4">
              <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold text-gray-900">Задачник</h1>
                <div class="flex items-center space-x-4">
                  <div class="text-right">
                    <p class="text-sm text-gray-600">{{ user.name }}</p>
                    <p class="text-lg font-semibold text-primary-500">{{ user.points }} очков</p>
                  </div>
                  <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                    {{ user.level }}
                  </div>
                </div>
              </div>
            </div>
          </header>

          <!-- Main Content -->
          <main class="max-w-4xl mx-auto px-4 py-6">
            <!-- Navigation -->
            <nav class="flex space-x-1 bg-white rounded-lg p-1 mb-6 shadow-sm">
              <button 
                @click="currentView = 'dashboard'"
                :class="['flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors', 
                  currentView === 'dashboard' 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900']"
              >
                Главная
              </button>
              <button 
                @click="currentView = 'tasks'"
                :class="['flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors', 
                  currentView === 'tasks' 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900']"
              >
                Задачи
              </button>
              <button 
                @click="currentView = 'create'"
                :class="['flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors', 
                  currentView === 'create' 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-600 hover:text-gray-900']"
              >
                Создать
              </button>
            </nav>

            <!-- Dashboard View -->
            <div v-if="currentView === 'dashboard'" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-lg p-6 shadow-sm">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Всего задач</h3>
                  <p class="text-3xl font-bold text-primary-500">{{ tasks.length }}</p>
                </div>
                <div class="bg-white rounded-lg p-6 shadow-sm">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Выполнено</h3>
                  <p class="text-3xl font-bold text-green-500">{{ completedTasks.length }}</p>
                </div>
                <div class="bg-white rounded-lg p-6 shadow-sm">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">В процессе</h3>
                  <p class="text-3xl font-bold text-orange-500">{{ pendingTasks.length }}</p>
                </div>
              </div>

              <div class="bg-white rounded-lg p-6 shadow-sm">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Последние задачи</h3>
                <div class="space-y-3">
                  <div v-for="task in tasks.slice(0, 5)" :key="task.id" 
                       class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        :checked="task.completed"
                        @change="toggleTask(task.id)"
                        class="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                      >
                      <span :class="['font-medium', task.completed ? 'line-through text-gray-500' : 'text-gray-900']">
                        {{ task.title }}
                      </span>
                    </div>
                    <span :class="['px-2 py-1 text-xs font-medium rounded-full', 
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800']">
                      {{ task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tasks View -->
            <div v-if="currentView === 'tasks'" class="space-y-6">
              <div class="bg-white rounded-lg p-6 shadow-sm">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Все задачи</h3>
                <div class="space-y-3">
                  <div v-for="task in tasks" :key="task.id" 
                       class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        :checked="task.completed"
                        @change="toggleTask(task.id)"
                        class="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                      >
                      <span :class="['font-medium', task.completed ? 'line-through text-gray-500' : 'text-gray-900']">
                        {{ task.title }}
                      </span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <span :class="['px-2 py-1 text-xs font-medium rounded-full', 
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800']">
                        {{ task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий' }}
                      </span>
                      <button 
                        @click="deleteTask(task.id)"
                        class="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Create Task View -->
            <div v-if="currentView === 'create'" class="bg-white rounded-lg p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Создать новую задачу</h3>
              <form @submit.prevent="addTask({ title: newTaskTitle, priority: newTaskPriority })" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Название задачи</label>
                  <input 
                    v-model="newTaskTitle"
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Введите название задачи"
                    required
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Приоритет</label>
                  <select 
                    v-model="newTaskPriority"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  class="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                >
                  Создать задачу
                </button>
              </form>
            </div>
          </main>
        </div>
      `,
      data() {
        return {
          newTaskTitle: '',
          newTaskPriority: 'medium'
        }
      }
    }
  }
}
