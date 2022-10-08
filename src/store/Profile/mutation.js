const save_Profile = (state,profile)=>{
    state.profile = profile;
    if (localStorage.getItem('role')) {
        state.role = localStorage.getItem('role');
    }
}
const clear_Profile= (state) => {
    state.profile = {};
}
const update_Role = (state) => {
    if (state.role == 3) {
        state.role = 3;
    } else {
        state.role++;
        localStorage.setItem('role', state.role);
    }

}
export default {
    save_Profile,
    clear_Profile,
    update_Role
}