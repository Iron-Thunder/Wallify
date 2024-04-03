import {
  Button,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import Nature from '../../assets/nature.jpg';
import {IImageDetails} from '../Intefaces/image';
import {categories} from '../../assets/categories';
const {width} = Dimensions.get('window');
const columnCount = 3;
const imageWidth = width / columnCount;

const MainScreen = () => {
  const [imageData, setImageData] = useState<IImageDetails[]>([]);
  const [tempSearchQuery, setTempSearchQuery] = useState<string>('');

  const [category, setCategory] = useState<string>('');

  const [activeTab, setActiveTab] = useState<number>(0);

  const getImages = async () => {
    setImageData([]);
    const apiKey = '42964411-a8eb295fb7f217fd70952cc3c';
    const pixaUrl = `https://pixabay.com/api/?key=${apiKey}&q=${category}&image_type=photo&orientation=vertical`;
    try {
      const response = await fetch(pixaUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      let newImageData: IImageDetails[] = [];
      data.hits.map((hit: any) => {
        newImageData.push({
          previewUrl: hit.previewURL,
          imageUrl: hit.largeImageURL,
        });
      });
      setImageData(newImageData);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    // console.log(searchQuery);
    // getImages();
  }, [category]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.headingText}>WallPaper</Text>
        <Pressable>
          <FontAwesomeIcon icon={faBars} size={30} color="white" />
        </Pressable>
      </View>
      <View
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 4,
        }}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setTempSearchQuery(text)}
          value={tempSearchQuery}
          onSubmitEditing={() => {
            setCategory(tempSearchQuery);
            setActiveTab(-1);
          }}
          placeholder="search wallappers"
          placeholderTextColor={'#ffffff80'}></TextInput>
      </View>

      <View style={styles.middleContainer}>
        <ScrollView horizontal={true}>
          {categories.map((category, index) => {
            return (
              <Pressable
                key={index}
                style={[
                  styles.scrollTypes,
                  activeTab === index && {
                    backgroundColor: 'pink',
                    shadowColor: 'pink',
                    shadowRadius: 10,
                  },
                ]}
                onPress={() => {
                  setCategory(category.category);
                  setActiveTab(index);
                  setTempSearchQuery('')
                }}>
                <Image
                  style={styles.scrollImg}
                  source={category.imgUrl}
                  resizeMode="cover"
                />
                <Text
                  style={[
                    styles.scrollText,
                    activeTab === index && {
                      color: 'black',
                    },
                  ]}>
                  {category.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      {imageData?.length ? (
        <FlatList
          data={imageData}
          style={styles.flatlist}
          renderItem={image => (
            <Image style={styles.photo} source={{uri: image.item.imageUrl}} />
          )}
          numColumns={2}
        />
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white'}}>Loading...</Text>
        </View>
      )}

      <View style={styles.saveDownload}>
          <Pressable><Text style={styles.download}>Download</Text></Pressable>
          <Pressable><Text style={styles.wallPaper}>Set as WallPaper</Text></Pressable>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
    // position: 'relative',
  },

  topContainer: {
    marginTop: 26,
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'white',
  },

  headingText: {
    fontSize: 24,
    color: 'white',
  },
  middleContainer: {
    marginTop: 20,
    margin: 10,
    // backgroundColor: 'red',
  },

  scrollTypes: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#484900',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 6,
    borderRadius: 30,
    paddingRight: 18,
    minWidth: 120,
    height: 43,
  },

  scrollImg: {
    borderRadius: 60,
    height: 30,
    width: 30,
    marginLeft: 10,
  },

  scrollText: {
    marginLeft: 8,
    color: 'white',
    fontSize: 16,
    paddingLeft: 2,
  },

  bottomContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  photo: {
    height: 250,
    borderRadius: 10,
    width: width * 0.5 - 16,
    margin: 4,
  },
  btn: {
    height: 20,
    width: 50,
    backgroundColor: 'blue',
  },
  text: {
    color: 'white',
  },
  flatlist: {
    margin: 8,
  },
  textInput: {
    backgroundColor: '#F6F3EC30',
    color: 'white',
    fontSize: 18,
    borderRadius: 10,
    width: '90%',
    marginTop: 20,
    paddingHorizontal: 20,
  },

  saveDownload : {
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    bottom: 0.1,
    

  },

  download : {
    color: 'white',
    position: 'relative',
    left: 10,
    paddingHorizontal: 20,
    backgroundColor: 'green',
    paddingVertical: 16,
    borderRadius: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  wallPaper : {
    color: 'white',
    position: 'relative',
    left: 100,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'green',
    borderRadius: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },

});
