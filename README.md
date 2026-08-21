# Integrating with HubSpot

Complete guide to setting up dependencies, configuring HubSpot CRM permissions, and integrating the API into your Express application.

## Prerequisites & Installation

Install the required packages in your project root:

```bash
npm install express axios dotenv
```

---

## 1. Configure HubSpot CRM Permissions

1. Log in to your **HubSpot Developer / Account Portal**.
2. Go to **Settings** > **Integrations** > **Private Apps**.
3. Click **Create a private app** (or select an existing one).
4. Under the **Scopes** tab, grant the necessary permissions for your integration (e.g., `crm.objects.contacts.read`, `crm.objects.deals.read`).
5. Save the app and copy the generated **Access Token**.

---

## 2. Environment Setup

1. Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```
2. Add your HubSpot Access Token and server port:
   ```env
   HUBSPOT_ACCESS_TOKEN=your_private_app_access_token_here
   PORT=3000
   ```

> **Note:** Ensure `.env` is listed in your `.gitignore` file to avoid leaking credentials.

---

## 3. HubSpot API Configuration

Set up `axios` in `index.js` with base headers to automate authentication across requests:

```javascript
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Axios instance configured for HubSpot
const hubspotClient = axios.create({
  baseURL: 'https://api.hubapi.com',
  headers: {
    Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

// Example route: Fetch contacts
app.get('/contacts', async (req, res) => {
  try {
    const response = await hubspotClient.get('/crm/v3/objects/contacts');
    res.json(response.data);
  } catch (error) {
    console.error('HubSpot API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch data from HubSpot' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

---

## 4. Run & Test

Start your server to verify the connection:

```bash
node index.js
```

Open `http://localhost:3000/contacts` in your browser or Postman to test fetching CRM data.

---

## Custom Object Link

https://app.hubspot.com/contacts/51833346/objects/2-67719561/views/all/list


