import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const url = 'http://localhost:5296/Schedule/'

export const useScheduleStore = defineStore('schedule', () => {
  const data = ref([])
  const error = ref(null)
  const isLoading = ref(false)

  const dataCount = computed(() => data.value.length)
  const getSchedules = async () => {
    isLoading.value = true
    try {
      const response = await axios.get(url)
      data.value = response.data
      data.value.forEach((element) => {
        element.dayLessons = element.dayLessons.sort((a, b) => a.dayInt - b.dayInt)
      })
      error.value = null
    } catch (error) {
      error.value = error
      data.value = null
    } finally {
      isLoading.value = false
    }
  }

  const addLesson = (grade, day) => {
    const gradeIdx = data.value.findIndex((x) => x.gradeLevel === grade)
    const dayIdx = data.value[gradeIdx].dayLessons.findIndex((x) => x.dayInt === day)
    var lessonCount = data.value[gradeIdx].dayLessons[dayIdx].lessonNumbers.length
    for (let i = 1; i <= lessonCount + 1; i++) {
      if (
        data.value[gradeIdx].dayLessons[dayIdx].lessonNumbers.findIndex(
          (lesson) => lesson.number === i
        ) === -1
      ) {
        lessonCount = i
        break
      }
    }

    const newLesson = {
      number: lessonCount,
      lessonId: ''
    }

    data.value[gradeIdx].dayLessons[dayIdx].lessonNumbers.push(newLesson)

    const sorted = data.value[gradeIdx].dayLessons[dayIdx].lessonNumbers.sort(
      (a, b) => a.number - b.number
    )
    data.value[gradeIdx].dayLessons[dayIdx].lessonNumbers = sorted
  }

  const setLesson = (grade, day, num, lessonId) => {
    const gradeIdx = data.value.findIndex((x) => x.gradeLevel === grade)
    const dayIdx = data.value[gradeIdx].dayLessons.findIndex((x) => x.dayInt === day)
    const lessonsArr = data.value[gradeIdx].dayLessons[dayIdx]
    const lessonIdx = lessonsArr.lessonNumbers.findIndex((x) => x.number === num)

    if (lessonIdx !== -1) {
      const lesson = lessonsArr.lessonNumbers[lessonIdx]
      lesson.lessonId = lessonId
      lessonsArr.lessonNumbers.splice(lessonIdx, 1, lesson)
    }
  }

  const deleteLesson = (grade, day, num) => {
    const gradeIdx = data.value.findIndex((x) => x.gradeLevel === grade)
    const dayIdx = data.value[gradeIdx].dayLessons.findIndex((x) => x.dayInt === day)
    const lessonIdx = data.value[gradeIdx].dayLessons[dayIdx].lessonNumbers.findIndex(
      (x) => x.number === num
    )
    console.log('before')
    console.log(data.value)
    data.value[gradeIdx].dayLessons[dayIdx].lessonNumbers.splice(lessonIdx, 1)
    console.log('end')
    console.log(data.value)
  }

  const addScheduleList = async () => {
    isLoading.value = true
    try {
      await axios.post(`${url}`, data.value)
      error.value = null
    } catch (error) {
      error.value = error
      data.value = null
    } finally {
      isLoading.value = false
    }
  }
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
    dataCount,
    getSchedules,
    addLesson,
    deleteLesson,
    setLesson,
    addScheduleList,
    filterByGradeLevel,
    dayStrngs
  }
})
