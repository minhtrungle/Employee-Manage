import request from '..//untils/request'

export default {
    listEmployee(data) {
        return request({method: 'GET', url: '/employee', params:data})
    },  

    listDepartment() {
        return request({method: 'GET', url: '/department'})
    },

    listTitle() {
        return request({method: 'GET', url: '/title'})
    },

    showEmployee(id) {
        return request({method: 'GET', url: `/employee/${id}`})
    },

    deleteEmployee(id) {
        return request({method: 'DELETE', url: `/employee/${id}`})
    },

    editEmployee(id, data) {
        return request({method: 'POST', url: `/employee/${id}`, data: data })
    },

    addEmployee(data) {
        return request({method: 'POST', url: '/employee', data: data})
    },

    apiProfile() {
        return request({method: 'GET', url: '/profile'})
    },

    apiListImages(data) {
        return request({method: 'POST', url: '/image', data: data} )
    }
}