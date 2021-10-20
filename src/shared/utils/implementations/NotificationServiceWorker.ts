import webpush from 'web-push';
import keyNotification from '@config/keyNotification.json';

export default class NotificationServiceWorker {
  // sub = {
  //   endpoint:
  //     'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABhbrlDdGZvzACMe_lVKHlTRMmZygmIDBEZgyaSst3MyPhSoNtBB95CKDd2nExJcUhMOjUlvFhOueqIbG9ZT5TFAPR4nlEl2KMSCFlFjsHnJ1PoOWNTUcOPmCuELZptGU8JUNpo28DPh1xcvN9Ci-d_JyasPOWpvwUD2gGPFK4j5fVPNUA',
  //   keys: {
  //     auth: 'y4gMDCdcyTMuHE73ouYeLg',
  //     p256dh:
  //       'BKfgNSPiPYFWCCZNPedOrA7RdOB8cIzfLTq-5hiSSjL3bNc9RWFJHSqaPVmaIeH1wew6BySjczJv5K_Z7JGSBd4',
  //   },
  // };

  public sendNotification(sub: any, title: string, url: string): void {
    webpush.setVapidDetails(
      'mailto:example@yourdomain.org',
      keyNotification.publicKey,
      keyNotification.privateKey,
    );

    const payLoad = {
      notification: {
        title: 'BATEU',
        body: title,
        vibrate: [100, 50, 100],
        data: {
          url,
        },
        actions: [
          {
            action: 'explore',
            title: 'Ver',
          },
        ],
      },
    };

    webpush.sendNotification(sub, JSON.stringify(payLoad));
  }
}
