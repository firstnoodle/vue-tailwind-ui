import Vue from 'vue';

export const getNestedProp = (obj, props) => {
    const prop = props.shift();
    if (!obj[prop] || !props.length) {
        return obj[prop];
    }
    return getNestedProp(obj[prop], props);
};

export const setNestedProp = (obj, path, value) => {
    const setNested = (obj, props) => {
        const prop = props.shift();
        if (!obj[prop]) {
            Vue.set(obj, prop, {});
        }
        if (!props.length) {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                obj[prop] = { ...obj[prop], ...value };
            } else {
                obj[prop] = value;
            }
            return;
        }
        setNested(obj[prop], props, value);
    };
    let segments = path.split('.');
    return setNested(obj, segments);
};

export const deleteNestedProp = (obj, props) => {
    const prop = props.shift();
    if (!obj[prop]) {
        return;
    }
    if (!props.length) {
        Vue.delete(obj, prop);
        return;
    }
    deleteNestedProp(obj[prop], props);
};