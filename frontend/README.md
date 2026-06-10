# 🏋️‍♂️ Rumeli Fitness - Full-Stack Spor Salonu Yönetim Sistemi

Bu proje, İstanbul Rumeli Üniversitesi Bilgisayar Mühendisliği Bölümü **BLG330 - Web Programlama** dersi dönem projesi kapsamında **Eren Özgül (231201041)** tarafından geliştirilmiştir.

## 🚀 Proje Hakkında
Rumeli Fitness, kullanıcıların günlük kalori hedeflerini, antrenman programlarını, vücut ölçümlerini ve su tüketimlerini tek bir panel üzerinden yönetebildikleri **MERN Stack (MongoDB, Express.js, React.js, Node.js)** tabanlı bir web uygulamasıdır.

## 🛠 Kullanılan Teknolojiler
* **Frontend:** React.js, React Router, Vite, React-Toastify
* **Backend:** Node.js, Express.js
* **Veritabanı:** MongoDB (Mongoose ORM)
* **Güvenlik:** JSON Web Token (JWT), Bcrypt (Şifre Hashing)

## 🌟 Öne Çıkan Özellikler
* **Korumalı Rotalar (Protected Routes):** Sadece JWT token'a sahip giriş yapmış kullanıcılar panele erişebilir.
* **RESTful API:** GET, POST, PUT ve DELETE işlemlerinin tamamı asenkron olarak çalışır.
* **İlişkisel Veritabanı:** Kullanıcı ile antrenman/diyet verileri MongoDB üzerinde `populate` ile ilişkilendirilmiştir.
* **Dinamik UX/UI:** Anlık yükleniyor animasyonları (Spinner), Toast bildirimleri ve CSS interaktif Su Takip Modülü.

## ⚙️ Kurulum Adımları
Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

1. Projeyi klonlayın:
   ```bash
   git clone [https://github.com/KULLANICI_ADIN/proje-repo-ismi.git](https://github.com/KULLANICI_ADIN/proje-repo-ismi.git)