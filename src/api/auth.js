import request from '..//untils/request'
export default { 
    loginPage(apilogin) {
        return request({method: 'POST', url: '/login', data: apilogin})
    },
    registerPage(apiregister) {
        return request({method: 'POST', url: '/register', data: apiregister})
    },
    logoutPage() {
        return request({method: 'POST', url: '/logout'})
    }
}