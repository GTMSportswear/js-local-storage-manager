export class LocalStorageManager {
  private isLocalStorageAvailable: boolean;
  private tempItems: { key: string, data: any }[];

  public get length(): number {
    if (this.isLocalStorageAvailable)
      return localStorage.length;
    return 0;
  }

  constructor() {
    this.testForLocalStorage();

    if (!this.isLocalStorageAvailable)
      this.tempItems = [];
  }

  public setItem(key: string, data: string): void {
    this.validateKey(key);
    this.validateData(data);

    if (this.isLocalStorageAvailable)
      localStorage.setItem(key, data);
    else
      this.setTempItem(key, data);
  }

  public getItem(key: string): any {
    this.validateKey(key);

    if (this.isLocalStorageAvailable)
      return localStorage.getItem(key);
    else
      return this.getTempItem(key);
  }

  public removeItem(key: string): void {
    this.validateKey(key);

    if (this.isLocalStorageAvailable)
      localStorage.removeItem(key);
    else
      this.removeTempItem(key);
  }

  public clear(): void {
    if (this.isLocalStorageAvailable)
      localStorage.clear();
    else
      this.clearTemp();
  }

  private testForLocalStorage(): void {
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

  private validateKey(key: string): void {
    if (typeof key !== 'string' || key.length === 0)
      throw new Error('Invalid key.');
  }

  private validateData(data: string): void {
    if (typeof data !== 'string')
      throw new Error('Invalid data.');
  }

  private setTempItem(key: string, data: string): void {
    if (this.tempItems.find(value => value.key === key) === undefined)
      this.tempItems.push({ key: key, data: data });
  }

  private getTempItem(key: string): any {
    const item = this.tempItems.find(value => value.key === key);

    return (undefined === item) ? null : item.data;
  }

  private removeTempItem(key: string): void {
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

  private clearTemp(): void {
    this.tempItems = [];
  }
}
