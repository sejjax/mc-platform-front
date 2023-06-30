const getInitials = (fullName) => {
  if (typeof fullName !== 'string') {
    return fullName;
  }

  const splitName = fullName.split(' ');

  return `${splitName[0][0].toLocaleUpperCase()}. ${splitName[1][0].toLocaleUpperCase()}.`;
};

export default getInitials;
