export default {
  emits: ['task-created'],
  setup(props, { emit }) {
    const isRecording = false
    const recordingTime = 0

    const startRecording = () => {
      // Здесь будет логика записи голоса
      console.log('Начало записи')
    }

    const stopRecording = () => {
      // Здесь будет логика остановки записи и отправки на backend
      console.log('Остановка записи')
      emit('task-created')
    }

    return {
      isRecording,
      recordingTime,
      startRecording,
      stopRecording
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
        <h2 class="text-xl font-semibold text-gray-900">Голосовой ввод</h2>
      </div>
      
      <div class="bg-white rounded-lg p-8 shadow-sm border text-center">
        <div class="mb-6">
          <svg class="w-16 h-16 text-primary-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Запись голосового сообщения</h3>
          <p class="text-gray-500">Нажмите кнопку и расскажите о вашей задаче</p>
        </div>
        
        <div class="mb-6">
          <button v-if="!isRecording" 
                  @click="startRecording"
                  class="w-20 h-20 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors flex items-center justify-center">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
            </svg>
          </button>
          
          <button v-else 
                  @click="stopRecording"
                  class="w-20 h-20 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center animate-pulse">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h12v2H6V4zm0 14h12v2H6v-2z"/>
            </svg>
          </button>
        </div>
        
        <p v-if="isRecording" class="text-sm text-gray-500">
          Запись... {{ recordingTime }}с
        </p>
        
        <p v-else class="text-sm text-gray-500">
          Нажмите кнопку для начала записи
        </p>
      </div>
    </div>
  `
}
