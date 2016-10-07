export class LocalStorageManager {
    constructor() {
        this.testForLocalStorage();
        if (!this.isLocalStorageAvailable)
            this.tempItems = [];
    }
    get length() {
        if (this.isLocalStorageAvailable)
            return localStorage.length;
        return 0;
    }
    setItem(key, data) {
        this.validateKey(key);
        this.validateData(data);
        if (this.isLocalStorageAvailable)
            localStorage.setItem(key, data);
        else
            this.setTempItem(key, data);
    }
    getItem(key) {
        this.validateKey(key);
        if (this.isLocalStorageAvailable)
            return localStorage.getItem(key);
        else
            return this.getTempItem(key);
    }
    removeItem(key) {
        this.validateKey(key);
        if (this.isLocalStorageAvailable)
            localStorage.removeItem(key);
        else
            this.removeTempItem(key);
    }
    clear() {
        if (this.isLocalStorageAvailable)
            localStorage.clear();
        else
            this.clearTemp();
    }
    testForLocalStorage() {
        if (typeof Storage !== 'undefined') {
            try {
                localStorage.setItem('test', null);
                localStorage.removeItem('test');
                this.isLocalStorageAvailable = true;
            }
            catch (e) {
                this.isLocalStorageAvailable = false;
            }
        }
        else
            this.isLocalStorageAvailable = false;
    }
    validateKey(key) {
        if (typeof key !== 'string' || key.length === 0)
            throw new Error('Invalid key.');
    }
    validateData(data) {
        if (typeof data !== 'string')
            throw new Error('Invalid data.');
    }
    setTempItem(key, data) {
        if (this.tempItems.find(value => value.key === key) === undefined)
            this.tempItems.push({ key: key, data: data });
    }
    getTempItem(key) {
        const item = this.tempItems.find(value => value.key === key);
        return (undefined === item) ? null : item.data;
    }
    removeTempItem(key) {
        let foundIndex = -1;
        this.tempItems.find((value, index) => {
            if (value.key === key) {
                foundIndex = index;
                return true;
            }
            return false;
        });
        if (foundIndex >= 0)
            this.tempItems.splice(foundIndex, 1);
    }
    clearTemp() {
        this.tempItems = [];
    }
}
//# sourceMappingURL=local-storage-manager.js.map