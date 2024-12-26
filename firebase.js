// firebase.js
import database from '@react-native-firebase/database';

// Veritabanı referansı oluşturma
const db = database().ref('/');

class FirebaseService {
  constructor() {
    this.db = database().ref('/');
    this.activeListeners = new Map(); // Aktif dinleyicileri takip etmek için
  }

  // Veri yolu doğrulama
  validatePath(path) {
    if (!path || typeof path !== 'string') {
      throw new Error('Geçersiz veritabanı yolu');
    }
    return path.startsWith('/') ? path.slice(1) : path;
  }

  // Veri ekleme işlemi
  async addData(path, data) {
    try {
      const validPath = this.validatePath(path);
      if (!data) throw new Error('Veri boş olamaz');

      const reference = this.db.child(validPath);
      await reference.push(data);
      return { success: true, data: data };
    } catch (error) {
      console.error('Veri ekleme hatası:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Veri okuma işlemi
  async getData(path, options = {}) {
    try {
      const validPath = this.validatePath(path);
      const reference = this.db.child(validPath);
      
      // Sorgu seçenekleri uygulama
      if (options.orderBy) {
        reference.orderByChild(options.orderBy);
      }
      if (options.limit) {
        reference.limitToLast(options.limit);
      }

      const snapshot = await reference.once('value');
      const data = snapshot.val();
      
      return { success: true, data: data };
    } catch (error) {
      console.error('Veri okuma hatası:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Veri güncelleme işlemi
  async updateData(path, data) {
    try {
      const validPath = this.validatePath(path);
      if (!data) throw new Error('Güncellenecek veri boş olamaz');

      const reference = this.db.child(validPath);
      await reference.update(data);
      return { success: true, data: data };
    } catch (error) {
      console.error('Veri güncelleme hatası:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Veri silme işlemi
  async deleteData(path) {
    try {
      const validPath = this.validatePath(path);
      const reference = this.db.child(validPath);
      await reference.remove();
      return { success: true };
    } catch (error) {
      console.error('Veri silme hatası:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Realtime güncelleme dinleyicisi
  subscribeToData(path, callback, errorCallback) {
    try {
      const validPath = this.validatePath(path);
      const reference = this.db.child(validPath);

      const onValueChange = reference.on('value', 
        (snapshot) => {
          callback(snapshot.val());
        },
        (error) => {
          if (errorCallback) errorCallback(error);
          console.error('Dinleme hatası:', error.message);
        }
      );

      // Dinleyiciyi kaydet
      this.activeListeners.set(validPath, onValueChange);

      // Dinleyiciyi durdurmak için fonksiyon döndür
      return () => this.unsubscribeFromData(validPath);
    } catch (error) {
      console.error('Dinleyici oluşturma hatası:', error.message);
      if (errorCallback) errorCallback(error);
    }
  }

  // Dinleyiciyi durdurma
  unsubscribeFromData(path) {
    try {
      const validPath = this.validatePath(path);
      if (this.activeListeners.has(validPath)) {
        const reference = this.db.child(validPath);
        reference.off('value');
        this.activeListeners.delete(validPath);
      }
    } catch (error) {
      console.error('Dinleyici durdurma hatası:', error.message);
    }
  }

  // Tüm dinleyicileri durdur
  unsubscribeAll() {
    try {
      this.activeListeners.forEach((_, path) => {
        this.unsubscribeFromData(path);
      });
    } catch (error) {
      console.error('Tüm dinleyicileri durdurma hatası:', error.message);
    }
  }
}

// Singleton örneği oluştur
const firebaseService = new FirebaseService();
export default firebaseService;

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