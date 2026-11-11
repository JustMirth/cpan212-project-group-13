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

