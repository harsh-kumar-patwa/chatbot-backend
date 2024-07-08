# Bot9 Reserve Bot

## Overview
The Bot9 Reserve Bot is a bot designed to assist users in booking rooms at the Bot9 Reserve. Users can interact with the bot to view available rooms and book them by providing necessary details. Upon successful booking, the bot generates a booking ID and confirms the room reservation.

## Features
- **View Available Rooms**: Users can inquire about available rooms and their prices.
- **Book Rooms**: Users can book rooms by providing their full name, email, number of nights for the stay, and the room name.
- **Booking Confirmation**: The bot generates a booking ID and confirms the reservation.
- **Sends Email Confirmation** : It also send the confirmation on the email provided.

## Working Video Demo


https://github.com/harsh-kumar-patwa/chatbot-bot9/assets/135590545/5871d3c9-7dd6-47cb-9941-017711426a80




## Setup Instructions

### Step 1: Clone the Repository
Clone the project repository to your local machine using the following command:
```bash
git clone https://github.com/harsh-kumar-patwa/chatbot-backend
```

### Step 2: Install Dependencies
Navigate to the project directory and install the required dependencies using the following command:
```bash
npm install axios openai nodemailer googleapis express sequelize sqlite3 
```

### Step 3: Obtain OpenAI API Key
- Visit the OpenAI website and sign up or log in.
- Navigate to the API section and generate a new API key.
  

### Step 4: Setup Nodemailer and Google API
  #### Setting Up Google Cloud Project and Enabling Gmail API

  ##### Steps

###### 1. Create a New Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Click on the project drop-down and select **New Project**.
3. Enter your project name and select your billing account.
4. Click **Create**.

###### 2. Enable the Gmail API

1. In the Google Cloud Console, navigate to the **API & Services** > **Library**.
2. In the search bar, type "Gmail API".
3. Click on the **Gmail API** result.
4. Click **Enable**.

###### 3. Create OAuth 2.0 Credentials

1. Go to the **API & Services** > **Credentials** page.
2. Click **Create Credentials** and select **OAuth 2.0 Client IDs**.
3. Configure the consent screen if prompted:
    - Select **External**.
    - Enter an **Application name**.
    - Enter your **Support email**.
    - Add your **Developer contact information**.
    - Click **Save and Continue**.
4. Choose **Desktop app** as the application type.
5. Click **Create**.
6. Note down your **Client ID** and **Client Secret**.

###### 4. Set Up OAuth Consent Screen

1. Go to the **API & Services** > **OAuth consent screen** page.
2. Fill out the required fields:
    - **App name**
    - **User support email**
    - **Developer contact email**
3. Add **Scopes** if needed. For basic Gmail API usage, you don't need to add any additional scopes here.
4. Add **Test users** if your app is in testing mode.
5. Click **Save and Continue**.

###### 5. Download OAuth 2.0 Client Credentials

1. On the **Credentials** page, find your newly created OAuth 2.0 Client ID.
2. Click the **Download** button (a downward arrow icon) to download the JSON file containing your credentials.

###### 6. Store Credentials Securely

- Ensure you store your credentials securely. Do not expose your `client_id`, `client_secret`, or `refresh_token` in your code or version control.

###### 7. Enable Required APIs and Scopes

1. In your application, you'll need to request access to the required Gmail API scopes.
2. Example scopes for Gmail API:
    - `https://www.googleapis.com/auth/gmail.readonly`
    - `https://www.googleapis.com/auth/gmail.send`
    - `https://www.googleapis.com/auth/gmail`

###### 8. Use OAuth 2.0 for Authorization

### Step 5: Configure Environment Variables
Create a `.env` file in the project directory and add the following environment variables:
```env
OPENAI_API_KEY=your_openai_api_key
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
REFRESH_TOKEN=your-refresh-token
EMAIL_USER=your-email@gmail.com

```

### Step 6: Start the Bot and the Server

Run the following command to start the server:
```bash
node index.js
```


### Step 8: Using Postman to interact with the bot or any frontend (You can clone my frontend which is already there on [Github](https://github.com/harsh-kumar-patwa/chatbot-frontend)
- Open Postman after starting the server.
- Send a POST request to `http://localhost:3000/chat` with the following JSON body:
```json
{
    "message": "<Your message>"
}
```
- The bot will respond with a message body that contains the bot response.


