This is new **ToDo** Project based on task list and task using Registration/Login. We are use [MongoDB](https://www.mongodb.com/) as database, [Node JS](https://nodejs.org/en) 
and [Express JS](https://expressjs.com/) as backend (API), [React JS](https://react.dev/) as frontend and [React-Native](https://reactnative.dev/) as mobile application development.

# Getting Started

> **Note**: Make sure you have complete setup of Node JS, React JS, MongoDB and React-Native.

## Overview
I had create this project with MonogoDb, Node JS, Reac JS, React-Native and TypeScript. The purpose of this project is create a **Task** based on **TaskList** using 
registration and login.
## Setup instruction

## Step 1: Clone Project, Rename and Install Packages
Clone this project, rename ToDo_Node_Express_MongoDB_ReactJS_ReactNative to TodoFS (folder name is too long so it may create some errors) and open it on Visual Studio Code. Inside Node, ReactJs and ToDoRN folder execute below command for install packages.

```sh
# Using npm
npm install 

# OR 
npm i
```

## Step 2: Start Node Server (Backend)
Go to inside Node folder and make changes as per requirment in .env file and save.
```sh
PORT = 3000         # port no                                              <-- Change this in which port number you want to run your backend
HOST = "0.0.0.0"    # host or local host
MONGOOSE_PATH = mongodb://127.0.0.1:27017/      # mongodb url or db path   <-- Change this with your mongoose path
MONGOOSE_DB = tododb        # db name                                      <-- Change this with your data base name
MONGOOSE_DB_URL = ${MONGOOSE_PATH}${MONGOOSE_DB}
JWT_SECRET=MyProjectMyProjectMyProject
JWT_EXPIRES_IN=1h
```

start server using bellow command
```sh
...Node> node .
```
### Screenshot
<img width="508" height="114" alt="image" src="https://github.com/user-attachments/assets/2281dd91-151a-4bb3-896c-d849b3e33b7d" />

<img width="490" height="210" alt="image" src="https://github.com/user-attachments/assets/65e400b0-0dab-4599-8d11-da3442b6807f" />


## Step 3: Start your ReactJS app (Frontend)
In different terminal go to inside ReactJS folder and make changes as per requirment.

changes in vite.config.js file.
```sh
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host : "localhost",
    port : 3030              <-- port number in which you want to run your frontend
  }
})
```

changes in .env file.
```sh
VITE_API_BASE_URL=http://localhost:3000/api/                      <-- change where your backend is running
VITE_SECRET_KEY=hdtheyts55634227bsfftbmmeusy776354c2mckksuieu7778
```

Start frontend by below command
```sh
...ReactJS> npm run dev
```
### Screenshot
<img width="597" height="293" alt="image" src="https://github.com/user-attachments/assets/e8c9fc16-269c-46ff-9c7a-e5a083bc919f" />

<img width="480" height="270" alt="Screenshot 2025-08-22 172215" src="https://github.com/user-attachments/assets/2d1693a3-e84a-4931-bbfa-3a3d20447035" />
<img width="480" height="270" alt="Screenshot 2025-08-22 172429" src="https://github.com/user-attachments/assets/1dc4af38-ad39-4672-9934-b4eee6414355" />
<img width="480" height="270" alt="Screenshot 2025-08-22 172458" src="https://github.com/user-attachments/assets/bdfb999b-e5cb-4ffc-a684-011ba917c53e" />
<img width="480" height="270" alt="Screenshot 2025-08-22 172530" src="https://github.com/user-attachments/assets/6dc4dd36-d2ae-41a8-b564-03aced633879" />
<img width="480" height="270" alt="Screenshot 2025-08-22 172830" src="https://github.com/user-attachments/assets/3ed4b798-34aa-44e2-b185-b525c9914692" />
<img width="480" height="270" alt="Screenshot 2025-08-22 172858" src="https://github.com/user-attachments/assets/4aa7caba-c3e2-460b-b5ce-8af40596adcb" />
<img width="480" height="270" alt="Screenshot 2025-08-22 172929" src="https://github.com/user-attachments/assets/f34845bc-c834-44c7-b2f7-688e096e89f5" />
<img width="480" height="270" alt="Screenshot 2025-08-22 172951" src="https://github.com/user-attachments/assets/a9490ea8-4096-475d-8578-89cd876a9912" />
<img width="480" height="270" alt="Screenshot 2025-08-22 173032" src="https://github.com/user-attachments/assets/b3f9d27f-fb89-49b8-84b2-82a01a37b1de" />
<img width="480" height="270" alt="Screenshot 2025-08-22 173132" src="https://github.com/user-attachments/assets/d719f2e0-14ca-439d-9f14-30eaef7fe9a7" />
<img width="480" height="270" alt="Screenshot 2025-08-22 173148" src="https://github.com/user-attachments/assets/84521ba3-8a73-417c-9c23-2335492b2758" />
<img width="480" height="270" alt="Screenshot 2025-08-22 173206" src="https://github.com/user-attachments/assets/8f4b3598-0e44-4bf4-a2cd-4011025e8b9d" />
<img width="480" height="270" alt="Screenshot 2025-08-22 173841" src="https://github.com/user-attachments/assets/943ecb2f-ee2b-4ccf-be62-026ac04a7978" />
<img width="480" height="270" alt="Screenshot 2025-08-22 173859" src="https://github.com/user-attachments/assets/7b6af85a-e203-4456-9258-69a9fa31e69b" />



## Step 4: Start your React-Native app (Mobile)
In different terminal go to inside ToDoRN folder and make changes as per requirment.

Goto the command prompt and type ipconfig and copy IPv4

<img width="380" height="280" alt="Screenshot 2025-08-22 165154" src="https://github.com/user-attachments/assets/47656d6f-5925-4a8f-a92a-2e0ad35b0a44" />


changes in .env file.
```sh
BASE_URL=http://192.168.10.45:3000/api/      <-- Change address by IPv4, port no by in which backend (node server) is running
SECRET_KEY_ENV=12345678901234567890123456789012 # 32 chars = AES-256
IV_ENV=1234567890123456 # 16 chars for IV
```

Start mobile app by below comand
```sh
...ToDoRN>npm run android
```

### Screenshot
<img width="762" height="176" alt="Screenshot 2025-08-22 180141" src="https://github.com/user-attachments/assets/55abf7a0-b9c0-4cab-859e-353b5ab1743f" />

<img width="270" height="585" alt="Screenshot 2025-08-22 180141" src="https://github.com/user-attachments/assets/b3916662-3bff-4e7f-8503-650ec1fd2ea4" />
<img width="270" height="585" alt="Screenshot 2025-08-22 180141" src="https://github.com/user-attachments/assets/c103cd4a-fe68-4a84-8bfb-30bda56dc70c" />
<img width="270" height="585" alt="Screenshot 2025-08-22 180141" src="https://github.com/user-attachments/assets/44571621-3b9b-4108-b983-9d71aeca97c8" />
<img width="270" height="585" alt="Screenshot 2025-08-22 180141" src="https://github.com/user-attachments/assets/901772dd-a1b0-4057-8031-8c4b5a3465af" />
<img width="270" height="585" alt="Screenshot 2025-08-22 180141" src="https://github.com/user-attachments/assets/60a4f6a5-dbb8-4ea1-bc76-f79f11c77058" />
<img width="270" height="585" alt="Screenshot 2025-08-22 180141" src="https://github.com/user-attachments/assets/3c0accd9-66bf-42ca-b811-cc61fcfebb35" />
<img width="270" height="585" alt="Screenshot 2025-08-22 180141" src="https://github.com/user-attachments/assets/08aeae0a-1011-4673-9fa3-1c6b3e6a5bcf" />
<img width="270" height="585" alt="Screenshot 2025-08-22 180141" src="https://github.com/user-attachments/assets/cb3e7410-9e7c-453c-8abc-52c06fbdb316" />
<img width="270" height="585" alt="Screenshot 2025-08-22 180141" src="https://github.com/user-attachments/assets/151541bb-2ec6-46b7-80d5-b4638f1c9daf" />
<img width="270" height="585" alt="Screenshot 2025-08-22 180141" src="https://github.com/user-attachments/assets/20be6666-ec60-4488-a3bc-05be619cef5f" />
<img width="270" height="585" alt="Screenshot 2025-08-22 180141" src="https://github.com/user-attachments/assets/bca7640e-7b06-41ce-92d8-7639c36c4284" />
<img width="270" height="585" alt="Screenshot 2025-08-22 180141" src="https://github.com/user-attachments/assets/5fdead69-4449-4ed4-badc-457b456594f3" />
<img width="270" height="585" alt="Screenshot 2025-08-22 180141" src="https://github.com/user-attachments/assets/d7b8e891-ea4f-4054-9af4-c78e983cb18a" />
<img width="270" height="585" alt="Screenshot 2025-08-22 180141" src="https://github.com/user-attachments/assets/d5a9beb9-da9d-4393-aff3-1b7628f19aab" />

### Sometime due to cache, changes will not reflected on app. In this case you need to clear cache and start server using below command.
```sh
...ToDoRN>npx react-native start --reset-cache
```


## Assumptions made / Known issues
We assume that you have proper internet connetion and latest brower or android device.



## Application Features

> **1** Register user after verify mobile number.

> **2** Login user using mobile number and password.

> **3** Reset forgot password after verify mobile number.

> **4** Change language hindi or english as per your convenience.

> **5** Create, edit and delete task list.

> **6** Create, edit and delete task based on task list.

> **7** Mark task as incomplete/complete as per requirement.

> **8** Delete profile if it is not suitable for you, this will delete your entire data.

> **9**: Before and after login the routes are different, means he is unauthorized to navigate any page before authentication.

> **10**: We use .env file to peotect or secret.

**Backend (Node)**
> **11**: Categories API using controller and routes.

> **12**: Verify token and get user information using middleware.

> **13**: Collect API calling language hindi(hi) or english(en) and calling plateform web, android or ios using middleware.

> **14**: All API worked based on token after login.






