import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import utils from '@/utils/utils'

const url = 'http://localhost:5296/Gradebook/'

export const useGradeBookStore = defineStore('gradeBook', () => {
  const data = ref([])
  const error = ref(null)
  const showModal = ref([])
  const isLoading = ref(false)
  const gradeItemsCount = ref()
  const daysArray = ref([])

  const getGradeBooks = async () => {
    console.log()
    isLoading.value = true
    try {
      const response = await utils.sendRequest('GET', url)

      data.value = response
      fillGradesTable()
      error.value = null
    } catch (error) {
      error.value = error
      data.value = null
    } finally {
      isLoading.value = false
    }
  }
  const getIntervalGradeBooks = async (start, lessonId) => {
    const currentDate = new Date(start)
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const end = utils.formatDate(new Date(year, month + 1, 0))

    isLoading.value = true
    try {
      const response = await utils.sendRequest('GET', url + lessonId + '/' + start + '/' + end)
      //'http://localhost:5296/gradebook/9e187c26-fd6d-459d-bfb5-c688e2b721d1/2025-02-01/2025-02-28'
      data.value = response
      fillGradesTable(start)
      error.value = null
    } catch (error) {
      error.value = error
      data.value = null
    } finally {
      isLoading.value = false
    }
  }

  const getDaysArray = () => {
    return daysArray.value
  }

  const fillGradesTable = (start) => {
    daysArray.value = []
    const currentDate = start ? new Date(start) : new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate()

    gradeItemsCount.value = lastDayOfMonth

    currentDate.setDate(currentDate.getDate() + currentDate.getDate() * -1)
    //currentDate.setDate(currentDate.getDate() + gradeItemsCount.value * -1)
    for (let i = 0; i < gradeItemsCount.value; i++) {
      currentDate.setDate(currentDate.getDate() + 1)
      daysArray.value.push(utils.formatDate(currentDate))
    }
    const students = []
    data.value.forEach((studentItem) => {
      const grades = []
      daysArray.value.forEach((dayItem) => {
        const grade = []
        grade.date = dayItem
        grade.grade = ''
        studentItem.grades.forEach((gradeItem) => {
          if (dayItem === gradeItem.date) {
            grade.grade = gradeItem.grade
            grade.id = gradeItem.id
          }
        })
        grades.push(grade)
      })
      studentItem.grades = grades
      students.push(studentItem)
    })
    data.value = students
  }

  const dataCount = computed(() => gradeItemsCount.value)
  const systemDate = computed(() => new Date())

  const filterByGradeLevel = (text) => {
    return data.value.filter((g) => g.gradeLevel.toLowerCase().includes(text))
  }

  return {
    data,
    getDaysArray,
    systemDate,
    dataCount,
    filterByGradeLevel,
    getGradeBooks,
    getIntervalGradeBooks,
    showModal
  }
})
