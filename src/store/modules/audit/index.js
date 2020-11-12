import listModule from '~/store/modules/list/index';

export default {
    namespaced: true,
    modules: { 
        requirements: listModule, 
        team: listModule 
    }
}