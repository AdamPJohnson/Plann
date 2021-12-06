
# Plann


An alternative to social media for staying up-to-date with your favorite local events.
## Run Locally

Clone the project

```bash
  git clone https://github.com/AdamPJohnson/Plann
```

Go to the project directory

```bash
  cd Plann
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## API Reference

#### Get events within given distance

```http
  GET /nearbyEvents/${zip}/${dist}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `zip` | `string` |  Zip code to be searched by|
| `dist` | `number` |  Radius in miles|

#### Get events by a given organization

```http
  GET /nearbyEvents/${orgId}/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `orgId` | `number` |  Organization ID|



## Authors

- [@adampjohnson](https://www.github.com/AdamPJohnson)


## License

[MIT](https://choosealicense.com/licenses/mit/)

