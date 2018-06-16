import { observable } from 'mobx';
import { action } from 'mobx';

export let authenticationStore = observable({
    userLevel: 4,
    token: "a74b0debd96954f807451074ac3eefe7918f1b7b",
    setUserLevel: action((newVal) => authenticationStore.userLevel = newVal)
});

export let dataStore = observable({
    vin: "W0L000051T2123456", // TODO remove default value
    setVin: action((newVal) => dataStore.vin = newVal)
})
