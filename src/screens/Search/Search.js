import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import HeaderSearch from './SearchBox';
import InfiniteHits from './InfiniteHits';

import algoliasearch from 'algoliasearch';
import {InstantSearch} from 'react-instantsearch-native';

const searchClient = algoliasearch(
  'EBQP613ZXR',
  '502870a2b58883fce06cdc673fed0d9d',
);

const Search = (props) => {
  const root = {
    Root: View,
    props: {
      style: {
        flex: 1,
      },
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <InstantSearch
        searchClient={searchClient}
        indexName="MangaPoly"
        root={root}>
        <HeaderSearch navigation={props.navigation} />
        <InfiniteHits navigation={props.navigation} />
      </InstantSearch>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F1FA',
  },
});

export default Search;
