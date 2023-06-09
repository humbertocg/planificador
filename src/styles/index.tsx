const card = {
  backgroundColor: '#FFF',
  marginHorizontal: 10,
  marginVertical: 20,
  padding: 20,
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

const globalStyles = {
  contenedor: {
    ...card,
    transform: [{translateY: 50}],
  },
  card: {...card},
};

export default globalStyles;
