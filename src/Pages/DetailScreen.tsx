import {
  Button,
  Dimensions,
  Image,
  NativeModules,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {LegacyRef, useRef} from 'react';
import {Icon} from 'react-native-vector-icons/Icon';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faBackward,
  faBars,
  faDownload,
  faHeart,
  faPlay,
  faShare,
  faShareAlt,
} from '@fortawesome/free-solid-svg-icons';
import RNFetchBlob from 'rn-fetch-blob';

import Share from 'react-native-share';


import {Platform} from 'react-native';
import ViewShot, {captureRef} from 'react-native-view-shot';
import setAsWallpaper from '../functions/setAsWallpaper';
const {width, height} = Dimensions.get('window');
// import WallPaperManager from 'react-native-set-wallpaper';

const DetailScreen = ({route, navigation}: any) => {
  const {imageUrl} = route.params;
  let extention = imageUrl.lastIndexOf('.');
  let imageName = '/wallify_image_' + Date.now() + imageUrl.substr(extention);

  let dirs = RNFetchBlob.fs.dirs;
  let path =
    Platform.OS === 'ios'
      ? dirs['MainBundleDir'] + imageName
      : dirs.PictureDir + imageName;

  const setAsWallaper = async () => {
    setAsWallpaper(imageUrl)
  };
  const saveToGallery = () => {
    if (Platform.OS == 'android') {
      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'png',
        indicator: true,
        IOSBackgroundTask: true,
        path: path,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: path,
          description: 'Image',
        },
      })
        .fetch('GET', imageUrl)
        .then(res => {
          ToastAndroid.show('Image Downloaded Successfully', 300);
        });
    } else {
      // CameraRoll.saveToCameraRoll(imgUrl);
    }
  };

  const ref = useRef();
  const onShare = async () => {
    try {
      const uri = await captureRef(ref, {
        format: 'png',
        quality: 0.7,
      });
      console.log('uri', uri);
      await Share.open({url: uri});
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'flex-end',
        display: 'flex',
        flexDirection: 'column',
        height: height,
      }}>
      <ViewShot ref={ref as any}>
        <Image
          style={{height: height, width: width}}
          source={{uri: imageUrl}}
        />
      </ViewShot>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'row',
          marginVertical: 20,
          position: 'absolute',
          bottom: 1,
          gap: 30,
        }}>
        <View style={styles.fab_view}>
          <Pressable
            style={styles.fab_icon}
            onPress={async () => {
              await onShare();
            }}>
            <FontAwesomeIcon icon={faShareAlt} size={22} color="white" />
          </Pressable>
          <Text style={{fontWeight: '500'}}>Share</Text>
        </View>
        <View style={styles.fab_view}>
          <Pressable style={styles.fab_icon} onPress={setAsWallaper}>
            <FontAwesomeIcon icon={faPlay} size={22} color="#ffffff" />
          </Pressable>
          <Text style={{fontWeight: '500'}}>Apply</Text>
        </View>

        <View style={styles.fab_view}>
          <Pressable style={styles.fab_icon} onPress={saveToGallery}>
            <FontAwesomeIcon icon={faDownload} size={22} color="white" />
          </Pressable>
          <Text style={{fontWeight: '500'}}>Download</Text>
        </View>
      </View>

      <Pressable
        style={{position: 'absolute', top: 35, left: 20}}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <View
          style={{
            padding: 6,
            backgroundColor: 'gray',
            borderRadius: 30,
          }}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={20}
            style={{color: 'white'}}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  fab_icon: {
    backgroundColor: '#AA04B2',
    padding: 18,
    borderRadius: 30,
  },
  fab_view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
