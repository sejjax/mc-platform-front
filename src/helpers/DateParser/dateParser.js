const dateParser = (date) => {
  console.log(date);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

export default dateParser;