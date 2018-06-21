import { observable } from 'mobx';
import { action } from 'mobx';

export let authenticationStore = observable({
    userLevel: 0,
    token: "",
    setUserLevel: action((newVal) => authenticationStore.userLevel = newVal),
    setToken: action((newVal) => authenticationStore.setToken = newVal),

});

export let dataStore = observable({
    vin: "A0L000051T4567893", // TODO remove default value
    currentMileageOfCar: NaN,
    preownerCount: 0,
    setVin: action((newVal) => dataStore.vin = newVal),
    setCurrentMileageOfCar: action((newVal) => dataStore.currentMileageOfCar = newVal),
    setPreowner: action((newVal) => authenticationStore.preownerCount = newVal)
})
