import {Platform} from 'react-native';
import storage from '@react-native-firebase/storage';

export default class Upload {
  static getFileName(name, path) {
    if (name != null) {
      return name;
    }
    if (Platform.OS === 'ios') {
      path = '~' + path.substring(path.indexOf('/Documents'));
    }
    return path.split('/').pop();
  }

  static getPlatformPath({path, uri}) {
    return Platform.select({
      android: {value: path ?? uri},
      ios: {value: uri},
    });
  }

  static async uploadImageToStorage(images) {
    let array = [];
    images.forEach(image => {
      let path = this.getPlatformPath(image).value;
      let name = this.getFileName(image.fileName, path);
      let reference = storage().ref(`/images/${name}`);
      let task = reference.putFile(path);
      let promise = new Promise(resolve => {
        task
          .then(() => {
            console.log('Image uploaded to the bucket!: ');
            reference
              .getDownloadURL()
              .then(url => {
                resolve(url);
              })
              .catch(() => {
                resolve('');
              });
          })
          .catch(e => {
            console.log('uploading image error => ', e);
            resolve('');
          });
      });
      array.push(promise);
    });
    return new Promise(resolve => {
      Promise.all(array)
        .then(value => {
          resolve(value);
        })
        .catch(error => {
          console.log('ERROR uploadImageToStorage: ', error);
          resolve([]);
        });
    });
  }

  static async deleteImage(url) {
    let imageRef = storage().refFromURL(url);
    return await imageRef.delete();
  }
}
