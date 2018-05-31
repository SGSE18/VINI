import { observable } from 'mobx';
import { action } from 'mobx';

export var authenticationStore = observable({
    userLevel: 1,
    setUserLevel: action((newVal) => authenticationStore.userLevel = newVal)
});

