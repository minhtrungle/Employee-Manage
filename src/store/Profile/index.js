import mutation from "./mutation";
import action from "./action";
import * as getter from './getter'
import state from "./state";

const Store = {
    namespaced : true,
    getter,
    state: state,
    mutations :mutation,
    actions :action
}
export default Store