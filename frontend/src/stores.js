import { observable, decorate, action } from 'mobx';

export const authenticationStore = observable({
    userLevel: 0,
    token: "",
    setUserLevel: action((newVal) => authenticationStore.userLevel = newVal),
    setToken: action((newVal) => authenticationStore.setToken = newVal),

});

class DataStore {
    vin = "A0L000051T4567893"; // TODO remove default value
    currentMileageOfCar = 0;
    preownerCount = 0;
    carTransactionData = [];
    setVin(newVal) {
        this.vin = newVal;
    }
    setCurrentMileageOfCar(newVal) {
        this.currentMileageOfCar = newVal;
    }
    setPreowner(newVal) {
        this.preownerCount = newVal;
    }
    setCarTransactionData(newVal) {
        this.carTransactionData = newVal;
    }
}
decorate(DataStore, {
    carTransactionData: observable,
    vin: observable,
    currentMileageOfCar: observable,
    preownerCount: observable,
    setVin: action,
    setCurrentMileageOfCar: action,
    setCarTransactionData: action,
    setPreowner: action,
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

export const dataStore = new DataStore();
export const popupStore = new PopupStore();