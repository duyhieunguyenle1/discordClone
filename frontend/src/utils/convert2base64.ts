// this to convert file to string base64
const convert2base64 = (file: Blob | File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result?.toString() || '');
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
    }
  });
};

export default convert2base64;
