// firebase.js
import database from '@react-native-firebase/database';

// Veritabanı referansı oluşturma
const db = database().ref('/');

// Veri ekleme işlemi
export const addData = async (path, data) => {
  try {
    await db.child(path).push(data);
    return true;
  } catch (error) {
    console.error('Veri eklenirken hata oluştu:', error);
    return false;
  }
};

// Veri okuma işlemi
export const getData = async (path) => {
  try {
    const snapshot = await db.child(path).once('value');
    return snapshot.val();
  } catch (error) {
    console.error('Veri okunurken hata oluştu:', error);
    return null;
  }
};

// Veri güncelleme işlemi
export const updateData = async (path, data) => {
  try {
    await db.child(path).update(data);
    return true;
  } catch (error) {
    console.error('Veri güncellenirken hata oluştu:', error);
    return false;
  }
};

// Veri silme işlemi
export const deleteData = async (path) => {
  try {
    await db.child(path).remove();
    return true;
  } catch (error) {
    console.error('Veri silinirken hata oluştu:', error);
    return false;
  }
};

// Realtime güncelleme dinleyicisi
export const subscribeToData = (path, callback) => {
  const onValueChange = db.child(path).on('value', (snapshot) => {
    callback(snapshot.val());
  });
  
  // Dinleyiciyi durdurmak için kullanılacak fonksiyonu döndür
  return () => db.child(path).off('value', onValueChange);
};