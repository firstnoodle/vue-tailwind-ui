import listModule from '~/store/modules/list/index';

export default {
    namespaced: true,
    modules: { 
        focusAreas: listModule, 
        requirements: listModule, 
        team: listModule 
    }
}