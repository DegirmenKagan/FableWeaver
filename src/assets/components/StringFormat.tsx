import moment from "moment";

export const dateFormat = (date?: Date) => {
  return moment(date).format("D MMMM YYYY, HH:mm");
};

// export const convertBase64 = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();

//     fileReader.readAsDataURL(file);

//     fileReader.onload = () => {
//       const b64 = btoa(fileReader.result?.toString() ?? "");
//       resolve(b64); // fileReader.result will be a string or ArrayBuffer
//     };

//     fileReader.onerror = (error) => {
//       reject(error);
//     };
//   });
// };

export const convertBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    let fileInfo;
    let baseURL: string | ArrayBuffer = "";
    // Make new FileReader
    const reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      console.log("Called", reader);
      if (reader.result) baseURL = reader.result;
      console.log(baseURL);
      resolve(baseURL);
    };
    console.log(fileInfo);
  });
};
