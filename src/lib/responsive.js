import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const sdwidth = 392.72727272727275;
const sdheight = 737.8181818181819;

exports.wp = (w) => {
  const rong = (w / sdwidth) * width;
  return rong;
};

exports.hp = (h) => {
  const dai = (h / sdheight) * height;
  return dai;
};

export {width, height, sdheight, sdwidth};
