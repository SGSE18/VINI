import { observable } from 'mobx';
import { action } from 'mobx';

export let authenticationStore = observable({
    userLevel: 1,
    setUserLevel: action((newVal) => authenticationStore.userLevel = newVal)
});

export let dataStore = observable({
    vin: "",
    setVin: action((newVal) => dataStore.vin = newVal)
})
