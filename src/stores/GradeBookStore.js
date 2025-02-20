import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import utils from '@/utils/utils'

const url = 'http://localhost:5296/Gradebook/'

export const useGradeBookStore = defineStore('gradeBook', () => {
  const data = ref([])
  const error = ref(null)
  const showModal = ref([])
  const isLoading = ref(false)
  const gradeItemsCount = ref(30)
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

  const getDaysArray = ()=>{
    return daysArray.value
  }

  const fillGradesTable = () => {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + gradeItemsCount.value * -1)
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
  const filterByGradeLevel = (text) => {
    return data.value.filter((g) => g.gradeLevel.toLowerCase().includes(text))
  }
  const dayStrngs = computed(
    () =>
      new Set(
        data.value.flatMap((gradeLevel) => {
          return gradeLevel.dayLessons.map((dayLesson) => dayLesson.dayString)
        })
      )
  )

  return {
    data,
    getDaysArray,
    dataCount,
    filterByGradeLevel,
    dayStrngs,
    getGradeBooks,
    showModal
  }
})
