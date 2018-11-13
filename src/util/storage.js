export default {
  getItem: (key, defaultValue) => {
    try {
      let result = defaultValue;
      const value = JSON.parse(localStorage.getItem(key));
      if (value) {
        result = value;
      }
      return result;
    } catch (error) {
      console.error(error);
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  },
};
