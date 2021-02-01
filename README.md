<!-- PROJECT SHIELDS -->

[![PRETTIER](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://gitter.im/jlongster/prettie)
[![LICENSE](https://img.shields.io/github/license/arshadkazmi42/awesome-github-init.svg)](https://github.com/arshadkazmi42/awesome-github-init/LICENSE)
[![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/erlanlucio/)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Flucioerlan%2Fcalculate-distance-matrix&count_bg=%23E71A18&title_bg=%23555555&icon=dependabot.svg&icon_color=%23E7E7E7&title=views&edge_flat=false)](https://hits.seeyoufarm.com)

<!-- PROJECT -->
<br />
<p align="center">
  <h3 align="center">

Calculate Distance Matrix 🔰

  </h3> 
  <p align="center">
    <img src="https://user-images.githubusercontent.com/67064886/106472231-3ce2fe00-6481-11eb-942b-391a72a55eeb.gif" alt="Logo" >
    <br />
    <br />
    <a href="https://github.com/lucioerlan/calculate-distance-matrix/issues">Report Bug</a>
    ·
    <a href="https://github.com/lucioerlan/calculate-distance-matrix/issues">Request Feature</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->

## 🤔 About The Project

This program, calculates a distance matrix using the Janson-Shanon algorithm, bringing the result of the distance or the travel time between two locations. To use, it is very simple, just send a file formatted correctly with the extension .csv on the client as soon as the file is processed, the server returns it on screen.

<br>

<!-- INSTALLATION -->

## :hammer: Installation

You'll need [Node.js](https://nodejs.org) installed on your computer in order to build this app.

```bash
git clone https://github.com/lucioerlan/calculate-distance-matrix.git
$ cd calculate-distance-matrix
$ npm install - client and server
```

Considerations:

- Format the .csv file correctly, example of the .csv file formatted in /server
- This program was run on Linux/Windows 😄

<br>

<!-- SETUP -->

## 🔥 Setup

#### Create a database called 🐘

```
distance_matrix
```

#### Copy or rename the file

```
$ cp .env-examples .env
```

#### Create table in the database

```bash
$ npx knex migrate:latest
```

#### Have a google account

ㅤ[Then get a Google API key](https://developers.google.com/maps/documentation/javascript/get-api-key)

<br>

#### Finalizing configurations 💨

After obtaining a google maps key, place it in [.env] in the GOOGLE_MAPS_API_KEY variable.

Then create a folder on your operating system, that folder will be where the .csv files
will be processed and then enter the path of the
folder in [.env]

<br>

<!-- RUNNING TESTS -->

## 🤓 Running tests On the server and API documents

```bash
$ cd calculate-distance-matrix/server
```

- Access swagger http://localhost:5000/api/docs 🥇
- $ npm test

<br>

<!-- RUNNING -->

## 🚀 Running Default

```
$ npm start - client and server
```

#### Or Run Docker 🐳

```
$ docker-compose up
```

<br>

<!-- LICENSE -->

## 🔓 License

This project lives under MIT License. See LICENSE for more details. © - [Erlan Lucio](https://www.linkedin.com/in/erlanlucio/)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=flat-square
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=flat-square
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=flat-square
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=flat-square
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
