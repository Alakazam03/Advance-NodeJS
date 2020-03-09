1. routes for each resource
2. controller to seperate out logic from routes. each route map to controller
3. middleware
    * functions that access has to req/res cycle and runs wihtin that cycle. It can set values before request goes to any of the routes. next defines the move to next middlware.
  
4. morgan for logger