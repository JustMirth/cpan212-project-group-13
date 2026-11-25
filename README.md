# cpan212-project-group-13

This is going to be WorkOut App (we are still flushing out name).

Active group members include Mitchell Callaghan (JustMirth), Judd Lawrence (julato), Mohamed Salad (mohamedS-N10015122).

# AI use

Judd
 I used chatgpt to help debug and find errors within code for the most part, along with reminders on how to write some helper code, whilst helping me gain a solid understanding to methods and functions I have trouble remembering


# How to run both apps together
1. Open project folder
2. Open two terminals
    For the first one, change directory to api
    For the second, change directory to web
3. For both terminals respectively, run
    npm install
    npm run dev
4. As for environment variables:
    the api end uses PORT=4000 set under api/.env.example
    the web uses API_URL=http://localhost:4000 set under web/.env.local
5. Whilst keeping both terminals open and running, enter URL [http](http://localhost:3000/workouts) to interact with page

# M2 Unlisted Demo
https://www.youtube.com/watch?v=aqctEl2o5Xk

# M3 Unlisted Demos

Mitchell:
https://www.youtube.com/watch?v=UU99-F7K-Vo

Mohamed:
https://www.youtube.com/watch?v=7m326fdObWY

Judd:
https://www.youtube.com/watch?v=rJ54Vc5OWPI

## M4 Set up
# how to set MONGODB_URI
    To set up MONGODB_URI, first acquire unique mongoDB atlas connection string. Afterwards, create an env. file under /api folder. Lastly, input the following:

    PORT=4000
    MONGODB_URI=<your MongoDB link>

# how to run the seed
    Once you have set up MONGODB_URI in your own .env file, run npm install in your terminal once again under the api folder to install newly added dependencies, in this case, a new script command called seed. After that, you can run npm run seed to proceed.

# query parameters the list endpoint accepts (as of M4)
    `GET /api/workouts` answers these query parameters:

    | Parameter | Default | Rules |
    |---|---|---|
    | `status` | filter workouts by status | `planned`, `completed`, `cancelled` |
    | `sort` | choose the sort field and direction | `date`, `-date`, `name`, `-name`, `createdAt`, `-createdAt` |
    | `page` | choose which page to display | positive integer; defaults to `1` |
    | `limit` | choose how many workouts per page | Positive integer up to `50`; defaults to `10` |
