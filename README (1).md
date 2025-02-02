
# FAQHub

FAQHub  System is a full-stack web application built with the MERN stack, providing an intuitive interface for managing FAQs in multiple languages. The frontend is powered by React and Vite for a fast, modern experience, while the backend is powered by Express.js and Node.js. This app allows users to create, edit, delete, and view FAQs, with real-time multilingual translations powered by the Google Translate API. It’s the perfect tool for businesses and platforms that want to manage and display FAQs efficiently for a global audience.


## Documentation

[Documentation](https://linktodocumentation)


## Deployment

To deploy this project run

```bash
  npm install 
```

```bash
  npm run build 
```

```bash
  npm run dev 
```
## Demo

Insert gif or link to demo

https://bharatfd-backend-u15i.onrender.com/ 

## Run Locally

Clone the project

```bash
  git clone https://github.com/ankityadav0011/BharatFD-Task_Backend-Role.git
```

Go to the project directory



Install dependencies

```bash
  npm install
```

```bash
  cd faq-frontend
```

Start the server

```bash
  npm run dev 
```


## API Reference

#### Get all items

```http
  GET /get-faq
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Get all faqs listed  |

#### Get Faqs 

```http
  POST /create-faq
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Create new FAQ  |

#### create faqs 

```http
  PUT /edit-faq/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of faq to edit   |

#### edit faqs 

```http
  DELETE  delete-faq/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete|

#### edit faqs 





