import http from 'k6/http';
import { check } from 'k6';

const accessToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDY2OTc1MDAsImlkIjoiY2IzYWYzZjYtODgwMS00MGJiLWFiNzQtOTcwYTMzODgxM2NmIiwib3JpZ19pYXQiOjE3MDU4MzM1MDB9.l6QQkKTato9YmSjvxorMah1PoBOn35Ve6w7kX-y0Xdk';


export const options={
    vus: 12,
    duration: '59s'
}

export default function () { 
//     const query = `
//     mutation fundWallet{
//     fundWallet(input:{
//     amount:500
//     paymentMethodID:"af4b3d82-acec-4b20-813f-307ca47352ac"
//   })
// }`;

const query = `
query login{
    login(input: {
      email:"waynewhite@yahoo.com"
      password:"Password1."
    }){
      token
      user{
        id
        email
        firstName
        lastName
        gender
        country
        telephone
        createdAt
        updatedAt
        deletedAt
      }
      welcomeText
      subText
    }
  }`;

const headers = {
  //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDY2OTc1MDAsImlkIjoiY2IzYWYzZjYtODgwMS00MGJiLWFiNzQtOTcwYTMzODgxM2NmIiwib3JpZ19pYXQiOjE3MDU4MzM1MDB9.l6QQkKTato9YmSjvxorMah1PoBOn35Ve6w7kX-y0Xdk',
  'Content-Type': 'application/json',
};

const res = http.post('https://sandbox-api.lovebox.africa/api', JSON.stringify({ query: query }), {
  headers: headers,
});


check(res, {
    'is status 200' : (r) => r.status === 200,
    'if res body passes' : (r) => r.body.includes('"id"'),
    'that res body passes' : (r) => r.body.includes('"email"'),
    'if res body shows' : (r) => r.body.includes('"Wayne"')
    })
}

