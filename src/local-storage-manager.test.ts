import { LocalStorageManager } from './local-storage-manager';

QUnit.module('Local Storage Manager');

test('should not allow invalid data in setItem', assert => {
  const lsm = new LocalStorageManager();

  throws(() => {
    lsm.setItem(undefined, undefined);
  }, new Error('Invalid key.'), 'undefined as key');

  throws(() => {
    lsm.setItem(null, undefined);
  }, new Error('Invalid key.'), 'null as key');

  throws(() => {
    lsm.setItem('', undefined);
  }, new Error('Invalid key.'), 'empty string as key');

  throws(() => {
    lsm.setItem('a', undefined);
  }, new Error('Invalid data.'), 'undefined as data');

  throws(() => {
    lsm.setItem('a', null);
  }, new Error('Invalid data.'), 'null as data');
});

test('should allow setItem with valid data', assert => {
  const lsm = new LocalStorageManager();

  lsm.setItem('a', '');

  equal(localStorage.getItem('a'), '');
});

test('should not allow invalid key in getItem', assert => {
  const lsm = new LocalStorageManager();

  throws(() => {
    lsm.getItem(undefined);
  }, new Error('Invalid key.'), 'undefined as key');

  throws(() => {
    lsm.getItem(null);
  }, new Error('Invalid key.'), 'null as key');

  throws(() => {
    lsm.getItem('');
  }, new Error('Invalid key.'), 'empty string as key');
});

test('should allow getItem with valid key', assert => {
  const lsm = new LocalStorageManager();

  lsm.setItem('a', '');
  equal(lsm.getItem('a'), '');
});

test('should allow clear', assert => {
  const lsm = new LocalStorageManager();

  lsm.setItem('a', '');
  equal(lsm.getItem('a'), '');
  lsm.clear();
  equal(lsm.getItem('a'), null);
});

test('should have length property', assert => {
  const lsm = new LocalStorageManager();

  equal(lsm.length, 0, 'zero initially');
  lsm.setItem('a', '');
  equal(lsm.length, 1, 'one after adding item.');
});

test('should not allow invalid key in removeItem', assert => {
  const lsm = new LocalStorageManager();

  throws(() => {
    lsm.removeItem(undefined);
  }, new Error('Invalid key.'), 'undefined as key');

  throws(() => {
    lsm.removeItem(null);
  }, new Error('Invalid key.'), 'null as key');

  throws(() => {
    lsm.removeItem('');
  }, new Error('Invalid key.'), 'empty string as key');
});

test('should allow removeItem with valid key', assert => {
  const lsm = new LocalStorageManager();

  lsm.setItem('a', '');
  equal(lsm.getItem('a'), '');
  lsm.removeItem('a');
  equal(lsm.getItem('a'), null);
});

test('should use tempStorage when localStorage not available', assert => {
  const saveSetFunc = window.localStorage.setItem;
  window.localStorage.setItem = () => {
    throw new Error();
  };

  const lsm = new LocalStorageManager();

  lsm.setItem('a', 'a');
  equal(lsm.getItem('a'), 'a');
  lsm.removeItem('a');
  equal(lsm.getItem('a'), null);

  window.localStorage.setItem = saveSetFunc;
});
