const saveProfile = ({commit},profile) => {
    commit("save_profile",profile);
}
const clearProfile = ({commit}) => {
    commit("clear_profile");
}
const updateRole = ({commit}) => {
    commit("update_Role")
}
export default {
    saveProfile,
    clearProfile,
    updateRole
}