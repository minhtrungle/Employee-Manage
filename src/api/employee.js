import request from '..//untils/request'

export default {
    listEmployee() {
        return request({method: 'GET', url: '/employee'})
    },  

    listDepartment() {
        return request({method: 'GET', url: '/department'})
    },

    listTitle() {
        return request({method: 'GET', url: '/title'})
    },

    showEmployee(id) {
        return request({method: 'GET', url: `/employee/${id}`, data: id})
    },

    deleteEmployee(id) {
        return request({method: 'DELETE', url: `/employee/${id}`})
    },

    editEmployee(id){
        return request({method: 'POST', url: `/employee/${id}`})
    },

    addEmployee(id){
        return request({method: 'POST', url: '/employee', data: id})
    },

    apiProfile(apiprofile){
        return request({method: 'GET', url: '/profile', data: apiprofile})
    }
}