import React, { useContext, useEffect } from 'react';
import {ActivityIndicator, Dimensions, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ImageColors from 'react-native-image-colors';
import Carousel from 'react-native-snap-carousel';
import { GradientBackground } from '../components/GradientBackground';
import {HorizontalSlider} from '../components/HorizontalSlider';

import {MoviePoster} from '../components/MoviePoster';
import {useMovies} from '../hooks/useMovies';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getColores } from '../helpers/getColores';
import { GradientContext } from '../context/GradienContext';

export const HomeScreen = () => {
  const {NowPlaying, Popular, TopRated, UpComing, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();

  const {width: windowWidth} = Dimensions.get('window');

  const { setMainColors } = useContext(GradientContext);

  const getPosterColors = async( index: number) =>  {
    const movie = NowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    
    const [primary = 'green', secondary = 'orange' ] = await getColores( uri );

   setMainColors({ primary, secondary});

  }
  useEffect(() => {
    if (NowPlaying.length > 0) {
      getPosterColors(0);
    }
  
    
  }, [NowPlaying])
  
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }
  

  return (
    <GradientBackground >
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          {/* carousel principal */}
          <View style={{height: 370}}>
            {/* crousel principal */}
            <Carousel
              data={NowPlaying}
              renderItem={({item}: any) => <MoviePoster movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={200}
              inactiveSlideOpacity={0.8}
              onSnapToItem={ index => getPosterColors( index ) }
            />
          </View>

          <HorizontalSlider title="Populares" movies={Popular} />
          <HorizontalSlider title="Top Rated" movies={TopRated} />
          <HorizontalSlider title="Upcoming" movies={UpComing} />
          {/* <HorizontalSlider title='En cine' movies={ peliculasEnCine }/> */}
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
