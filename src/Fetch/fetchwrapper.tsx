
 
export const LoginFetch = async (username: string, password: string) => {
    const MockResponse = {
           }
  try {
    const data =  JSON.parse(JSON.stringify(MockResponse));
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const Save =  (data:any, clave:string) => {
  console.log(data)
  try {
   localStorage.setItem(clave, JSON.stringify(data))
  } catch (error) {
    console.log(error);
  }
}

export const Get = async (clave:string):Promise<any> => {
  try {
   return JSON.parse(localStorage.getItem(clave) || "[]") ;
  } catch (error) {
    console.log(error);
  }
}

