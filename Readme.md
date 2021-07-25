# final_project-cinemacenter
final_project-cinemacenter created by Github Classroom

### Demo Link:

https://bit.ly/3pFWXOZ

### Description 
This project is a website available for any person that is able to browse for a movie or actor that they can get more information on. It is also a data store that analyzes information about movies, actors, profiles, etc. It is being compared to all other movies or actors as well. For this project it uses data from movies, names and genre. On the website, the person can chat messages and leave a comment/review on that movie or actor.



## Additional instructions:

The following folder named `json` needs to be added inside the `public` folder. This folder has 3 files `IMDb names.json`, `IMDb names.json`,
and `IMDb ratings.json`. We were not able to add these files onto github since they exceed the file size allowed on github. The `json` folder can be downloaded from this link: 
https://drive.google.com/drive/folders/1Rpm_GR7gxBqe39H9yKer-ueIE0uuoMCx?usp=sharing

 ### IMPORTANT
 Please follow Additional Instructions first before running the server.

### Steps to run Docker
 Step 1: First build the docker image with this command: `docker build --tag (name of the docker tag)`, example: `docker build --tag node-docker`
 
 Step 2: Then check that the docker image has been built: docker images
 
 Step 3: Next, we run an image inside of a container, we use the docker run command: `docker run -d -p 3000:3000 (name of docker tag)` example: `docker run -d -p 3000:3000 node-docker`
 
 Step 4: Voila! The website is being run within Docker!
 
### Design Features

1. User Profiling: <br>

  *  `A new user can sign-up on the website by providing some basic information such as their name, email, username, location, favorite movie genre, and they can set a their password.`

 *   `When a user creates an account, their  information is stored inside the ‘users’ collection in our database, hosted by Firebase.`
 
 ![image](https://user-images.githubusercontent.com/43709736/121608698-584daf00-ca07-11eb-9982-cee0d97181d5.png)



2. User Authentication: <br>


*    `A user can login to their account using the email, and password they set during sign-up.`

 *   `Once a user is logged in, they can now comment and leave ratings on the movies. These reviews can be seen by all other users who land onto the specific page.`

3. AI Chat-box: <br>

 *   `A user can use the chatbox to get some quick information, regarding the best movies in a specific year or in particular genre.`

*   `The chat-box currently only handles some specific queries, they can be found on the readme.md file.   `

[![AI-chatbox.png](https://i.postimg.cc/63hFT5dg/AI-chatbox.png)](https://postimg.cc/YGhds7Dz)



4. Social Interaction: <br>

* `A user can review, leave a like and star of the movie that they enjoyed.`

* `Other users can leave a thumbs up like to the reviews that are posted. `

* `When a user reviews a movie, their review of the movie gets stored inside the ‘reviews’ collection in our database, hosted by Firebase.`

![image](https://user-images.githubusercontent.com/43709736/121608560-17ee3100-ca07-11eb-9784-c016519b2b2f.png)



### Queries handled by the AI chatbox
`Top 5 movies in 2020`

`Top 5 movies in 2019`

`Top 5 movies in 2018`

`Top 5 movies in 2017`

`Top 5 movies in 2016`

`Top 5 movies in 2015`

`Top 5 all-time movies`

`Top 5 comedy movies`

`Top 5 animated movies`

`Top 5 upcoming movies`


## Screenshots

* Sign up page

[![Signup.png](https://i.postimg.cc/SKHxVd3k/Signup.png)](https://postimg.cc/cKMWLRdb)

* Home page

[![Home-page.png](https://i.postimg.cc/R0Kk5TqM/Home-page.png)](https://postimg.cc/nsVRqBv5)

* Incorrect User authentication

[![Incorrect-password.png](https://i.postimg.cc/9QpxGN4w/Incorrect-password.png)](https://postimg.cc/jDDQTc4R)

* User Profile

[![User-profile.png](https://i.postimg.cc/DzSq8C1T/User-profile.png)](https://postimg.cc/67N7PfHj)

* Social Interaction 

![image](https://user-images.githubusercontent.com/43709736/121599016-567bef80-c9f7-11eb-97b3-8db8009d0c30.png)


### Extra Features 

* Movie Search System Page

[![Movies.png](https://i.postimg.cc/3xD6mZXg/Movies.png)](https://postimg.cc/bZp3jkFJ)

![image](https://user-images.githubusercontent.com/43709736/121599016-567bef80-c9f7-11eb-97b3-8db8009d0c30.png)


* Actors Search System Page

![image](https://user-images.githubusercontent.com/43709736/121597970-24b65900-c9f6-11eb-9a15-b5e9d4dfa950.png)

![image](https://user-images.githubusercontent.com/43709736/121599128-7b706280-c9f7-11eb-8fd0-25fe76c23fdd.png)


* AI Chat-box

[![AI-chatbox.png](https://i.postimg.cc/63hFT5dg/AI-chatbox.png)](https://postimg.cc/YGhds7Dz)





## Authors and Contributor List:

* Danz Moses - https://github.com/danzmoses
* Saad Umar - https://github.com/sumar001
* Sameh Fazli - https://github.com/sfazli96
