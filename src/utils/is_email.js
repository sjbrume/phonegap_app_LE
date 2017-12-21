export const isEmail = message => value => {
    const reg = new RegExp(/^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i);
    return reg.test(value) ? undefined : message;
};