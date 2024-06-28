import axios from "axios";
const client = axios.create({ baseURL: "https://api.coingecko.com/api/v3" });

// {id: 'frax-ether', symbol: 'frxeth', name: 'Frax Ether'}
// {id: 'frax', symbol: 'frax', name: 'Frax'}
// {id: 'frax-share', symbol: 'fxs', name: 'Frax Share'}

export async function fetchCoinList() {
    try {
      const result = await client.get("/coins/list");
      console.log("COINS LIST: ", result.data);
    } catch (error) {
      console.error("Could not Fetch Coin List: ", error);
    }
  }

export async function getfrxEtherPrice(){
  try {
    const result = await client.get("/simple/price?ids=frax-ether&vs_currencies=usd");
    console.log("Frax Ether: ", result.data['frax-ether'].usd)
    return result.data['frax-ether'].usd
  } catch (error) {
    console.log("Error! could not get frax ether price: ",error )
  }
}   

export async function getFraxPrice(){
  try {
    const result = await client.get("/simple/price?ids=frax&vs_currencies=usd");
    console.log("Frax: ", result.data.frax.usd)
    return result.data.frax.usd
  } catch (error) {
    console.log("Error! could not get frax ether price: ",error )
  }
}  

export async function getFxsPrice(){
  try {
    const result = await client.get("/simple/price?ids=frax-share&vs_currencies=usd");
    console.log("Frax Share: ", result.data['frax-share'].usd)
    return result.data['frax-share'].usd
  } catch (error) {
    console.log("Error! could not get frax ether price: ",error )
  }
}  

export async function getTetherPrice(){
  try {
    const result = await client.get("/simple/price?ids=tether&vs_currencies=usd");
    console.log("USDT: ", result.data.tether.usd)
    return result.data.tether.usd
  } catch (error) {
    console.log("Error! could not get Tether price: ",error )
  }
}  