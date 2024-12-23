const express = require('express');
const knex = require('knex')(require('./knexfile')); // knex yapılandırmasını yükle
const bcrypt = require('bcrypt'); // bcrypt ile şifreyi güvenli hale getireceğiz

const app = express();
const saltRounds = 10;

app.use(express.json()); // JSON verisini alabilmek için

// Kullanıcı kaydı API'si
app.post('/register', async (req, res) => {
  const { fullName, tcNo, email, gender, birthDate, phone, password } = req.body;

  try {
    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Kullanıcıyı veritabanına kaydet
    await knex('users').insert({
      full_name: fullName,
      tc_no: tcNo,
      email: email,
      gender: gender,
      birth_date: birthDate,
      phone: phone,
      password: hashedPassword, // Hash'lenmiş şifreyi kaydet
    });

    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi!' });
  } catch (error) {
    console.error('Kullanıcı kaydı sırasında bir hata oluştu:', error);
    res.status(500).json({ error: 'Kullanıcı kaydı sırasında bir hata oluştu' });
  }
});

// API'yi dinlemeye başla
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
