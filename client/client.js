const publicVapidKey = 'BHhAMebCht6TAvEOoGU6oD9zd9ds8pCopmGXe7dHYyiRYXftJBET7EGLJiW-EgMX8FAvK6EUHu4II4i6vqNvI6A';

if('serviceWorker' in navigator){

	send().catch(err => console.error(err));

}

async function send(){

	console.log('registering service worker');
	const register = await navigator.serviceWorker.register('/worker.js', {
		scope: '/'
	});

	console.log("Registed serviceWorker");

	console.log("Registering push");

	const subscription = await register.pushManager.subscribe({
		userVisibleOnly: true,
  		applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
	});

	console.log("Registered push");

	console.log("Sending Push");

	await fetch('/subscribe', {
		method: 'POST',
		body: JSON.stringify({userId: 3, subscription: subscription}),
		headers : {
			'content-type':'application/json'
		}
	});

	console.log("Push Sent");
}


function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
 
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}