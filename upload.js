const admin = require('firebase-admin');
const serviceAccount = require('./mobiluygulamaproje-c156f-firebase-adminsdk-e500t-154b22b6ff.json'); // Firebase anahtar dosyası

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const data = require('./data/tjms.json'); // Yukarıdaki JSON dosyanız

async function uploadData() {
  const immunoglobulinsCollection = db.collection('Kılavuz-tjms');

  for (const [key, value] of Object.entries(data[0])) { // Her immünoglobulin tipi için döngü
    const docRef = immunoglobulinsCollection.doc(key);

    for (const range of value) { // Yaş aralıklarını alt koleksiyon olarak ekleme
      const minAge = range.min_age_months ?? null; // undefined varsa null olarak ayarla
      const maxAge = range.max_age_months ?? null; // undefined varsa null olarak ayarla

      // Diğer alanlar için de aynı kontrolü yapabilirsiniz
      const minVal = range.min_val ?? null; // undefined ise null
      const maxVal = range.max_val ?? null; // undefined ise null

      await docRef.collection('ranges').add({
        min_age_months: minAge,
        max_age_months: maxAge,
        min_val: minVal,
        max_val: maxVal,
      });
    }
    console.log(`${key} başarıyla yüklendi.`);
  }
}

uploadData()
  .then(() => {
    console.log('Tüm veriler yüklendi.');
  })
  .catch((error) => {
    console.error('Hata oluştu:', error);
  });
