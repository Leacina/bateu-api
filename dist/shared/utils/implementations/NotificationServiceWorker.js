"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webPush = _interopRequireDefault(require("web-push"));

var _keyNotification = _interopRequireDefault(require("../../../config/keyNotification.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NotificationServiceWorker {
  // sub = {
  //   endpoint:
  //     'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABhbrlDdGZvzACMe_lVKHlTRMmZygmIDBEZgyaSst3MyPhSoNtBB95CKDd2nExJcUhMOjUlvFhOueqIbG9ZT5TFAPR4nlEl2KMSCFlFjsHnJ1PoOWNTUcOPmCuELZptGU8JUNpo28DPh1xcvN9Ci-d_JyasPOWpvwUD2gGPFK4j5fVPNUA',
  //   keys: {
  //     auth: 'y4gMDCdcyTMuHE73ouYeLg',
  //     p256dh:
  //       'BKfgNSPiPYFWCCZNPedOrA7RdOB8cIzfLTq-5hiSSjL3bNc9RWFJHSqaPVmaIeH1wew6BySjczJv5K_Z7JGSBd4',
  //   },
  // };
  sendNotification(sub, title, url) {
    _webPush.default.setVapidDetails('mailto:example@yourdomain.org', _keyNotification.default.publicKey, _keyNotification.default.privateKey);

    const payLoad = {
      notification: {
        title: 'BATEU',
        body: title,
        icon: 'https://i.ibb.co/p4wc3Yy/play-store-512.png',
        vibrate: [100, 50, 100],
        data: {
          url: url || 'https://bateuweb.com.br/'
        },
        actions: [{
          action: 'explore',
          title: 'Ver'
        }]
      }
    };

    _webPush.default.sendNotification(JSON.parse(sub), JSON.stringify(payLoad));
  }

}

exports.default = NotificationServiceWorker;