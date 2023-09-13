<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">bitbucket-pipeline-duration</h3>

  <p align="center">
    The project focuses on providing functionality to calculate total pipeline minutes per project in a given time.
    <br />
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a> -->
  </p>
</div>




<!-- ABOUT THE PROJECT -->
## About The Project

The project is inspired from Bitbucket Pipelines Pipe: Bitbucket build statistics.
https://bitbucket.org/atlassian/bitbucket-build-statistics/src/master/

The Objective: 
* Understanding the pipeline duration usage for each project in the workspace.
* Bitbucket has a pipe to display pipeline minute usage, but the disadvantage of adding the usage pipe in Bitbucket pipelines itself thus increasing the duration.

Current script is setup to fetch pipeline duration for past 31 days (1 month).



### Built With

* Node.js
* Javascript
* Bitbucket REST
* commander


<!-- GETTING STARTED -->
## Getting Started

Instructions on setting up your project.
To get the project running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/prajyotpro/bitbucket-pipeline-duration.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```


<!-- USAGE EXAMPLES -->
## Usage
```sh
   node index.js -w <workspace> -t <token>
   ```

#### Options
Required:
   * -w --workspace Bitbucket workspace slug.
   * -t --token Bitbucket Basic Auth Token: https://developer.atlassian.com/server/bitbucket/how-tos/example-basic-authentication/.

Optional: 
* -d --days Duration in days.


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the Apache License. See `LICENSE` for more information.


<!-- CONTACT -->
## Contact

Prajyot Khandeparkar - [@prajyotpro](https://twitter.com/prajyotpro)



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Bitbucket Build Statistics](https://bitbucket.org/atlassian/bitbucket-build-statistics/src/master/pipe/pipe.py)
* [Bitbucket REST API Doc](https://developer.atlassian.com/cloud/bitbucket/rest/api-group-pipelines/#api-repositories-workspace-repo-slug-pipelines-get)
