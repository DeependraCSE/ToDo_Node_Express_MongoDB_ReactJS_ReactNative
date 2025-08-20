This is new **ToDo** Project based on task list and task using Registration/Login. We are use [MongoDB](https://www.mongodb.com/) as database, [Node JS](https://nodejs.org/en) 
and [Express JS](https://expressjs.com/) as backend (API), [React JS](https://react.dev/) as frontend and [React-Native](https://reactnative.dev/) as mobile application development.

# Getting Started

> **Note**: Make sure you have complete setup of Node JS, React JS, MongoDB and React-Native.

## Overview
I had create this project with MonogoDb, Node JS, Reac JS, React-Native and TypeScript. The purpose of this project is create a **Task** based on **TaskList** using 
registration and login.

## Folder Structure

You can see projetc structure in above image, the source of all code is src.

> **assets**: All assets used in app like image etc.

> **component**: All reusable component is present in common_component.tsx. All common component are name export

> **helper**: All helper function like bookmark news in async store etc. are present in Helper.tsx

> **interface**: All interface which are required in our app are present in Interface.tsx.

> **locales**: All language related string files are bundeled in this folder.

> **main_component**: All screen component like Splash, Dashboard, NewsDetail etc. are present in this folder.

> **navigation**: AppNavigation.tsx is available in this folder for navigation setup.

> **networking**: Ajax call related files are available in this folder like api setup, api call.

> **redux**: All redux structure like action, reducer, saga, store are available in this folder.

> **style**: Styles.tsx is available in this folfer for provide style to other component.

> **AppIndex.tsx**: This file is the entry point of our app which is called from index.tsx.

## Setup instruction

## Step 1: React-Native Setup
Make sure you have complete setup of React-Native

## Step 2: Clone Project and Install Packages
Clone this project and open it on Visual Studio Code. Inside root folder execute below command for install packages.

```sh
# Using npm
npm install 

# OR 
npm i
```

## Step 3: Registration For Public News API
Register yourself at https://newsapi.org/ and generate apiKey for access api.
After getting apiKey, please change it on file inside networking/config.tsx.

### Android

```sh
# Using npm
npx run android

```

## Assumptions made / Known issues
We assume that you have proper internet connetion and latest android device.

## Improvements planns

> **1**: Add text to speech on news so we can listen news as well.

> **2**: Change color of news or make some marked which news are already covered (Read by user).



## Application Features

> **1**: Getting news from api and display it on flat list.

> **2**: Refresh news list on swap to refresh.

> **3**: Get detaild news on news click on different page

> **4**: Add to bookmark and remove from bookmark news.

> **5**: Change language english and hindi.

> **6**: Get all bookmarked news at different screen.

> **7**: Remove all bookmarked news.

> **8**: Implement redux.


