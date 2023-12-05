# TicketAPI

Ticket API er et api med brugerstyring og mulighed for at oprette, slette og ændre billetter som er bundet op til en bestemt bruger.
Dette API er lavet så du blot skal downloade det og sætte det op.

## Guide til installation

1. Start med at hente projektet ned. Herefter skal du navigere til roden og køre
   `npm install`

2. Opret en ny fil .env i roden og indsæt følgende:
   Bemærk at JWTSECRET er en unik kode du selv skal lave - indtast blot 64 tal og bogstaver eller brug en online JWT Secret generator.
   _Husk at indsætte USER, PASSWORD og DB, som kommer fra din database_
   _Bruger du en anden DB end MySQL skal DIALECT også tilrettes_

```
PORT=8081
JWTREFRESHEXPIRATION=30000000
JWTEXPIRATION=1400000
JWTSECRET=4f1feeca525de4cdb064656007da3edac7895a87ff0ea865693300fb8b6e8f9c
HOST=localhost
USER=root
PASSWORD=DITROOTPASSWORD
DIALECT=mysql
DB=tickets
```

3. Åben dit foretrukne program til at styre din database og opret en ny database ved navn tickets

4. Nu skulle du kunne starte serveren ved at skrive i terminalen:
   `node server.js`

## Guide til API

Api´et har følgende routes

#### USER MANAGEMENT

```
    - /sign-up (params: name, email password )
    - /sign-in (params: email, password )
    - /profile (params: "Authorization": "Bearer DIN TOKEN")
```

#### TICKET MANAGEMENT - Er alle protected routes. Dvs. du skal være logget ind

```
    - /create (params: name, date, description, published)
    - /update/:id (params: name, date, description, published)
    - /getAll (params: none)
    - /getOne/:id (params: none)
    - /deleteAll (params: none)
    - /delete/:id (params: none)
```
