<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->

<div align="center">
  <h3 align="center">LinAssess Data Generator</h3>
  <p align="center">
    Generate data for LinAsses (LinkedIn assessment practice app).
    <br />
    <br />
    <br />
    <a href="https://linassess-data-gen.netlify.app">View Demo</a>
    ·
    <a href="https://github.com/IamGideonIdoko/linassess-data-gen/issues">Report Bug</a>
    ·
    <a href="https://github.com/IamGideonIdoko/linassess-data-gen/issues">Request Feature</a>
  </p>
</div>






<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Go ahead and ace that LinkedIn assessment😉

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgments section. Here are a few examples.

* [React.js](https://reactjs.org/)

* [Node.js](https://nodejs.org/)

* [Vite](https://vitejs.dev)

  

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This project's dependencies are managed with [yarn](https://yarnpkg.com)

* Install dependencies using yarn.
  ```sh
  yarn install
  ```
  
* Generate dev contents listint of source repo. Data is generated to [contents-dev.json](output/contents-dev.json)
  ```sh
  yarn run contents:dev
  ```
* If [contents-dev.json](output/contents-dev.json) is good, migrate to prod (Ensute data is generated properly first). Data is migrated to [contents-prod.json](output/contents-prod.json) 
  ```sh
  yarn run contents:prod
  ```
* Generate dev data. Data is genrated to [data-dev.json](output/contents-dev.json)
  ```sh
  yarn run data:dev
  ```
* If dev data is good, migrate to prod (Ensute data is generated properly first)
  ```sh
  yarn run data:prod
  ```
* Generate a  list of available assessments
  ```sh
  yarn run list
  ```


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Data used in this project is provided by [Zhenëk](https://github.com/Ebazhanov). Do well to contribute to the repository [here](https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes) too. 

You can also contribute to the project' backend data generator [here](https://github.com/IamGideonIdoko/linassess-data-gen-data-gen).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->

## Contact

Gideon Idoko - [@IamGideonIdoko](https://twitter.com/IamGideonIdoko) - iamgideonidoko@gmail.com

Project Link: [https://github.com/IamGideonidoko/linassess-data-gen](https://github.com/IamGideonidoko/linassess-data-gen)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Zhenëk](https://github.com/Ebazhanov)
* [Img Shields](https://shields.io)
* [Netlify](https://www.netlify.com)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/IamGideonIdoko/linassess-data-gen.svg?style=for-the-badge
[contributors-url]: https://github.com/IamGideonIdoko/linassess-data-gen/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/IamGideonIdoko/linassess-data-gen.svg?style=for-the-badge
[forks-url]: https://github.com/IamGideonIdoko/linassess-data-gen/network/members
[stars-shield]: https://img.shields.io/github/stars/IamGideonIdoko/linassess-data-gen.svg?style=for-the-badge
[stars-url]: https://github.com/IamGideonIdoko/linassess-data-gen/stargazers
[issues-shield]: https://img.shields.io/github/issues/IamGideonIdoko/linassess-data-gen.svg?style=for-the-badge
[issues-url]: https://github.com/IamGideonIdoko/linassess-data-gen/issues
[license-shield]: https://img.shields.io/github/license/IamGideonIdoko/linassess-data-gen.svg?style=for-the-badge
[license-url]: https://github.com/IamGideonIdoko/linassess-data-gen/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/IamGideonIdoko
[product-screenshot]: https://raw.githubusercontent.com/iamgideonidoko/linassess/master/images/linassess-app.PNG
