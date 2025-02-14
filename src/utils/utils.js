import axios from 'axios'
export default {
  formatDate: (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  },

   sendRequest: async (method, url, data = null) =>{
    try {
      const response = await axios({
        method,
        url,
        data
      })

      // Проверяем статус код и структуру ApiResponse
      if (response.status >= 200 && response.status < 300) {
        if (response.data && response.data.state === 1) {
          // Проверяем наличие 'data'
          return response.data.data // Возвращаем данные
        } else if (response.data && response.data.state === 0) {
          return response.data // Возвращаем ApiResponse полностью, если нет data, но есть message
        } else {
          throw new Error('Некорректный формат ответа') // Обработка некорректного формата
        }
      } else {
        // Обрабатываем ошибки, если сервер вернул ApiResponse с ошибкой
        if (response.data && response.data.message) {
          throw new Error(response.data.message)
        }
        throw new Error(`Ошибка запроса: ${response.status}`)
      }
    } catch (error) {
      console.error('Ошибка запроса:', error)
      throw error // Пробрасываем ошибку выше для обработки в компоненте
    }
  }
}
