import auth from '@react-native-firebase/auth';
import {Storages} from '../commons/Storages';
import Languages from '../constants/Languages';

export default class Authenticate {
  static signInWithEmail(email, password) {
    return new Promise(resolve => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          resolve({success: true, data: email});
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
          resolve({success: false, data: error});
        });
    });
  }

  static signUpWithEmail(email, password) {
    return new Promise(resolve => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          resolve({success: true, data: email});
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
          resolve({success: false, data: error});
        });
    });
  }

  static deleteAccount() {
    let userInfo = JSON.parse(Storages.getString('userInfo') ?? '{}');
    return new Promise(resolve => {
      if (auth().currentUser) {
        const credential = auth.EmailAuthProvider.credential(
          userInfo.email,
          userInfo.password,
        );
        auth()
          .currentUser.reauthenticateWithCredential(credential)
          .then(() => {
            auth()
              .currentUser.delete()
              .then(() => {
                resolve(true);
              })
              .catch(error => {
                console.log('ERROR DELETE ACCOUNT: ', error);
                resolve(false);
              });
          })
          .catch(error => {
            console.log('ERROR DELETE ACCOUNT: ', error);
            resolve(null);
          });
      } else {
        console.log('CAN NOT DELETE ACCOUNT');
        resolve(null);
      }
    });
  }

  static signOut() {
    return new Promise(resolve => {
      auth()
        .signOut()
        .then(() => {
          console.log('User signed out!');
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }

  static changePassword(email, currentPass, newPass) {
    return new Promise(resolve => {
      if (auth().currentUser) {
        const credential = auth.EmailAuthProvider.credential(
          email,
          currentPass,
        );
        auth()
          .currentUser.reauthenticateWithCredential(credential)
          .then(() => {
            auth()
              .currentUser.updatePassword(newPass)
              .then(() => {
                resolve({
                  message: Languages.changePWSuccess,
                  success: true,
                });
              })
              .catch(() => {
                resolve({
                  message: Languages.changePWFailed,
                  success: false,
                });
              });
          })
          .catch(error => {
            resolve({
              message: Languages.currentPWNotCorrect,
              success: false,
            });
          });
      } else {
        resolve({
          message: Languages.currentPWNotCorrect,
          success: false,
        });
      }
    });
  }

  static forgotPassword(email) {
    return new Promise(resolve => {
      auth()
        .sendPasswordResetEmail(email, {
          handleCodeInApp: true,
          android: {
            installApp: true,
            packageName: 'com.slogcom',
          },
          iOS: {
            bundleId: 'com.slogcom',
          },
          url: 'https://smart-route-3c728.web.app/?email=' + email,
          dynamicLinkDomain: 'slogcom.page.link',
        })
        .then(response => {
          console.log('Response: ', response);
          resolve({data: response, success: true});
        })
        .catch(error => {
          console.log('Error forgotPassword: ', error);
          resolve({data: error, success: false});
        });
    });
  }
}
