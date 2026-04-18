importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCMgBgl8nQNCxqP2z6PuN7HyIXnbxZj6Ec",
  authDomain: "jarvis-reminder-d6119.firebaseapp.com",
  projectId: "jarvis-reminder-d6119",
  storageBucket: "jarvis-reminder-d6119.firebasestorage.app",
  messagingSenderId: "431993169280",
  appId: "1:431993169280:web:ae2810ee94d293d3af4d65"
});

const messaging = firebase.messaging();

// 🔔 BACKGROUND NOTIFICATIONS
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received:", payload);

  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/icons/icon-192.png",
      data: payload.data
    }
  );
});

// 🔥 CLICK → OPEN APP + SPEAK
self.addEventListener("notificationclick", function(event) {
  event.notification.close();

  const speak = event.notification.data?.speak || "";

  event.waitUntil(
    clients.openWindow("/?speak=" + encodeURIComponent(speak))
  );
});
