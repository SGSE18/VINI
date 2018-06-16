import { observable } from 'mobx';
import { action } from 'mobx';

export let authenticationStore = observable({
    userLevel: 4,
    token: "",
    setUserLevel: action((newVal) => authenticationStore.userLevel = newVal),
    setToken: action((newVal) => authenticationStore.setToken = newVal)
});

export let dataStore = observable({
    vin: "W0L000051T2123456", // TODO remove default value
    setVin: action((newVal) => dataStore.vin = newVal)
})
