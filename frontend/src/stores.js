import { observable, decorate, action } from 'mobx';

export const authenticationStore = observable({
    userLevel: 0,
    token: "",
    setUserLevel: action((newVal) => authenticationStore.userLevel = newVal),
    setToken: action((newVal) => authenticationStore.setToken = newVal),

});

export const dataStore = observable({
    vin: "A0L000051T4567893", // TODO remove default value
    currentMileageOfCar: 0,
    preownerCount: 0,
    setVin: action((newVal) => dataStore.vin = newVal),
    setCurrentMileageOfCar: action((newVal) => dataStore.currentMileageOfCar = newVal),
    setPreowner: action((newVal) => dataStore.preownerCount = newVal)
})

class PopupStore {
    constructor() {
        this.isPopupVisible = false
        this.popupTitle = ""
        this.popupDescription = ""
    }

        closePopup() {
            this.isPopupVisible = false;
        } 

        showPopup(title, description) {
            this.isPopupVisible = true;
            this.popupTitle = title;
            this.popupDescription = description;
        }
}
decorate(PopupStore, {
    isPopupVisible: observable,
    showPopup:action,
    closePopup: action,
})

export const popupStore = new PopupStore();