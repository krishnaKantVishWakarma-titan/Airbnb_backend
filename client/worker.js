console.log("service worker loaded");

self.addEventListener('push', e => {
	const data = e.data.json();
	console.log("Push Received");
	self.registration.showNotification(data.title, {
		body: data.body,
		icon: "http://image.ibb.co/frYOFd/tmlogo.png"
	})

})