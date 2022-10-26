const enumToArray = (enumObject: any) => {
  const result = Object.keys(enumObject).map((key) => enumObject[key]);
  return result;
};

export default enumToArray;
