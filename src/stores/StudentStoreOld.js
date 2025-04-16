import { defineStore } from 'pinia'
import axios from 'axios'

const url = 'http://localhost:8010/Student/'

export const useStudentStore2 = defineStore('studentStore', {
  state: () => ({
    data: [],
    error: null,
    isLoading: false,
    currentStudent: null
  }),
  actions: {
    async searchByName(params) {
      this.isLoading = true
      try {
        const response = await axios.get(`${url}search`, { params })
        this.data = response.data
        this.error = null
      } catch (error) {
        this.error = error
        this.data = null
      } finally {
        this.isLoading = false
      }
    },

    async getStudents() {
      this.isLoading = true
      try {
        const response = await axios.get(url)
        this.data = response.data
        this.error = null
      } catch (error) {
        this.error = error
        this.data = null
      } finally {
        this.isLoading = false
      }
    },
    async getStudentById(id) {
      this.isLoading = true
      try {
        const response = await axios.get(`${url}${id}`)
        this.currentStudent = response.data
        this.error = null
      } catch (error) {
        this.error = error
        this.currentStudent = null
      } finally {
        this.isLoading = false
      }
    },
    async editStudent(params) {
      this.isLoading = true
      try {
        const response = await axios.put(`${url}${params.id}`, params)
        const student = response.data
        const index = this.data.findIndex((item) => item.id === student.id)
        if (index !== -1) {
          this.data.splice(index, 1, student)
        }
        this.error = null
      } catch (error) {
        this.error = error
        this.data = null
      } finally {
        this.isLoading = false
      }
    },
    async addStudent(params) {
      this.isLoading = true
      try {
        const response = await axios.post(`${url}`, params)
        const student = response.data
        this.data.push(student)
        this.error = null
      } catch (error) {
        this.error = error
        this.data = null
      } finally {
        this.isLoading = false
      }
    },
    async deleteStudent(id) {
      this.isLoading = true
      try {
        const response = await axios.delete(`${url}${id}`)
        const studentId = response.data
        this.data = this.data.filter((t) => t.id !== studentId)
      } catch (error) {
        this.error = error
        this.data = null
      } finally {
        this.isLoading = false
      }
    }
  },
  getters: {
    studentsCount: (state) => state.data.length
  }
})
