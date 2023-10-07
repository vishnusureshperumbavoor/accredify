# Accredify - College Accreditation Status cheking Web Application

## Description
Colleges can be used this web app to check their accreditation status.

## Features
Automated gmail <br>
Admin dashboard with different types of data visualizations <br>
Payment integration using RazorPay <br>
Bill printing <br>

## YouTube demo and tutorials
Will be uploaded

## Prerequisites
NodeJS, VSCode should be installed in your computer <br>
Account on [mongodb cloud](https://cloud.mongodb.com) and create a project and cluster <br>
Account on [Razorpay payment gateway](https://dashboard.razorpay.com) and create an [API](https://dashboard.razorpay.com/app/website-app-settings/api-keys) 

## Installations
Clone the repository
```sh
git clone https://github.com/vishnusureshperumbavoor/accredify.git
```
Open VSCode 
```sh
code accedify
```
You need to add your Razorpay API key at the [.env file](client/.env) of client folder <br>
Copy paster your Razorpay key ID that created using [Razorpay payment gateway](https://dashboard.razorpay.com/app/website-app-settings/api-keys) <br>
```
RAZORPAY_KEY_ID = 
```
Enter client, install necessary dependencies and start the client side
```sh
cd client
npm install
npm start
```
Now you can use the application at [localhost:3001](https://localhost:3001)
Go to server folder
```
cd ..
cd server
```
#### Provide necessary data at [.env of server side](server/.env)
- mongodb cluster uri - Create a mongodb cluster and get the link <br>
- gmail
- razorpay key id and key secret
```
MONGODB_URI = 
EMAIL = 
EMAIL_PASSWORD = 
RAZORPAY_KEY_ID = 
RAZORPAY_KEY_SECRET = 
```
Now run the server side application
```
npm install
npm start
```
Now the server will be running on port 5001

## Contact
Contact
For any inquiries or feedback, please contact [Vishnu Suresh Perumbavoor](https://vishnusureshperumbavoor.github.io/V-S-P/) at <br> <br>
[![LinkedIn][linkedin-shield]][linkedin-url]
[![github][github-shield]][github-url]
[![Twitter][twitter-shield]][twitter-url]
[![Instagram][instagram-shield]][instagram-url]
[![GMail][gmail-shield]][gmail-url]

## Contributions 
open for cotributions. Anyone can clone the repository and create pull request.

[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/vishnu-suresh-perumbavoor/
[twitter-shield]: https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white
[twitter-url]: https://twitter.com/in/vspeeeeee
[instagram-shield]: https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white
[instagram-url]: https://www.instagram.com/vishnusureshperumbavoor/
[github-shield]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[github-url]: https://github.com/vishnusureshperumbavoor
[gmail-shield]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[gmail-url]: mailto:vishnusureshperumbavoor@gmail.com





