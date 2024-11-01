import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useScheduleStore = defineStore('schedule', () => {
  const data = ref([])
  const textFull =
    '[{"Grade":"1a","Schedule":[{"Day":1,"Lesson":[{"Number":1,"Name":"Химия"},{"Number":2,"Name":"Mat"},{"Number":3,"Name":"qwer"}]},{"Day":2,"Lesson":[{"Number":1,"Name":"Химия"},{"Number":2,"Name":"Mat"},{"Number":3,"Name":"qwer"}]},{"Day":3,"Lesson":[{"Number":1,"Name":"Химия"},{"Number":2,"Name":"Mat"},{"Number":3,"Name":"qwer"}]},{"Day":4,"Lesson":[{"Number":1,"Name":"Химия"},{"Number":2,"Name":"Mat"},{"Number":3,"Name":"qwer"}]},{"Day":5,"Lesson":[{"Number":1,"Name":"Химия"},{"Number":2,"Name":"Mat"},{"Number":3,"Name":"qwer"}]},{"Day":6,"Lesson":[{"Number":1,"Name":"Химия"},{"Number":2,"Name":"Mat"},{"Number":3,"Name":"qwer"}]}]},{"Grade":"2a","Schedule":[{"Day":1,"Lesson":[{"Number":1,"Name":"Химия"},{"Number":2,"Name":"Mat"},{"Number":3,"Name":"qwer"}]},{"Day":2,"Lesson":[{"Number":1,"Name":"Химия"},{"Number":2,"Name":"Mat"},{"Number":3,"Name":"qwer"}]},{"Day":3,"Lesson":[{"Number":1,"Name":"Химия"},{"Number":2,"Name":"Mat"},{"Number":3,"Name":"qwer"}]},{"Day":4,"Lesson":[{"Number":1,"Name":"Химия"},{"Number":2,"Name":"Mat"},{"Number":3,"Name":"qwer"}]},{"Day":5,"Lesson":[{"Number":1,"Name":"Химия"},{"Number":2,"Name":"Mat"},{"Number":3,"Name":"qwer"}]},{"Day":6,"Lesson":[{"Number":1,"Name":"Химия"},{"Number":2,"Name":"Mat"},{"Number":3,"Name":"qwer"}]}]},{"Grade":"3a","Schedule":[{"Day":1,"Lesson":[{"Number":1,"Name":"Химия"},{"Number":2,"Name":"Mat"},{"Number":3,"Name":"qwer"}]},{"Day":2,"Lesson":[{"Number":1,"Name":"Химия"},{"Number":2,"Name":"Mat"},{"Number":3,"Name":"qwer"}]},{"Day":3,"Lesson":[{"Number":1,"Name":"Химия"},{"Number":2,"Name":"Mat"},{"Number":3,"Name":"qwer"}]},{"Day":4,"Lesson":[{"Number":1,"Name":"Химия"},{"Number":2,"Name":"Mat"},{"Number":3,"Name":"qwer"}]},{"Day":5,"Lesson":[{"Number":1,"Name":"Химия"},{"Number":2,"Name":"Mat"},{"Number":3,"Name":"qwer"}]},{"Day":6,"Lesson":[{"Number":1,"Name":"Химия"},{"Number":2,"Name":"Mat"},{"Number":3,"Name":"qwer"}]}]}]'

  const arr = JSON.parse(textFull)
  data.value = arr

  const dataCount = computed(() => data.value.length)

  const addLesson = (grade, day) => {
    const gradeIdx = data.value.findIndex((x) => x.Grade === grade)
    const dayIdx = data.value[gradeIdx].Schedule.findIndex((x) => x.Day === day)
    var lessonCount = data.value[gradeIdx].Schedule[dayIdx].Lesson.length
    for (let i = 1; i <= lessonCount + 1; i++) {
      if (
        data.value[gradeIdx].Schedule[dayIdx].Lesson.findIndex((lesson) => lesson.Number === i) ===
        -1
      ) {
        lessonCount = i
        break
      }
    }

    const newLesson = {
      Number: lessonCount,
      Name: 'Новый предмет'
    }
    data.value[gradeIdx].Schedule[dayIdx].Lesson.push(newLesson)
    data.value[gradeIdx].Schedule[dayIdx].Lesson = data.value[gradeIdx].Schedule[
      dayIdx
    ].Lesson.sort((a, b) => a.Number - b.Number)
  }

  const delleteLesson = (grade, day, num) => {
    const gradeIdx = data.value.findIndex((x) => x.Grade === grade)
    const dayIdx = data.value[gradeIdx].Schedule.findIndex((x) => x.Day === day)
    const lessonIdx = data.value[gradeIdx].Schedule[dayIdx].Lesson.findIndex(
      (x) => x.Number === num
    )
    console.log('gradeIdx : ' + gradeIdx + ' dayIdx: ' + dayIdx + ' lessonIdx: ' + lessonIdx)

    data.value[gradeIdx].Schedule[dayIdx].Lesson.splice(lessonIdx, 1)
  }
  return {
    data,
    dataCount,
    addLesson,
    delleteLesson
  }
})
