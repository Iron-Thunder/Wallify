import WallPaperManager from 'react-native-wallpaper-manager';

export default function setAsWallpaper(imageUrl) {
  WallPaperManager.setWallpaper({uri: imageUrl}, res => console.log(res));
}
