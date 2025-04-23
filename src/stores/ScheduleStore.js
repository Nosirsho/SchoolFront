import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import utils from '@/utils/utils'

const url = 'http://localhost:8010/Schedule/'

export const useScheduleStore = defineStore('schedule', () => {
  const data = ref([])
  const error = ref(null)
  const showModal = ref([])
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

  function processSchedule(schedules) {
    return schedules
      .map((grade) => {
        const updatedDayLessons = grade.dayLessons
          .map((day) => {
            const updatedLessonNumbers = day.lessonNumbers.filter(
              (lesson) => lesson.lessonId !== '00000000-0000-0000-0000-000000000000'
            )
            return {
              ...day,
              lessonNumbers: updatedLessonNumbers
            }
          })
          .filter((day) => day.lessonNumbers.length > 0) // Remove empty dayLessons

        return {
          ...grade,
          dayLessons: updatedDayLessons
        }
      })
      .filter((grade) => grade.dayLessons.length > 0) // Remove grades with empty dayLessons
  }

  const addScheduleList = async () => {
    isLoading.value = true
    try {
      const sendData = processSchedule(data.value)
      await axios.post(`${url}`, sendData)
      error.value = null
    } catch (error) {
      error.value = error
      data.value = null
    } finally {
      isLoading.value = false
    }
  }

  const getScheduleByDayForGradeLevel = async (returning, gradeLevelId, date) => {
    isLoading.value = true
    try {
      const response = await utils.sendRequest(
        'GET',
        'http://localhost:8010/schedules/' + gradeLevelId +'/'+ date
      )
      if (response.state === 0) {
        showModalWindow(true, response.message)
        return
      }
      data.value = response
      if (returning) {
        return data.value
      }
      error.value = null
    } catch (error) {
      error.value = error
      showModalWindow(true, error.message)
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

  //Модальное окно
  const showModalVisible = computed(() => showModal.value.visible)
  const showModalWindow = (isError, msg) => {
    showModal.value.visible = true
    showModal.value.isError = isError
    showModal.value.message = msg
  }
  //End Модальное окно

  return {
    data,
    showModal,
    showModalVisible,
    dataCount,
    getSchedules,
    addLesson,
    deleteLesson,
    setLesson,
    addScheduleList,
    filterByGradeLevel,
    dayStrngs,
    getScheduleByDayForGradeLevel
  }
})
